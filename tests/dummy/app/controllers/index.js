import Ember from 'ember';
import Table from 'ember-light-table';

const {
  computed
} = Ember;

export default Ember.Controller.extend({
  isLoading: false,
  page: 1,

  limit: computed('page', function() {
    return this.page === 1 ? 50 : 20; // Doing this just to enable scroll
  }),

  columns: computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatar',
      sortable: false,
      align: 'center',
      cellComponent: 'user-avatar'
      }, {
        label: 'Full Name',
        sortable: false,
        align: 'center',
        subColumns: [{
            label: 'First Name',
            valuePath: 'firstName',
            width: '150px'
        }, {
            label: 'Last Name',
            valuePath: 'lastName',
            width: '150px'
        }]
      }, {
          label: 'Address',
          valuePath: 'address'
      }, {
          label: 'State',
          valuePath: 'state'
      }, {
          label: 'Country',
          valuePath: 'country'
      }, {
          label: 'Actions',
          sortable: false,
          align: 'center',
          cellComponent: 'user-actions'
      }];
  }),

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('user', this.getProperties(['page', 'limit'])).then(records => {
      this.table.addRows(records.toArray());
      this.set('isLoading', false);
    });
  },

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns')));
  },

  actions: {
    onScrolledToBottom() {
      this.incrementProperty('page');
      this.fetchRecords();
    },

    deleteUser(row) {
      this.table.removeRow(row);
    }
  }
});
