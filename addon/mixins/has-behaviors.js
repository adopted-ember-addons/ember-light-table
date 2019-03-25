import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import withBackingField from 'ember-light-table/utils/with-backing-field';
import listenerName from 'ember-light-table/utils/listener-name';

/*
 * from ember-keyboard
 */
function gatherKeys(event) {
  return A(
    ['alt', 'ctrl', 'meta', 'shift']
      .reduce(
        (keys, keyName) => {
          if (event[`${keyName}Key`]) {
            keys.push(keyName);
          }
          return keys;
        },
        []
      )
  );
}

/**
 * Returns a computed property flag that turns on or off a group of
 * mutually exclusive behaviors.
 *
 * @function
 * @param {string} exclusionGroup - If present, it is
 *   the name of the mutually exclusive group of behaviors for
 *   which all behaviors should be turned off or for which the
 *   behavior having the higher priority should be turned on,
 *   based on the value of the property.
 */
export function behaviorGroupFlag(exclusionGroup) {
  return computed('behaviors.[]', {
    get() {
      this._initDefaultBehaviorsIfNeeded();
      return !!this.getActiveBehaviorOf(exclusionGroup);
    },
    set(key, value) {
      this._initDefaultBehaviorsIfNeeded();
      if (value) {
        this.activateBehavior(this.getFirstBehaviorOf(exclusionGroup));
      } else {
        this.inactivateAllBehaviorsOf(exclusionGroup);
      }
      return value;
    }
  });
}

/**
 * Returns a computed property flag that prioritize or not a specific
 * behavior in a group of mutually exclusive behaviors.
 *
 * @function
 * @param {string} exclusionGroup - The name of the mutually exclusive
 *   group of behaviors.
 * @param {string} behaviorPropertyName - The name of the property that
 *   contains the instance of the behavior to prioritize or not.
 */
export function behaviorFlag(exclusionGroup, behaviorPropertyName) {
  return computed('behaviors.[]', 'behaviorsOff.[]', {
    get() {
      this._initDefaultBehaviorsIfNeeded();
      return this.getFirstBehaviorOf(exclusionGroup) === this.get(behaviorPropertyName);
    },
    set(key, value) {
      this._initDefaultBehaviorsIfNeeded();
      let l = A(this.get('allBehaviors').filterBy('exclusionGroup', exclusionGroup));
      let b = this.get(behaviorPropertyName);
      let b0 = l.objectAt(0);
      if (b0 !== b && value) {
        this.activateBehavior(b);
      } else if (b0 === b && !value) {
        this.prioritizeBehavior(l.objectAt(1));
      }
      return value;
    }
  });
}

/**
 * Returns a computed property that is the first behavior of a given type if one is present.
 *
 * @function
 * @param {string} behaviorClass - The class of the behavior to be returned.
 */
export function behaviorInstanceOf(behaviorClass) {
  return computed('behaviors.[]', 'behaviorsOff.[]', {
    get() {
      this._initDefaultBehaviorsIfNeeded();
      return this.get('allBehaviors').find((b) => b instanceof behaviorClass);
    }
  });
}

/**
 * Use this mixin to be able to add behaviors to your class. Behaviors are
 * small plugins that declare the javascript events they want to listen for.
 * They are instances of subclasses of `behaviors/behavior`.
 *
 * @mixin
 */
