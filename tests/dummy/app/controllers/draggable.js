import Ember from 'ember';
import TableController from './table';

const {
  computed
} = Ember;

export default TableController.extend({
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
