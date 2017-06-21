// BEGIN-SNIPPET horizontal-scrolling-table
import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const {
  Component,
  computed
} = Ember;

export default Component.extend(TableCommon, {
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
      width: '350px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '350px'
    }, {
      label: 'Address',
      valuePath: 'address',
      width: '350px'
    }, {
      label: 'State',
      valuePath: 'state',
      width: '350px'
    }, {
      label: 'Country',
      valuePath: 'country',
      width: '350px'
    }];
  })
});
// END-SNIPPET
