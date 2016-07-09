import Ember from 'ember';
import TableController from './table';

const {
  computed
} = Ember;

export default TableController.extend({
  columns: computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatar',
      resizable: true,
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      resizable: true,
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      resizable: true,
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address',
      resizable: true
    }, {
      label: 'State',
      valuePath: 'state',
      resizable: true
    }, {
      label: 'Country',
      valuePath: 'country',
      resizable: true
    }];
  })
});
