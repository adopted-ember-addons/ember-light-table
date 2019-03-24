import Behavior from 'ember-light-table/behaviors/behavior';
import { keyDown } from 'ember-keyboard';

export default Behavior.extend({

  exclusionGroup: 'can-expand',

  // passed in
  multiRow: true,
  expandOnClick: true,

  init() {
    this._super(...arguments);
    this.events.onToggleClick = ['rowClick:_none'];
    this.events.onToggleFocused = [keyDown('Space')];
  },

  _onToggle(ltBody, row) {
    let shouldExpand = !row.get('expanded');
    if (!this.get('multiRow')) {
      ltBody.get('table.expandedRows').setEach('expanded', false);
    }
    row.set('expanded', shouldExpand);
  },

  onToggleClick(ltBody, ltRow) {
    if (this.get('expandOnClick')) {
      this._onToggle(ltBody, ltRow.get('row'));
    }
  },

  onToggleFocused(ltBody) {
    let focusedRow = ltBody.get('table.focusedRow');
    if (focusedRow) {
      this._onToggle(ltBody, focusedRow);
    }
  }

});
