// BEGIN-SNIPPET client-side-table
import BaseTable from '../base-table';
import { action } from '@ember/object';
import { restartableTask, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

export default class PaginatedTable extends BaseTable {
  query = '';

  model = [];

  get sortedModel() {
    if (this.dir === 'asc') return this.args.model.sortBy(this.sort);
    else return this.args.model.sortBy(this.sort).reverse();
  }

  get isLoading() {
    return this.fetchRecords?.isRunning || this.setRows?.isRunning;
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

  constructor() {
    super(...arguments);
    this.fetchRecords.perform();
  }

  @restartableTask *fetchRecords() {
    const records = yield this.store.query('user', { page: 1, limit: 100 });
    const recordsArray = records.toArray();
    this.args.model.pushObjects(recordsArray);

    this.meta = records.meta;
    yield this.filterAndSortModel.perform();
  }

  @restartableTask *setRows(rows) {
    this.table.setRows([]);
    yield timeout(100); // Allows isLoading state to be shown
    this.table.setRows(rows);
  }

  @restartableTask *filterAndSortModel(debounceMs = 200) {
    yield timeout(debounceMs); // debounce

    const query = this.query;
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
  updateQuery(event) {
    this.query = event.target.value;
  }

  @action
  onSearchChange() {
    this.filterAndSortModel.perform();
  }
}
// END-SNIPPET
