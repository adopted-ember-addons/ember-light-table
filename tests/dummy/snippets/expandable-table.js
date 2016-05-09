import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty } = Ember;

export default Ember.Component.extend({
  page: 1,
  limit: 20,
  dir: 'asc',
  sort: null,
  table: null,
  isLoading: false,
  canLoadMore: true,

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
      this.table.addRows(records);
      this.set('isLoading', false);
      this.set('canLoadMore', !isEmpty(records));
    });
  },

  actions: {
    onScrolledToBottom() {
      if(this.get('canLoadMore')) {
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
        this.table.setRows([]);
        this.fetchRecords();
      }
    }
  }
});
