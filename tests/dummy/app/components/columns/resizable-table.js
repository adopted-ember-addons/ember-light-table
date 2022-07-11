// BEGIN-SNIPPET resizable-table
import classic from 'ember-classic-decorator';
import BaseTable from '../base-table';

@classic
export default class ResizableTable extends BaseTable {
  get columns() {
    return [{
      label: 'User Details',
      sortable: false,
      align: 'center',

      subColumns: [{
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar'
      }, {
        label: 'First',
        resizable: true,
        valuePath: 'firstName',
        width: '150px',
        minResizeWidth: 75
      }, {
        label: 'Last',
        resizable: true,
        valuePath: 'lastName',
        width: '150px',
        minResizeWidth: 75
      }]
    }, {
      label: 'Contact Information',
      sortable: false,
      align: 'center',

      subColumns: [{
        label: 'Address',
        resizable: true,
        valuePath: 'address',
        minResizeWidth: 100
      }, {
        label: 'State',
        resizable: true,
        valuePath: 'state',
        minResizeWidth: 100
      }, {
        label: 'Country',
        resizable: true,
        valuePath: 'country',
        minResizeWidth: 100
      }]
    }];
  }
}
// END-SNIPPET
