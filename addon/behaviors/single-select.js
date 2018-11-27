import Behavior from 'ember-light-table/behaviors/behavior';

export default Behavior.extend({

  exclusionGroup: 'can-select',

  init() {
    this._super(...arguments);
    this.events.onRowClick = ['rowClick:_all'];
  },

  onRowClick(ltBody, ltRow) {
    let row = ltRow.get('row');
    let isSelected = row.get('selected');
    ltBody.get('table.selectedRows').setEach('selected', false);
    row.set('selected', !isSelected);
  }

});
