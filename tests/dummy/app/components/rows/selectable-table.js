// BEGIN-SNIPPET selectable-table
import BaseTable from '../base-table';
import { computed, action } from '@ember/object';
import { notEmpty } from '@ember/object/computed';

export default BaseTable.extend({
  hasSelection: notEmpty('table.selectedRows'),

  columns: computed(function () {
    return [
      {
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar',
      },
      {
        label: 'First Name',
        valuePath: 'firstName',
        width: '150px',
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
        width: '150px',
      },
      {
        label: 'Address',
        valuePath: 'address',
      },
      {
        label: 'State',
        valuePath: 'state',
      },
      {
        label: 'Country',
        valuePath: 'country',
      },
    ];
  }),

  @action
  selectAll() {
    this.table.rows.setEach('selected', true);
  },

  @action
  deselectAll() {
    this.table.selectedRows.setEach('selected', false);
  },

  @action
  deleteAll() {
    this.table.removeRows(this.table.selectedRows);
  },
});
// END-SNIPPET