export default Mixin.create({

  /**
   * Behaviors that are turned on, in descending order of priority.
   */
  behaviors: withBackingField('_behaviors', () => A()),

  /**
   * Behaviors that are turned off, in descending order of priority. They are
   * backup behaviors that can replace a behavior of the same group
   * when the later is turned off.
   */
  behaviorsOff: withBackingField('_behaviorsOff', () => A()),

  allBehaviors: computed('behaviors.[]', 'behaviorsOff.[]', function() {
    let result = A();
    result.pushObjects(this.get('behaviors'));
    result.pushObjects(this.get('behaviorsOff'));
    return result;
  }),

  /**
   * Moves a behavior in front of other behaviors.
   *
   * @function
   * @param {Behavior} behavior - Instance of the behavior to prioritize.
   */
  prioritizeBehavior(behavior) {
    if (behavior) {
      let behaviors = this.get('behaviors');
      let behaviorsOff = this.get('behaviorsOff');
      if (behaviors.includes(behavior)) {
        behaviors.removeObject(behavior);
        behaviors.insertAt(0, behavior);
      } else if (behaviorsOff.includes(behavior)) {
        behaviorsOff.removeObject(behavior);
        behaviorsOff.insertAt(0, behavior);
      }
    }
  },

  /**
   * Turns off a behavior.
   *
   * @function
   * @param {Behavior} behavior - Instance of the behavior to inactivate.
   */
  inactivateBehavior(behavior) {
    if (behavior) {
      let behaviors = this.get('behaviors');
      let behaviorsOff = this.get('behaviorsOff');
      behaviors.removeObject(behavior);
      behaviorsOff.removeObject(behavior);
      behaviorsOff.insertAt(0, behavior);
    }
  },

  /**
   * Turns on or off a behavior.
   *
   * @function
   * @param {Behavior} behavior - Behavior instance to activate/inactivate.
   * @param {boolean} [value=true] - Whether the behavior is activated (true) or inactivated (false).
   */
  activateBehavior(behavior, value) {
    if (value === undefined || value)  {
      this.inactivateAllBehaviorsOf(behavior.get('exclusionGroup'));
      let behaviors = this.get('behaviors');
      let behaviorsOff = this.get('behaviorsOff');
      behaviorsOff.removeObject(behavior);
      behaviors.insertAt(0, behavior);
    } else {
      this.inactivateBehavior(behavior);
    }
  },

  /**
   * Returns the active behavior of a multually exclusive group.
   *
   * @function
   * @param {string} exclusionGroup
   * @returns {Behavior} - The active behavior's instance or `undefined` otherwise.
   */
  getActiveBehaviorOf(exclusionGroup) {
    return this.get('behaviors').findBy('exclusionGroup', exclusionGroup);
  },

  /**
   * Returns the inactive behavior of a multually exclusive group having the highest priority.
   *
   * @function
   * @param {string} exclusionGroup
   * @param {boolean} [value=true] - Whether the behavior is activated (true) or inactivated (false).
   * @returns {Behavior} - The inactive behavior's instance or `undefined` otherwise.
   */
  getInactiveBehaviorOf(exclusionGroup) {
    return this.get('behaviorsOff').findBy('exclusionGroup', exclusionGroup);
  },

  /**
   * Returns the behavior of a multually exclusive having the highest priority.
   *
   * @function
   * @param {string} exclusionGroup
   * @returns {Behavior} - The behavior's instance or `undefined` otherwise.
   */
  getFirstBehaviorOf(exclusionGroup) {
    return A(this.get('allBehaviors').filterBy('exclusionGroup', exclusionGroup)).objectAt(0);
  },

  /**
   * Turns off the active behavior of a mutually exclusive group of behaviors.
   *
   * @function
   * @param {string} exclusionGroup
   */
  inactivateAllBehaviorsOf(exclusionGroup) {
    let active = this.getActiveBehaviorOf(exclusionGroup);
    while (active) {
      this.inactivateBehavior(active);
      active = this.getActiveBehaviorOf(exclusionGroup);
    }
  },

  _oldEvents: null,

  _turnOffOldEvents() {
    let oldEvents = this._oldEvents;
    if (oldEvents) {
      oldEvents.forEach((turnOff) => turnOff());
    }
    this._oldEvents = A();
  },

  /**
   * An array containing the set of exclusion groups shared by the behaviors that are on
   */
  exclusionGroups: computed('behaviors.{[],exclusionGroup}', function() {
    return A(this.get('behaviors').mapBy('exclusionGroup').filter((g) => g)).uniq();
  }),

  /**
   * Behaviors that are active. A behavior is active if it's on and if it has the greatest
   * priority among the behaviors of its exclusion group.
   */
  activeBehaviors: computed('exclusionGroups', function() {
    let groups = this.get('exclusionGroups');
    return this
      .get('behaviors')
      .filter((b) => {
        let group = b.get('exclusionGroup');
        if (group) {
          if (groups.includes(group)) {
            groups.removeObject(b);
            return true;
          }
          return false;
        }
        return true;
      });
  }),

  triggerBehaviorEvent(type) {
    let args = Array.prototype.slice.call(arguments, 1);
    this.trigger(listenerName(type, gatherKeys(args[args.length - 1])), ...args);
    this.trigger(listenerName(type), ...args);
  },

  /**
   * This function attach or detach event listeners based on the behaviors present in
   * `behaviors`
   *
   * @function
   */
  _updateEvents() {
    this._turnOffOldEvents();
    let getCallback
      = (b, f) => {
        let that = this;
        return function() {
          return b[f].call(b, that, ...arguments);
        };
      };
    let getTurnOffFunc = (name, f) => () => this.off(name, f);
    let getInnerLoop = (b, f) => (name) => {
      let g = this.on(name, getCallback(b, f));
      this._oldEvents.pushObject(getTurnOffFunc(name, b, g));
    };
    this
      .get('activeBehaviors')
      .forEach((b) => {
        for (let f in b.events) {
          b.events[f].forEach(getInnerLoop(b, f));
        }
      });
  },

  _onBehaviorsChanged: on('init', observer(
    'behaviors.[]',
    'behaviors.@each.events',
    function() {
      run.once(this, '_updateEvents');
    }
  )),

  _setClasses: on('didRender', observer(
    'activeBehaviors.[]',
    'behaviorsOff.[]',
    function() {
      let element = this.get('element');
      if (element) {
        let classesOn = A([]);
        let classesOff = A([]);
        let bOff = this.get('behaviorsOff');
        let bOn = this.get('behaviors');
        bOff.map((b) => b.get('classNames')).filter((l) => l).forEach((l) => classesOff.addObjects(l));
        bOn.map((b) => b.get('classNames')).filter((l) => l).forEach((l) => classesOn.addObjects(l));
        classesOff.addObjects(bOff.mapBy('exclusionGroup').filter((g) => g));
        classesOn.addObjects(bOn.mapBy('exclusionGroup').filter((g) => g));
        classesOff.forEach((c) => element.classList.remove(c));
        classesOn.forEach((c) => element.classList.add(c));
      }
    }
  ))

});
