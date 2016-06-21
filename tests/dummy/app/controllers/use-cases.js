import Ember from 'ember';
import TableController from './table';

const {
  computed
} = Ember;

export default TableController.extend({
  showSnippet: false,

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
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '250px'
    }, {
      label: 'Address',
      valuePath: 'address'
    }, {
      label: 'State',
      valuePath: 'state',
      width: '500px'
    }, {
      label: 'Country',
      valuePath: 'country'
    }];
  })
});
