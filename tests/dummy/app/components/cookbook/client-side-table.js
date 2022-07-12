// BEGIN-SNIPPET client-side-table
import BaseTable from '../base-table';
import { computed, action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';

export default BaseTable.extend({
  query: '',

  // No need for `enableSync` here
  enableSync: false,

  isLoading: computed
    .or('fetchRecords.isRunning', 'setRows.isRunning')
    .readOnly(),

  // Sort Logic
  sortedModel: computed.sort('model', 'sortBy').readOnly(),
  sortBy: computed('dir', 'sort', function () {
    return [`${this.sort}:${this.dir}`];
  }).readOnly(),

  // Filter Input Setup
  selectedFilter: computed.oneWay('possibleFilters.firstObject'),
  // eslint-disable-next-line ember/require-computed-macros
  possibleFilters: computed('table.columns', function () {
    return this.table.columns.filterBy('sortable', true);
  }).readOnly(),

  columns: computed(function () {
    return [
      {
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar',
      },
      {
        label: 'First Name',
        valuePath: 'firstName',
        width: '150px',
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
        width: '150px',
      },
      {
        label: 'Address',
        valuePath: 'address',
      },
      {
        label: 'State',
        valuePath: 'state',
      },
      {
        label: 'Country',
        valuePath: 'country',
      },
    ];
  }),

  fetchRecords: task(function* () {
    let records = yield this.store.query('user', { page: 1, limit: 100 });
    this.model.setObjects(records.toArray());
    this.set('meta', records.meta);
    yield this.filterAndSortModel.perform();
  }).on('init'),

  setRows: task(function* (rows) {
    this.table.setRows([]);
    yield timeout(100); // Allows isLoading state to be shown
    this.table.setRows(rows);
  }).restartable(),

  filterAndSortModel: task(function* (debounceMs = 200) {
    yield timeout(debounceMs); // debounce

    let { query } = this;
    let model = this.sortedModel;
    let result = model;

    if (query !== '' && this.selectedFilter !== undefined) {
      let { valuePath } = this.selectedFilter;

      result = model.filter((m) => {
        return m.get(valuePath).toLowerCase().includes(query.toLowerCase());
      });
    }

    yield this.setRows.perform(result);
  }).restartable(),

  actions: {
    onColumnClick(column) {
      if (column.sorted) {
        this.setProperties({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.valuePath,
        });

        this.filterAndSortModel.perform(0);
      }
    },
  },

  @action
  onSearchChange() {
    this.filterAndSortModel.perform();
  },
});
// END-SNIPPET
