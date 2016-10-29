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
