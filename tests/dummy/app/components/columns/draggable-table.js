// BEGIN-SNIPPET draggable-table
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
      draggable: true,
      subColumns: [{
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        draggable: true,
        cellComponent: 'user-avatar'
      }, {
        label: 'First',
        valuePath: 'firstName',
        width: '150px',
        draggable: true
      }, {
        label: 'Last',
        valuePath: 'lastName',
        width: '150px',
        draggable: true
      }]
    }, {
      label: 'Contact Information',
      sortable: false,
      align: 'center',
      draggable: true,
      subColumns: [{
        label: 'Address',
        valuePath: 'address',
        draggable: true
      }, {
        label: 'State',
        valuePath: 'state',
        draggable: true
      }, {
        label: 'Country',
        valuePath: 'country',
        draggable: true
      }]
    }];
  })
});
// END-SNIPPET
