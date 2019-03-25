// BEGIN-SNIPPET spreadsheet-table
import Component from '@ember/component';
import { computed } from '@ember/object';
import TableCommon from '../../mixins/table-common';

export default Component.extend(TableCommon, {

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

  actions: {
    selectAll() {
      this.get('table').selectAll();
    },

    deselectAll() {
      this.get('table').deselectAll();
    },

    deleteAll() {
      this.get('table').removeRows(this.get('table.selectedRows'));
    }
  }

});
// END-SNIPPET
