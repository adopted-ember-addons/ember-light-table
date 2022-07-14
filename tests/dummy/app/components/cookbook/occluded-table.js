// BEGIN-SNIPPET occluded-table
import classic from 'ember-classic-decorator';
import BaseTable from '../base-table';

@classic
export default class OccludedTable extends BaseTable {
  limit = 100;

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
    this.set('page', 1);
    this.fetchRecords.perform();
  }
}
// END-SNIPPET
