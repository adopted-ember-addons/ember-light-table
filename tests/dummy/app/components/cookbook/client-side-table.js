// BEGIN-SNIPPET client-side-table
import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';
import { computed, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default Component.extend(TableCommon, {
  query: '',

  // No need for `enableSync` here
  enableSync: false,

  isLoading: computed.or('fetchRecords.isRunning', 'setRows.isRunning').readOnly(),

  // Sort Logic
  sortedModel: computed.sort('model', 'sortBy').readOnly(),
  sortBy: computed('dir', 'sort', function() {
    return [`${this.get('sort')}:${this.get('dir')}`];
  }).readOnly(),

  // Filter Input Setup
  selectedFilter: computed.oneWay('possibleFilters.firstObject'),
  possibleFilters: computed('table.columns', function() {
    return this.get('table.columns').filterBy('sortable', true);
  }).readOnly(),

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

  fetchRecords: task(function*() {
    let records = yield this.get('store').query('user', { page: 1, limit: 100 });
    this.get('model').setObjects(records.toArray());
    this.set('meta', records.get('meta'));
    yield this.get('filterAndSortModel').perform();
  }).on('init'),

  setRows: task(function*(rows) {
    this.get('table').setRows([]);
    yield timeout(100); // Allows isLoading state to be shown
    this.get('table').setRows(rows);
  }).restartable(),

  filterAndSortModel: task(function*(debounceMs = 200) {
    yield timeout(debounceMs); // debounce

    let query = this.get('query');
    let model = this.get('sortedModel');
    let valuePath = this.get('selectedFilter.valuePath');
    let result = model;

    if (query !== '') {
      result = model.filter((m) => {
        return m.get(valuePath).toLowerCase().includes(query.toLowerCase());
      });
    }

    yield this.get('setRows').perform(result);
  }).restartable(),

  actions: {
    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath')
        });

        this.get('filterAndSortModel').perform(0);
      }
    }
  },

  @action
  onSearchChange() {
    this.filterAndSortModel.perform();
  }
});
// END-SNIPPET
