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
      breakpoints: ['xs', 'sm', 'md', 'lg']
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px',
      breakpoints: ['xs', 'sm', 'md', 'lg']
    }, {
      label: 'Address',
      valuePath: 'address',
      breakpoints: ['sm', 'md', 'lg']
    }, {
      label: 'State',
      valuePath: 'state',
      breakpoints: ['md', 'lg']
    }, {
      label: 'Country',
      valuePath: 'country',
      breakpoints: ['lg']
    }];
  })
});
