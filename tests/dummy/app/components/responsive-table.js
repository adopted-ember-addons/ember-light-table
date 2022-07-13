// BEGIN-SNIPPET responsive-table
import classic from 'ember-classic-decorator';
import BaseTable from './base-table';
import { action } from '@ember/object';

@classic
export default class ResponsiveTable extends BaseTable {
  get columns() {
    return [{
      width: '40px',
      sortable: false,
      cellComponent: 'row-toggle',
      breakpoints: ['mobile', 'tablet', 'desktop']
    }, {
      label: 'Avatar',
      valuePath: 'avatar',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px',
      breakpoints: ['tablet', 'desktop', 'jumbo']
    }, {
      label: 'Address',
      valuePath: 'address',
      breakpoints: ['tablet', 'desktop', 'jumbo']
    }, {
      label: 'State',
      valuePath: 'state',
      breakpoints: ['desktop', 'jumbo']
    }, {
      label: 'Country',
      valuePath: 'country',
      breakpoints: ['jumbo']
    }];
  }

  @action
  onAfterResponsiveChange(matches) {
    if (matches.indexOf('jumbo') > -1) {
      this.table.expandedRows.setEach('expanded', false);
    }
  }
}
// END-SNIPPET
