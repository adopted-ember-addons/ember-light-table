// BEGIN-SNIPPET paginated-table
import classic from 'ember-classic-decorator';
import BaseTable from '../base-table';
import { action } from '@ember/object';

@classic
export default class PaginatedTable extends BaseTable {
  limit = 10;

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

  init() {
    super.init(...arguments);
    this.send('setPage', 1);
  }

  @action
  setPage(page) {
    const totalPages = this.meta?.totalPages;
    const currPage = this.page;

    if (page < 1 || page > totalPages || page === currPage) {
      return;
    }

    this.set('page', page);
    this.model.clear();
    this.fetchRecords.perform();
  }
}
// END-SNIPPET
