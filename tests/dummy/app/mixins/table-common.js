// BEGIN-SNIPPET table-common
import Ember from 'ember';
import Table from 'ember-light-table';

const {
  inject,
  isEmpty
} = Ember;

export default Ember.Mixin.create({
  store: inject.service(),

  page: 1,
  limit: 10,
  dir: 'asc',
  sort: 'firstName',

  isLoading: false,
  canLoadMore: true,

  model: null,
  columns: null,
  table: null,

  init() {
    this._super(...arguments);

    let sort = this.get('sort');
    let table = new Table(this.get('columns'), this.get('model'), { enableSync: true });
    let sortColumn = table.get('allColumns').findBy('valuePath', sort);

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.get('store').query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then((records) => {
      this.get('model').pushObjects(records.toArray());
      this.set('canLoadMore', !isEmpty(records));
    }).finally(() => {
      this.set('isLoading', false);
    });
  },

  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.incrementProperty('page');
        this.fetchRecords();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
        this.get('model').clear();
        this.fetchRecords();
      }
    }
  }
});
// END-SNIPPET
