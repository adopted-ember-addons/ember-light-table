// BEGIN-SNIPPET expandable-table
import BaseTable from '../base-table';
import { computed } from '@ember/object';

export default BaseTable.extend({
  columns: computed(function () {
    return [
      {
        label: 'First Name',
        valuePath: 'firstName',
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
      },
    ];
  }),
});
// END-SNIPPET
