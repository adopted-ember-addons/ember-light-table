// BEGIN-SNIPPET scrolling-table
import classic from 'ember-classic-decorator';
import BaseTable from './base-table';
import { action } from '@ember/object';

@classic
export default class ScrollingTable extends BaseTable {
  currentScrollOffset = 0;
  scrollTo = 0;
  scrollToRow = null;

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

  @action
  updateScrollPos(event) {
    this.scrollTo = event.target.value;
  }
}
// END-SNIPPET
