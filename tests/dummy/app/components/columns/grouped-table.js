// BEGIN-SNIPPET grouped-table
import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const {
  Component,
  computed
} = Ember;

export default Component.extend(TableCommon, {
  columns: computed(function() {
    return [{
      label: 'User Details',
      sortable: false,
      align: 'center',

      subColumns: [{
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar'
      }, {
        label: 'First',
        valuePath: 'firstName',
        width: '150px'
      }, {
        label: 'Last',
        valuePath: 'lastName',
        width: '150px'
      }]
    }, {
      label: 'Contact Information',
      sortable: false,
      align: 'center',

      subColumns: [{
        label: 'Address',
        valuePath: 'address'
      }, {
        label: 'State',
        valuePath: 'state'
      }, {
        label: 'Country',
        valuePath: 'country'
      }]
    }];
  })
});
// END-SNIPPET
