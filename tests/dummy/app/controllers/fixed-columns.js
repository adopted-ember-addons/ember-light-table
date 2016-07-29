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
      width: '60px',
      sortable: false,
      fixed: true,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '150px',
      fixed: true,
      format(value) {
        return value.toUpperCase();
      }
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address',
      width: '500px'
    }, {
      label: 'State',
      valuePath: 'state',
      width: '200px'
    }, {
      label: 'Country',
      valuePath: 'country',
      width: '200px'
    }];
  })
});
