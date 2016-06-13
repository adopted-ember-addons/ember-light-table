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
      width: '150px',
      type: 'draggable'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }, {
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
    }];
  })
});
