// BEGIN-SNIPPET paginated-table
import BaseTable from '../base-table';
import { action } from '@ember/object';

export default class PaginatedTable extends BaseTable {
  limit = 12;

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
    this.setPage(1);
  }

  @action
  setPage(page) {
    const totalPages = this.meta?.totalPages;
    const currPage = this.page;

    if (page < 1 || page > totalPages || page === currPage) {
      return;
    }

    this.page = page;
    const currentRecordsArray = this.table.rows.toArray();
    this.table.removeRows(currentRecordsArray);
    this.fetchRecords.perform();
  }
}
// END-SNIPPET
