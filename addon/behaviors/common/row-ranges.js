import { A as emberArray } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import { run } from '@ember/runloop';
import RowRange from './row-range';

function positionFrom(table, rowOrPosition) {
  let rows = table.get('rows');
  return typeof rowOrPosition === 'number'
    ?  Math.max(0, Math.min(rows.get('length') - 1, rowOrPosition))
    : rows.indexOf(rowOrPosition);
}

export default EmberObject.extend({

  /*
   * A cell is selected if it is inside an odd number of ranges.
   */
  list: null,

  init() {
    this._super(...arguments);
    this.list = emberArray();
  },

  isEmpty: computed('list.length', function() {
    return !this.get('list.length');
  }),

  clear() {
    this.list.clear();
  },

  startNewRange(i) {
    let rn = this._createNewRange(i);
    this.list.insertAt(0, rn);
  },

  updateFirstRange(ltBody, rowOrPosition) {
    let b = positionFrom(ltBody.get('table'), rowOrPosition);
    this.removeDecorations(ltBody);
    try {
      this.list.objectAt(0).set('b', b);
    } finally {
      this.noSimplification(ltBody);
    }
    run.schedule('afterRender', null, () => ltBody.makeRowAtVisible(b, 0.5));
  },

  moveFirstRange(ltBody, direction) {
    let { list } = this;
    let focusIndex = ltBody.get('table.focusIndex');
    if (list.get('length')) {
      list.objectAt(0).move(ltBody, focusIndex, direction);
    } else {
      this.extendRangeTo(ltBody, focusIndex + direction);
    }
  },

  extendRangeTo(ltBody, rowOrPosition) {
    let table = ltBody.get('table');
    let b = positionFrom(table, rowOrPosition);
    let { list } = this;
    if (list.get('length')) {
      let rn = list.objectAt(0);
      rn.set('b', b);
    } else {
      let a = table.get('focusIndex');
      if (a === -1) {
        a = b;
      }
      let rn = this._createNewRange(a, b);
      list.pushObject(rn);
    }
    run.schedule('afterRender', null, () => ltBody.makeRowAtVisible(b, 0.5));
  },

  removeDecorations(ltBody) {
    this.list.forEach((r) => r.removeDecorations(ltBody));
  },

  thenSimplify(ltBody) {
    this.removeDecorations(ltBody);
    this._simplifyRanges(ltBody);
    this.addDecorations(ltBody);
  },

  noSimplification(ltBody) {
    this._syncSelection(ltBody.get('table'));
    this.addDecorations(ltBody);
  },

  immediateSimplification(ltBody) {
    this._syncSelection(ltBody.get('table'));
    this._simplifyRanges(ltBody);
    this.addDecorations(ltBody);
  },

  updateRangesIfNeeded(ltBody) {
    let rows = ltBody.get('table.rows');
    let n = rows.get('length');
    let v1 = rows.mapBy('selected');
    let v2 = this._getVectorFromRanges(n);
    let upToDate = true;
    for (let i = 0; upToDate && i < n; i++) {
      upToDate = v1.objectAt(i) === v2.objectAt(i);
    }
    if (!upToDate) {
      this.removeDecorations(ltBody);
      try {
        this._generateRangesFromVector(v1);
      } finally {
        this.addDecorations(ltBody);
      }
    }
  },

  _syncSelection(table) {
    table
      .get('rows')
      .forEach((r, i) => r.set('selected', this._findRanges(i).get('length') % 2 === 1));
  },

  _findRanges(i) {
    return emberArray(
      this.list.filter((rn) => rn.get('realFirst') <= i && i <= rn.get('realLast'))
    );
  },

  _createNewRange(a, b = a) {
    let rn = RowRange.create({ a, b });
    rn.on('handleMove', this, this._onHandleMove);
    rn.on('handleDrop', this, this._onHandleDrop);
    return rn;
  },

  _generateRangesFromVector(isSelected) {
    let { list } = this;
    let anchor;
    if (list.get('length')) {
      anchor = list.objectAt(0).get('a');
    }
    list.clear();
    let rn = null;
    let n = isSelected.get('length');
    for (let i = 0; i <= n; i++) {
      let isSel = isSelected.objectAt(i);
      if (rn && !isSel) {
        rn.set('b', i - 1);
        list.pushObject(rn);
        rn = null;
      } else if (!rn && isSel) {
        rn = this._createNewRange(i);
      }
    }
    if (rn) {
      rn.set('b', n);
      list.pushObject(rn);
    }
    let rn0 = list.find((rn) => rn.get('a') === anchor || rn.get('b') === anchor);
    if (rn0) {
      let a = rn0.get('a');
      let b = rn0.get('b');
      if (a !== anchor) {
        rn0.setProperties({ a: b, b: a });
      }
      list.removeObject(rn0);
      list.insertAt(0, rn0);
    }
  },

  _getVectorFromRanges(n) {
    let isSelected = emberArray();
    for (let i = 0; i <= n; i++) {
      isSelected.pushObject(this._findRanges(i).get('length') % 2 === 1);
    }
    return isSelected;
  },

  _simplifyRanges(ltBody) {
    this._generateRangesFromVector(this._getVectorFromRanges(ltBody.get('table.rows.length')));
  },

  addDecorations(ltBody) {
    this.list.forEach((r) => r.addDecorations(ltBody));
  },

  _updateRange(ltBody, range, pointName, position, direction) {
    let ltDropRow = ltBody.getLtRowAt(position);
    if (ltDropRow) {
      let ltRows = ltBody.get('ltRows');
      let i = ltRows.indexOf(ltDropRow);
      let side = (ltDropRow.get('top') + ltDropRow.get('height') / 2 - position);
      if (side * direction > 0) {
        i -= direction;
      }
      i = Math.max(0, Math.min(i, ltBody.get('table.rows.length')));
      let realFirst = range.get('realFirst');
      let realLast = range.get('realLast');
      if (!(direction < 0 && i > realLast) && !(direction > 0 && i < realFirst)) {
        range.set(pointName, i);
        this._syncSelection(ltBody.get('table'));
        run.schedule('afterRender', null, () => ltBody.makeRowAtVisible(i, 0.5));
      }
    }
  },

  _onHandleMove() {
    this._updateRange(...arguments);
  },

  _onHandleDrop(ltBody, range) {
    this._updateRange(...arguments);
    range.normalize();
    this.thenSimplify(ltBody);
  }

});
