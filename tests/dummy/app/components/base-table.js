// BEGIN-SNIPPET base-table
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Table from 'ember-light-table';
import { restartableTask } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

@classic
export default class BaseTable extends Component {
  @service store;

  enableSync = true;
  model = null;

  @tracked canLoadMore = true;
  @tracked dir = 'asc';
  @tracked limit = 10;
  @tracked meta = null;
  @tracked page = 0;
  @tracked sort = 'firstName';

  table = null;

  init() {
    super.init(...arguments);

    const table = Table.create({
      columns: this.columns,
      rows: this.model,
      enableSync: this.enableSync,
    });
    const sortColumn = table.get('allColumns').findBy('valuePath', this.sort);

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.table = table;
  }

  get isLoading() {
    return this.fetchRecords.isRunning;
  }

  @restartableTask *fetchRecords() {
    const records = yield this.store.query('user', {
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      dir: this.dir,
    });
    this.model.pushObjects(records.toArray());
    this.meta = records.meta;
    this.canLoadMore = !isEmpty(records);
  }

  @action
  onScrolledToBottom() {
    if (this.canLoadMore) {
      this.page = this.page + 1;
      this.fetchRecords.perform();
    }
  }

  @action
  onColumnClick(column) {
    if (column.sorted) {
      this.dir = column.ascending ? 'asc' : 'desc';
      this.sort = column.get('valuePath');
      this.canLoadMore = true;
      this.page = 0;
      this.model.clear();
    }
  }
}
// END-SNIPPET
