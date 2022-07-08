// BEGIN-SNIPPET table-actions-table
import BaseTable from '../base-table';
import { computed, action } from '@ember/object';

export default BaseTable.extend({
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
    }, {
      label: 'Actions',
      width: '100px',
      sortable: false,
      cellComponent: 'user-actions'
    }];
  }),

  @action
  deleteUser(row) {
    let confirmed = window.confirm(`Are you sure you want to delete ${row.get('firstName')} ${row.get('lastName')}?`);

    if (confirmed) {
      this.table.removeRow(row);
      row.get('content').deleteRecord();
    }
  },

  @action
  notifyUser(row) {
    window.alert(`${row.get('firstName')} ${row.get('lastName')} has been notified.`);
  }
});
// END-SNIPPET
