import EmberObject, { computed } from '@ember/object';
import Evented, { on } from '@ember/object/evented';
import { run } from '@ember/runloop';

export default EmberObject.extend(Evented, {

  // passed-in
  a: null, // the default anchor point
  b: null, // the other point
  anchorIsB: false,
  anchorAdjustment: 0,

  realA: computed('anchorIsB', 'a', 'anchorAdjustment', {
    get() {
      let a = this.get('a');
      return this.get('anchorIsB') ? a : a + this.get('anchorAdjustment');
    },
    set(key, value) {
      this.set('a', this.get('anchorIsB') ? value : value - this.get('anchorAdjustment'));
      return value;
    }
  }),

  realB: computed('anchorIsB', 'b', 'anchorAdjustment', {
    get() {
      let b = this.get('b');
      return !this.get('anchorIsB') ? b : b + this.get('anchorAdjustment');
    },
    set(key, value) {
      this.set('b', !this.get('anchorIsB') ? value : value - this.get('anchorAdjustment'));
      return value;
    }
  }),

  first: computed('a', 'b', {
    get() {
      return Math.min(this.get('a'), this.get('b'));
    },
    set(key, value) {
      if (this.get('a') <= this.get('b')) {
        this.set('a', value);
      } else {
        this.set('b', value);
      }
      return value;
    }
  }),

  last: computed('a', 'b', {
    get() {
      return Math.max(this.get('a'), this.get('b'));
    },
    set(key, value) {
      if (this.get('a') > this.get('b')) {
        this.set('a', value);
      } else {
        this.set('b', value);
      }
      return value;
    }
  }),

  realFirst: computed('realA', 'realB', {
    get() {
      return Math.min(this.get('realA'), this.get('realB'));
    },
    set(key, value) {
      if (this.get('realA') <= this.get('realB')) {
        this.set('realA', value);
      } else {
        this.set('realB', value);
      }
      return value;
    }
  }),

  realLast: computed('realA', 'realB', {
    get() {
      return Math.max(this.get('realA'), this.get('realB'));
    },
    set(key, value) {
      if (this.get('realA') > this.get('realB')) {
        this.set('realA', value);
      } else {
        this.set('realB', value);
      }
      return value;
    }
  }),

  normalize() {
    this.setProperties({
      a: this.get('realA'),
      b: this.get('realB'),
      anchorAdjustment: 0
    });
    if (this.get('anchorIsB')) {
      let a = this.get('a');
      let b = this.get('b');
      this.setProperties({
        a: b,
        b: a,
        anchorIsB: false
      });
    }
  },

  move(ltBody, pivot, direction) {
    let a = this.get('a');
    let b = this.get('b');
    let n = ltBody.get('table.rows.length');
    let clip = (i) => Math.min(Math.max(0, i), n - 1);
    let i;
    if (a === b) {
      i = clip(b + direction);
      this.set('b', i);
    } else {
      if (pivot === -1) {
        pivot = a;
      }
      if (pivot === a) {
        i = clip(b + direction);
        this.set('b', i);
      } else if (pivot === b) {
        i = clip(a + direction);
        this.set('a', i);
      } else if (direction > 0) {
        i = clip(this.get('last') + direction);
        this.set('last', i);
      } else {
        i = clip(this.get('first') + direction);
        this.set('first', i);
      }
    }
    run.schedule('afterRender', null, () => ltBody.makeRowAtVisible(i, 0.5));
  },

  addDecorations(ltBody) {
    ltBody.get('decorations').pushObject({
      component: 'lt-row-range',
      namedArgs: { range: this }
    });
  },

  removeDecorations(ltBody) {
    let decorations = ltBody.get('decorations');
    decorations.removeObject(decorations.findBy('namedArgs.range', this));
  },

  _onHandleMove: on('move', function() {
    this.trigger('handleMove', ...arguments);
  }),

  _onHandleDrop: on('drop', function() {
    this.trigger('handleDrop', ...arguments);
  })

});

