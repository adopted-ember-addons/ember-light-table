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
      type: 'draggable',
      subColumns: [{
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar',
        type: 'draggable'
      }, {
        label: 'First',
        valuePath: 'firstName',
        width: '150px',
        type: 'draggable'        
      }, {
        label: 'Last',
        valuePath: 'lastName',
        width: '150px',
        type: 'draggable'
      }]
    }, {
      label: 'Contact Information',
      sortable: false,
      align: 'center',
      type: 'draggable',
      subColumns: [{
        label: 'Address',
        valuePath: 'address',
        type: 'draggable'
      }, {
        label: 'State',
        valuePath: 'state',
        type: 'draggable'
      }, {
        label: 'Country',
        valuePath: 'country',
        type: 'draggable'
      }]
    }];
  })
});
