// BEGIN-SNIPPET base-table
import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import Table from 'ember-light-table';
import { restartableTask } from 'ember-concurrency';

@classic
export default class BaseTable extends Component {
  @service store;

  page = 0;
  limit = 10;
  dir = 'asc';
  sort = 'firstName';

  isLoading = computed.oneWay('fetchRecords.isRunning');
  canLoadMore = true;
  enableSync = true;

  model = null;
  meta = null;
  table = null;

  init() {
    super.init(...arguments);

    let table = Table.create({
      columns: this.columns,
      rows: this.model,
      enableSync: this.enableSync,
    });
    let sortColumn = table.get('allColumns').findBy('valuePath', this.sort);

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  }

  @restartableTask *fetchRecords() {
    const records = yield this.store.query('user', [this.page, this.limit, this.sort, this.dir]);
    this.model.pushObjects(records.toArray());
    this.set('meta', records.get('meta'));
    this.set('canLoadMore', !isEmpty(records));
  }

  @action
  onScrolledToBottom() {
    if (this.canLoadMore) {
      this.incrementProperty('page');
      this.fetchRecords.perform();
    }
  }

  @action
  onColumnClick(column) {
    if (column.sorted) {
      this.setProperties({
        dir: column.ascending ? 'asc' : 'desc',
        sort: column.get('valuePath'),
        canLoadMore: true,
        page: 0,
      });
      this.model.clear();
    }
  }
}
// END-SNIPPET
