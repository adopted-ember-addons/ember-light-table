import Ember from 'ember';
import Table from 'ember-light-table';

export default Ember.Controller.extend({
  isLoading: false,
  page: 1,
  limit: 20,
  sort: null,
  dir: 'asc',
  columns: null,
  table: null,

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then(records => {
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
