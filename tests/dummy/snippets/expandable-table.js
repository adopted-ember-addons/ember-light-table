import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Component.extend({
  page: 1,
  limit: 20,
  dir: 'asc',
  sort: null,
  table: null,
  isLoading: false,

  columns: [{
    label: 'First Name',
    valuePath: 'firstName'
  }, {
    label: 'Last Name',
    valuePath: 'lastName'
  }],

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.columns));
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.get('store').query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then(records => {
      this.table.addRows(records.toArray());
      this.set('isLoading', false);
    });
  },

  actions: {
    onScrolledToBottom() {
      this.incrementProperty('page');
      this.fetchRecords();
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
        this.table.setRows([]);
        this.fetchRecords();
      }
    }
  }
});
