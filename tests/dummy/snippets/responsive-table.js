import Ember from 'ember';
import Table from 'ember-light-table';

const { isEmpty, computed } = Ember;

export default Ember.Component.extend({
  page: 1,
  limit: 20,
  dir: 'asc',
  sort: null,
  model: null,
  isLoading: false,
  canLoadMore: true,

  columns: computed(function() {
    return [{
      width: '40px',
      sortable: false,
      cellComponent: 'row-toggle',
      breakpoints: ['mobile', 'tablet', 'desktop']
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
      breakpoints: ['tablet', 'desktop', 'jumbo']
    }, {
      label: 'Address',
      valuePath: 'address',
      breakpoints: ['tablet', 'desktop', 'jumbo']
    }, {
      label: 'State',
      valuePath: 'state',
      breakpoints: ['desktop', 'jumbo']
    }, {
      label: 'Country',
      valuePath: 'country',
      breakpoints: ['jumbo']
    }];
  }),

  table: computed('model', function() {
    return new Table(this.get('columns'), this.get('model'), { enableSync: true });
  }),

  fetchRecords() {
    this.set('isLoading', true);
    this.store.query('user', this.getProperties(['page', 'limit', 'sort', 'dir'])).then(records => {
      this.get('model').pushObjects(records.toArray());
      this.set('isLoading', false);
      this.set('canLoadMore', !isEmpty(records));
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
    },

    onAfterResponsiveChange(matches) {
      if (matches.indexOf('jumbo') > -1) {
        this.get('table.expandedRows').setEach('expanded', false);
      }
    }
  }
});
