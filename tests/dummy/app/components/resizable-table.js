// BEGIN-SNIPPET resizable-table
import Ember from 'ember';
import TableCommon from '../mixins/table-common';

const {
  computed
} = Ember;

export default Ember.Component.extend(TableCommon, {
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
      resizable: true,
      minResizeWidth: 50,
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      resizable: true,
      minResizeWidth: 50,
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address',
      resizable: true,
      minResizeWidth: 100
    }, {
      label: 'State',
      valuePath: 'state',
      resizable: true,
      minResizeWidth: 100
    }, {
      label: 'Country',
      valuePath: 'country',
      resizable: true,
      minResizeWidth: 100
    }];
  })
});
// END-SNIPPET
