// BEGIN-SNIPPET client-side-table
import classic from 'ember-classic-decorator';
import BaseTable from '../base-table';
import { action } from '@ember/object';
import { task, restartableTask, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

@classic
export default class PaginatedTable extends BaseTable {
  query = '';

  // No need for `enableSync` here
  enableSync = false;

  @tracked model;

  get sortedModel() {
    if (this.dir === 'asc') return this.model.sortBy(this.sort);
    else return this.model.sortBy(this.sort).reverse();
  }

  get isLoading() {
    return this.fetchRecord?.isRunning || this.setRows?.isRunning;
  }

  // Filter Input
  @tracked selectedFilter = this.possibleFilters.firstObject;

  get possibleFilters() {
    return this.table.columns.filterBy('sortable', true);
  }

  get columns() {
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
  }

  @task({ on: 'init' }) *fetchRecords() {
    const records = yield this.store.query('user', { page: 1, limit: 100 });
    this.model.setObjects(records.toArray());
    this.set('meta', records.meta);
    yield this.filterAndSortModel.perform();
  }

  @restartableTask *setRows(rows) {
    this.table.setRows([]);
    yield timeout(100); // Allows isLoading state to be shown
    this.table.setRows(rows);
  }

  @restartableTask *filterAndSortModel(debounceMs = 200) {
    yield timeout(debounceMs); // debounce

    const { query } = this;
    const model = this.sortedModel;
    let result = model;

    if (query !== '' && this.selectedFilter !== undefined) {
      const { valuePath } = this.selectedFilter;

      result = model.filter((m) => {
        return m.get(valuePath).toLowerCase().includes(query.toLowerCase());
      });
    }

    yield this.setRows.perform(result);
  }

  @action
  onColumnClick(column) {
    if (column.sorted) {
      this.dir = column.ascending ? 'asc' : 'desc';
      this.sort = column.valuePath;
      this.filterAndSortModel.perform(100);
    }
  }

  @action
  onSearchChange() {
    this.filterAndSortModel.perform();
  }
}
// END-SNIPPET
