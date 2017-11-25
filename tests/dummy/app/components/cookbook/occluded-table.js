// BEGIN-SNIPPET occluded-table
import Component from '@ember/component';
import TableCommon from '../../mixins/table-common';
import { computed } from '@ember/object';

export default Component.extend(TableCommon, {
  limit: 100,
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
      width: '150px'
    }, {
      label: 'Last Name',
      valuePath: 'lastName',
      width: '150px'
    }, {
      label: 'Address',
      valuePath: 'address'
    }, {
      label: 'State',
      valuePath: 'state'
    }, {
      label: 'Country',
      valuePath: 'country'
    }];
  }),

  init() {
    this._super(...arguments);
    this.set('page', 1);
    this.get('fetchRecords').perform();
  }
});
// END-SNIPPET
