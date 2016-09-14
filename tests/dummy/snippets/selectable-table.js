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
        this.get('model').clear();
        this.fetchRecords();
      }
    },

    selectAll() {
      this.get('table').rows.setEach('selected', true);
    },

    deselectAll() {
      this.get('table.selectedRows').setEach('selected', false);
    },

    deleteAll() {
      this.get('table').removeRows(this.get('table.selectedRows'));
    }
  }
});
