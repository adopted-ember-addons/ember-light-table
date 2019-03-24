/* eslint ember/no-on-calls-in-components:off */
/* eslint ember/no-side-effects:off */
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { htmlSafe } from '@ember/string';
import { run } from '@ember/runloop';
import layout from '../templates/components/lt-row-range';

export default Component.extend({

  layout,

  // passed in
  namedArgs: null,
  ltBody: null,

  range: computed.reads('namedArgs.range'),
  a: null,
  b: null,
  startA: null,
  startB: null,
  offsetA: 0,
  offsetB: 0,
  movingA: false,
  movingB: false,

  _getPosition(pointName) {
    let i = this.get(pointName);
    let r = this.get('ltBody.ltRows').objectAt(i);
    let top = r.get('top');
    let directionA = this.get('directionA');
    if (pointName === 'a' && directionA < 0 || pointName === 'b' && directionA > 0) {
      return top;
    } else {
      return top + r.get('height');
    }
  },

  _updateA: observer('range.a', 'range.b', function() {
    run.once(this, this.__updateA);
  }),

  __updateA() {
    if (!this.get('movingA')) {
      let a = this.get('range.a');
      this.set('a', a);
      this.set('startA', this._getPosition('a'));
    }
  },

  _updateB: observer('range.a', 'range.b', function() {
    run.once(this, this.__updateB);
  }),

  __updateB() {
    if (!this.get('movingB')) {
      let b = this.get('range.b');
      this.set('b', b);
      this.set('startB', this._getPosition('b'));
    }
  },

  _updateAnchor: observer('movingA', 'movingB', function() {
    run.once(this, this.__updateAnchor);
  }),

  __updateAnchor() {
    let ma = this.get('movingA');
    let mb = this.get('movingB');
    let rn = this.get('range');
    if (ma && !mb) {
      rn.set('anchorIsB', true);
    } else if (mb && !ma) {
      rn.set('anchorIsB', false);
    }
  },

  init() {
    this._super(...arguments);
    this.get('inverse');
    this.set('a', this.get('range.a'));
    this.set('b', this.get('range.b'));
  },

  _computePosition: on('didInsertElement', function() {
    this._super(...arguments);
    this._updateA();
    this._updateB();
    this.set('boxStyle', this.get('__boxStyle'));
  }),

  positionA: computed('startA', 'offsetA', {
    get() {
      return this.get('startA') + this.get('offsetA');
    },
    set(key, value) {
      this.set('offsetA', value - this.get('startA'));
      return value;
    }
  }),

  positionB: computed('startB', 'offsetB', {
    get() {
      return this.get('startB') + this.get('offsetB');
    },
    set(key, value) {
      this.set('offsetB', value - this.get('startB'));
      return value;
    }
  }),

  directionA: computed('a', 'b', function() {
    return this.get('a') <= this.get('b') ? -1 : 1;
  }).readOnly(),

  directionB: computed('directionA', function() {
    return -this.get('directionA');
  }).readOnly(),

  inverse: computed('directionA', 'movingA', 'movingB', 'positionA', 'positionB', function() {
    return (this.get('movingA') || this.get('movingB'))
      && (this.get('directionA') < 0) !== (this.get('positionA') <= this.get('positionB'));
  }).readOnly(),

  _updateAnchorAdjustment: observer('inverse', 'directionA', 'range.anchorIsB', function() {
    run.once(this, this.__updateAnchorAdjustment);
  }),

  __updateAnchorAdjustment() {
    let inv = this.get('inverse');
    let dA = this.get('directionA');
    this.set('range.anchorAdjustment', !inv ? 0 : this.get('range.anchorIsB') ? -dA : dA);
  },

  __boxStyle: computed(function() {
    let top = this.get('positionA');
    let height = this.get('positionB') - top;
    if (height < 0) {
      top += height;
      height = -height;
    }
    let r = this.get('ltBody.ltRows').objectAt(0);
    let left = r.get('left');
    let width = r.get('width');
    return htmlSafe(`left: ${left}px; width: ${width}px; top: ${top}px; height: ${height}px;`);
  }).volatile().readOnly(),

  _boxStyle: null,

  boxStyle: computed('positionA', 'positionB', {
    get() {
      let style = this.get('_boxStyle');
      if (style) {
        this.set('_boxStyle', null);
        return style;
      } else if (this.get('ltBody')) {
        return this.get('__boxStyle');
      }
    },
    set(key, value) {
      this.set('_boxstyle', value);
      return value;
    }
  }),

  _updateOffset(pointName, position) {
    let X = pointName.toUpperCase();
    this.set(`position${X}`, position);
  },

  actions: {
    onDrag(pointName) {
      this.set(`moving${pointName.toUpperCase()}`, true);
    },
    onMove(pointName, position, direction) {
      this._updateOffset(pointName, position);
      this.get('range').trigger('move', this.get('ltBody'), this.get('range'), pointName, position, direction);
    },
    onDrop(pointName, position, direction) {
      this.setProperties({ offsetA: 0, offsetB: 0, movingA: false, movingB: false });
      this.get('range').trigger('drop', this.get('ltBody'), this.get('range'), pointName, position, direction);
    }
  }

});
