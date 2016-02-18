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

  columns: [
    {
      label: 'Avatar',
      valuePath: 'avatar',
      width: '100px',
      cellComponent: 'user-avatar'
    },
    {
      label: 'Full Name',
      subColumns: [
        {
          label: 'First Name',
          valuePath: 'firstName'
        },
        {
          label: 'Last Name',
          valuePath: 'lastName'
        }
      ]
    },
    {
      label: 'Address',
      valuePath: 'address'
    },
    {
      label: 'State',
      valuePath: 'state'
    },
    {
      label: 'Country',
      valuePath: 'country'
    }
  ],

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('user', this.getProperties(['page', 'limit'])).then(records => {
      this.table.addRows(records.toArray());
      this.set('isLoading', false);
    });
  },

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('model'), this.get('columns')));
  },

  actions: {
    onScrolledToBottom() {
      this.incrementProperty('page');
      this.fetchRecords();
    }
  }
});
