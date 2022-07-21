// BEGIN-SNIPPET expandable-table
import BaseTable from '../base-table';

export default class ExpandableTable extends BaseTable {
  get columns() {
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
  }
}
// END-SNIPPET
