// BEGIN-SNIPPET table-actions-table
import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const { Component, computed } = Ember;

export default Component.extend(TableCommon, {
  columns: computed(function() {
    return [
      {
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar'
      },
      {
        label: 'First Name',
        valuePath: 'firstName',
        width: '150px'
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
        width: '150px'
      },
      {
        label: 'Address',
        valuePath: 'address'
      },
      {
        label: 'State',
        valuePath: 'state'
      },
      {
        label: 'Country',
        valuePath: 'country'
      },
      {
        label: 'Actions',
        width: '100px',
        sortable: false,
        cellComponent: 'user-actions'
      }
    ];
  }),

  actions: {
    deleteUser(row) {
      let confirmed = window.confirm(
        `Are you sure you want to delete ${row.get('firstName')} ${row.get(
          'lastName'
        )}?`
      );

      if (confirmed) {
        this.get('table').removeRow(row);
        row.get('content').deleteRecord();
      }
    },

    notifyUser(row) {
      window.alert(
        `${row.get('firstName')} ${row.get('lastName')} has been notified.`
      );
    }
  }
});
// END-SNIPPET
