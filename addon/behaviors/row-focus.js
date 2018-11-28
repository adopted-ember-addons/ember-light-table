import Behavior from 'ember-light-table/behaviors/behavior';
import { keyDown } from 'ember-keyboard';
import { rowMouseDown } from 'ember-light-table/listeners/mouse-events';

export default Behavior.extend({

  exclusionGroup: 'row-focus',

  init() {
    this._super(...arguments);
    this.events.onFocusToRow = [rowMouseDown('_none'), rowMouseDown('ctrl')];
    this.events.onGoDown = [keyDown('ArrowDown')];
    this.events.onGoUp = [keyDown('ArrowUp')];
    this.events.onGoPageDown = [keyDown('PageDown')];
    this.events.onGoPageUp = [keyDown('PageUp')];
    this.events.onGoFirst = [keyDown('Home')];
    this.events.onGoLast = [keyDown('End')];
    this.events.onNavSelForward = [keyDown('Enter')];
    this.events.onNavSelBackward = [keyDown('Enter+shift')];
    this.events.onClearFocus = [keyDown('Escape')];
  },

  onFocusToRow(ltBody, ltRow, event) {
    if (event.button === 0) {
      let row = ltRow.get('row');
      ltBody.set('table.focusedRow', row);
    }
  },

  onGoDown(ltBody) {
    ltBody.set('table.focusIndex', ltBody.get('table.focusIndex') + 1);
  },

  onGoUp(ltBody) {
    ltBody.set('table.focusIndex', ltBody.get('table.focusIndex') - 1);
  },

  onGoPageDown(ltBody) {
    ltBody.set('table.focusIndex', ltBody.get('table.focusIndex') + ltBody.get('pageSize') - 1);
  },

  onGoPageUp(ltBody) {
    ltBody.set('table.focusIndex', ltBody.get('table.focusIndex') - ltBody.get('pageSize') + 1);
  },

  onGoFirst(ltBody) {
    ltBody.set('table.focusIndex', 0);
  },

  onGoLast(ltBody) {
    ltBody.set('table.focusIndex', ltBody.get('table.rows.length') - 1);
  },

  onNavSelForward(ltBody) {
    let table = ltBody.get('table');
    let rows = table.get('rows');
    let i = Math.max(0, table.get('focusIndex'));
    let n = rows.get('length');
    let k = null;
    for (let j = i + 1; !k && j < n; j++) {
      if (rows.objectAt(j).get('selected')) {
        k = j;
      }
    }
    for (let j = 0; !k && j <= i; j++) {
      if (rows.objectAt(j).get('selected')) {
        k = j;
      }
    }
    if (k) {
      table.set('focusIndex', k);
    }
  },

  onNavSelBackward(ltBody) {
    let table = ltBody.get('table');
    let rows = table.get('rows');
    let i = Math.max(0, table.get('focusIndex'));
    let n = rows.get('length');
    let k = null;
    for (let j = i - 1; !k && j >= 0; j--) {
      if (rows.objectAt(j).get('selected')) {
        k = j;
      }
    }
    for (let j = n - 1; !k && j >= i; j--) {
      if (rows.objectAt(j).get('selected')) {
        k = j;
      }
    }
    if (k) {
      table.set('focusIndex', k);
    }
  },

  onClearFocus(ltBody) {
    let table = ltBody.get('table');
    table.set('focusedRow', null);
  }

});
