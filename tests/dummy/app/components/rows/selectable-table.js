// BEGIN-SNIPPET selectable-table
import BaseTable from '../base-table';
import { computed, action } from '@ember/object';

export default BaseTable.extend({
  hasSelection: computed.notEmpty('table.selectedRows'),

  columns: computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatar',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address'
    }, {
      label: 'State',
      valuePath: 'state'
    }, {
      label: 'Country',
      valuePath: 'country'
    }];
  }),

  @action
  selectAll() {
    this.get('table.rows').setEach('selected', true);
  },

  @action
  deselectAll() {
    this.get('table.selectedRows').setEach('selected', false);
  },

  @action
  deleteAll() {
    this.get('table').removeRows(this.get('table.selectedRows'));
  }
});
// END-SNIPPET
