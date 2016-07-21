import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty, computed } = Ember;

export default Ember.Component.extend({
  page: 1,
  limit: 20,
  dir: 'asc',
  sort: null,
  table: null,
  isLoading: false,
  canLoadMore: true,

  columns: computed(function() {
    return [{
      label: 'User Details',
      sortable: false,
      align: 'center',
      draggable: true,
      subColumns: [{
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        draggable: true,
        cellComponent: 'user-avatar'
      }, {
        label: 'First',
        valuePath: 'firstName',
        width: '150px',
        draggable: true
      }, {
        label: 'Last',
        valuePath: 'lastName',
        width: '150px',
        draggable: true
      }]
    }, {
      label: 'Contact Information',
      sortable: false,
      align: 'center',
      draggable: true,
      subColumns: [{
        label: 'Address',
        valuePath: 'address',
        draggable: true
      }, {
        label: 'State',
        valuePath: 'state',
        draggable: true
      }, {
        label: 'Country',
        valuePath: 'country',
        draggable: true
      }]
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('table', new Table(this.get('columns')));
  },

  fetchRecords() {
    this.set('isLoading', true);
    this.get('store').query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then(records => {
      this.get('table').addRows(records);
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
        this.get('table').setRows([]);
        this.fetchRecords();
      }
    }
  }
});
