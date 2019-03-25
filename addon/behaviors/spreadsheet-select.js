import { keyDown, keyUp } from 'ember-keyboard';
import SelectAll from './select-all';
import RowRanges from './common/row-ranges';
import { rowMouseUp, rowMouseDown, rowMouseMove } from 'ember-light-table/listeners/mouse-events';

export default SelectAll.extend({

  init() {
    this._super(...arguments);
    this.events.onExtendRange = [rowMouseDown('shift')];
    this.events.onRangeDown = [keyDown('ArrowDown+shift')];
    this.events.onRangeUp = [keyDown('ArrowUp+shift')];
    this.events.onDeselectAll = [rowMouseDown('_none'), keyDown('ArrowDown'), keyDown('ArrowUp'), keyDown('Escape')];
    this.events.onStopRangeUpDown = [keyUp('ShiftLeft')];
    this.events.onRowMouseStartNewSelection = [rowMouseDown('_none')];
    this.events.onRowMouseStartAddRange = [rowMouseDown('cmd')];
    this.events.onRowMouseEndNewSelection = [rowMouseUp('_all')];
    this.events.onRowMouseEndAddRange = [rowMouseUp('_all')];
    this.events.onRowMouseNewSelectionMove = [rowMouseMove('_all')];
    this.events.onRowMouseAddRangeMove = [rowMouseMove('_all')];
    this.ranges = RowRanges.create({});
  },

  _rangeUpDownActive: false,
  _mouseSelectionAnchor: null,
  _mouseNewSelectionActive: false,
  _mouseAddRangeActive: false,

  ranges: null,

  onSelectionChanged(ltBody) {
    this._super(...arguments);
    this.ranges.updateRangesIfNeeded(ltBody);
  },

  onExtendRange(ltBody, ltRow) {
    this.ranges.removeDecorations(ltBody);
    try {
      let row = ltRow.get('row');
      this.ranges.extendRangeTo(ltBody, row);
    } finally {
      this.ranges.immediateSimplification(ltBody);
    }
  },

  onRangeDown(ltBody) {
    this._rangeUpDownActive = true;
    this.ranges.removeDecorations(ltBody);
    try {
      this.ranges.moveFirstRange(ltBody, 1);
    } finally {
      this.ranges.noSimplification(ltBody);
    }
  },

  onRangeUp(ltBody) {
    this._rangeUpDownActive = true;
    this.ranges.removeDecorations(ltBody);
    try {
      this.ranges.moveFirstRange(ltBody, -1);
    } finally {
      this.ranges.noSimplification(ltBody);
    }
  },

  onDeselectAll(ltBody) {
    let args = arguments;
    let event = args[args.length - 1];
    if (event && (args.length === 3 && event.button === 0 || args.length === 2)) {
      ltBody.get('table').deselectAll();
    }
  },

  onStopRangeUpDown(ltBody) {
    if (this._rangeUpDownActive) {
      this._rangeUpDownActive = false;
      this.ranges.thenSimplify(ltBody);
    }
  },

  onRowMouseStartNewSelection(ltBody, ltRow, event) {
    if (event.button === 0) {
      this._mouseSelectionAnchor = ltBody.get('table.rows').indexOf(ltRow.get('row'));
    }
  },

  onRowMouseStartAddRange(ltBody, ltRow, event) {
    if (event.button === 0) {
      this.ranges.removeDecorations(ltBody);
      try {
        let i = ltBody.get('table.rows').indexOf(ltRow.get('row'));
        this.ranges.startNewRange(i);
        this._mouseAddRangeActive = true;
        this._mouseSelectionAnchor = i;
      } finally {
        this.ranges.noSimplification(ltBody);
      }
    }
  },

  onRowMouseEndNewSelection() {
    this._mouseSelectionAnchor = null;
    this._mouseNewSelectionActive = false;
  },

  onRowMouseEndAddRange(ltBody) {
    if (this._mouseAddRangeActive) {
      this._mouseSelectionAnchor = null;
      this._mouseAddRangeActive = false;
      this.ranges.thenSimplify(ltBody);
    }
  },

  onRowMouseNewSelectionMove(ltBody, ltRow, event) {
    if (event.button === 0 && !this._mouseAddRangeActive) {
      if (!this._mouseNewSelectionActive
        && this._mouseSelectionAnchor !== null
        // && this._mouseSelectionAnchor !== i
      ) {
        this.ranges.startNewRange(this._mouseSelectionAnchor);
        this._mouseNewSelectionActive = true;
      }
      if (this._mouseNewSelectionActive && !this.ranges.get('isEmpty')) {
        this.ranges.updateFirstRange(ltBody, ltRow.get('row'));
      }
    }
  },

  onRowMouseAddRangeMove(ltBody, ltRow, event) {
    if (event.button === 0 && !this._mouseNewSelectionActive) {
      if (this._mouseAddRangeActive && !this.ranges.get('isEmpty')) {
        this.ranges.updateFirstRange(ltBody, ltRow.get('row'));
      }
    }
  }

});
