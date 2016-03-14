import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Controller.extend({
  columns: null,
  table: null,
  sort: null,
  page: 1,
  limit: 20,
  dir: 'asc',
  isLoading: false,

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns')));
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then(records => {
      this.table.addRows(records);
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
