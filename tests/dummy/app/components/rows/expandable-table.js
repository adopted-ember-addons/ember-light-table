// BEGIN-SNIPPET expandable-table
import classic from 'ember-classic-decorator';
import BaseTable from '../base-table';

@classic
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
