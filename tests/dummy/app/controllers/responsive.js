import Ember from 'ember';
import TableController from './table';

const {
  computed
} = Ember;

export default TableController.extend({
  columns: computed(function() {
    return [{
      width: '40px',
      sortable: false,
      cellComponent: 'row-toggle',
      breakpoints: ['xs', 'sm', 'md']
    }, {
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
      width: '150px',
      breakpoints: ['sm', 'md', 'lg']
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
  }),

  actions: {
    onBreakpointChange(matches) {
      if (matches.indexOf('lg') > -1) {
        this.get('table.expandedRows').setEach('expanded', false);
      }
    }
  }
});
