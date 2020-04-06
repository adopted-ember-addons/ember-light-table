// BEGIN-SNIPPET responsive-table
import Component from '@ember/component';
import TableCommon from '../mixins/table-common';
import { computed, action } from '@ember/object';

export default Component.extend(TableCommon, {
  columns: computed(function() {
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
  }),

  @action
  onAfterResponsiveChange(matches) {
    if (matches.indexOf('jumbo') > -1) {
      this.get('table.expandedRows').setEach('expanded', false);
    }
  }
});
// END-SNIPPET
