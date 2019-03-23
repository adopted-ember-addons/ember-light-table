/* eslint ember/no-on-calls-in-components:off */
/* eslint ember/no-side-effects:off */
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { run } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/lt-selection-handle';

export default Component.extend({

  layout,

  classNameBindings: [':lt-selection-handle', 'isUp:lt-selection-handle-up:lt-selection-handle-down'],
  attributeBindings: ['style'],

  // passed in
  ltBody: null,
  rowIndex: null,
  direction: null,
  inverse: false,

  _initialMousePosition: null,
  _oldUserSelect: null,
  offset: 0,

  init() {
    this._super(...arguments);
    this.__onMouseUp = (e) =>
      run.scheduleOnce('afterRender', null, () => this._onMouseUp(e));
    this.__onMouseMove = (e) =>
      run.scheduleOnce('afterRender', null, () => this._onMouseMove(e));
  },

  ltBodyElement: computed(function() {
    return this.get('ltBody.element');
  }).volatile().readOnly(),

  ltRow: computed(function() {
    let ltBody = this.get('ltBody');
    if (ltBody) {
      return ltBody.get('ltRows').objectAt(this.get('rowIndex'));
    }
  }).volatile().readOnly(),

  isUp: computed('direction', 'inverse', function() {
    let inverse = this.get('inverse');
    return this.get('direction') < 0 ? !inverse : inverse;
  }).readOnly(),

  position: computed(function() {
    let r = this.get('ltRow');
    let result = r.get('top');
    if (!this.get('isUp')) {
      result += r.get('height');
    }
    return result;
  }).volatile().readOnly(),

  _getMousePosition(event) {
    return event.clientY
      - this.get('ltBodyElement').getBoundingClientRect().top
      - window.scrollY;
  },

  _addEvents() {
    document.body.addEventListener('mouseup', this.__onMouseUp);
    document.body.addEventListener('mousemove', this.__onMouseMove);
  },

  _removeEvents: on('willDestroyElement', function() {
    document.body.removeEventListener('mousemove', this.__onMouseMove);
    document.body.removeEventListener('mouseup', this.__onMouseUp);
  }),

  _onMouseDown: on('mouseDown', function(event) {
    this._initialMousePosition = this._getMousePosition(event);
    this._addEvents();
    this._oldUserSelect = document.body.style['user-select'];
    document.body.style['user-select'] = 'none';
    if (this.drag) {
      this.drag();
    }
  }),

  extra: computed('direction', 'inverse', function() {
    return !this.get('ltRow')
      ? 0
      : this.get('inverse')
        ?  this.get('direction') * this.get('ltRow.height')
        : 0;
  }).readOnly(),

  _onMouseMove(event) {
    if (this.get('isDestroyed')) {
      this._removeEvents();
    } else if (this._initialMousePosition) {
      let offset = this._getMousePosition(event) - this.get('_initialMousePosition');
      this.set('offset', offset);
      if (this.move) {
        this.move(offset + this.get('extra') + this.get('position'), this.get('isUp') ? -1 : 1);
      }
    } else {
      this._onMouseDown(event);
    }
  },

  _onMouseUp(event) {
    if (!this.get('isDestroyed')) {
      this._removeEvents();
      let offset = this._getMousePosition(event) - this.get('_initialMousePosition');
      document.body.style['user-select'] = this._oldUserSelect;
      this._initialMousePosition = null;
      this.set('offset', 0);
      if (this.drop) {
        this.drop(offset + this.get('extra') + this.get('position'), this.get('isUp') ? -1 : 1);
      }
    }
  },

  positionUp: computed(function() {
    return this.get('ltRow.top');

  }).volatile().readOnly(),

  positionDown: computed(function() {
    return this.get('positionUp') + this.get('ltRow.height');
  }).volatile().readOnly(),

  _onResize: null,

  _attachResizeEventListener: on('didInsertElement', function() {
    this._onResize = () => this.set('style', this.get('__style'));
    window.addEventListener('resize', this._onResize);
  }),

  _removeEventListener: on('willDestroyElement', function() {
    window.removeEventListener('resize', this._onResize);
  }),

  _forceStyleUpdate: on('didInsertElement', observer('isUp', 'extra', function() {
    run.once(this, this.__forceStyleUpdate);
  })),

  __forceStyleUpdate() {
    this.set('style', this.get('__style'));
  },

  __style: computed(function() {
    if (this.get('ltBody')) {
      let isUp = this.get('isUp');
      let y = (isUp ? this.get('positionUp') : this.get('positionDown'));
      let translation = this.get('offset') + this.get('extra');
      return htmlSafe(`top: ${y}px; transform: translateY(${translation}px);`);
    }
  }).volatile().readOnly(),

  _style: null,

  style: computed('isUp', 'offset', 'extra', 'rowIndex', {
    get() {
      let style = this.get('_style');
      if (style) {
        this.set('_style', null);
        return style;
      } else {
        if (this.get('ltBody')) {
          return this.get('__style');
        } else {
          return null;
        }
      }
    },
    set(key, value) {
      this.set('_style', value);
      return value;
    }
  })

});
