// BEGIN-SNIPPET grouped-table
import classic from 'ember-classic-decorator';
import BaseTable from '../base-table';

@classic
export default class GroupedTable extends BaseTable {
  get columns() {
    return [
      {
        label: 'User Details',
        sortable: false,
        align: 'center',

        subColumns: [
          {
            label: 'Avatar',
            valuePath: 'avatar',
            width: '60px',
            sortable: false,
            cellComponent: 'user-avatar',
          },
          {
            label: 'First',
            valuePath: 'firstName',
            width: '150px',
          },
          {
            label: 'Last',
            valuePath: 'lastName',
            width: '150px',
          },
        ],
      },
      {
        label: 'Contact Information',
        sortable: false,
        align: 'center',

        subColumns: [
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
        ],
      },
    ];
  }
}
// END-SNIPPET
