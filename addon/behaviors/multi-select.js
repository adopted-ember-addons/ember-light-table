import SelectAllBehavior from 'ember-light-table/behaviors/select-all';

export default SelectAllBehavior.extend({

  classNames: ['multi-select'],

  // passed in
  requiresKeyboard: true,
  selectOnClick: true,

  init() {
    this._super(...arguments);
    this.events.onSelectRow = ['rowClick:_none'];
    this.events.onExtendRange = ['rowClick:shift'];
    this.events.onToggleRow = ['rowClick:ctrl'];
  },

  _prevSelectedIndex: -1,

  _onRowClick(ltBody, row, f) {
    let table = ltBody.get('table');
    let i = table.get('rows').indexOf(row);
    f(i, table);
    this._prevSelectedIndex = i;
  },

  onSelectRow(ltBody, ltRow) {
    let row = ltRow.get('row');
    if (this.get('selectOnClick')) {
      let isSelected = row.get('selected');
      if (this.get('requiresKeyboard')) {
        this._onRowClick(ltBody, row, (i, table) => {
          table.deselectAll();
          row.set('selected', !isSelected);
        });
      } else {
        this.onToggleRow(ltBody, ltRow);
      }
    }
  },

  onExtendRange(ltBody, ltRow) {
    let row = ltRow.get('row');
    this._onRowClick(ltBody, row, (i, table) => {
      let j = this._prevSelectedIndex === -1 ? i : this._prevSelectedIndex;
      table
        .get('rows')
        .slice(Math.min(i, j), Math.max(i, j) + 1)
        .forEach((r) => r.set('selected', true));
    });
  },

  onToggleRow(ltBody, ltRow) {
    let row = ltRow.get('row');
    this._onRowClick(ltBody, row, () => {
      row.toggleProperty('selected');
    });
  }

});
