import Ember from 'ember';
import TableController from './table';

const {
  computed
} = Ember;

export default TableController.extend({
  hasSelection: computed.notEmpty('table.selectedRows'),
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
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address'
    }, {
      label: 'State',
      valuePath: 'state'
    }, {
      label: 'Country',
      valuePath: 'country'
    }];
  }),

  actions: {
    selectAll() {
      this.table.rows.setEach('selected', true);
    },

    deselectAll() {
      this.table.get('selectedRows').setEach('selected', false);
    },

    deleteAll() {
      this.table.removeRows(this.table.get('selectedRows'));
    }
  }
});
