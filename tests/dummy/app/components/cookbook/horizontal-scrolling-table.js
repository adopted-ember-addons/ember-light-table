// BEGIN-SNIPPET horizontal-scrolling-table
import BaseTable from '../base-table';
import { computed } from '@ember/object';

export default BaseTable.extend({
  columns: computed(function() {
    return [{
      label: 'Avatar',
      valuePath: 'avatar',
      width: '60px',
      sortable: false,
      cellComponent: 'user-avatar'
    }, {
      label: 'First Name',
      valuePath: 'firstName',
      width: '350px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '350px'
    }, {
      label: 'Address',
      valuePath: 'address',
      width: '350px'
    }, {
      label: 'State',
      valuePath: 'state',
      width: '350px'
    }, {
      label: 'Country',
      valuePath: 'country',
      width: '350px'
    }];
  })
});
// END-SNIPPET
