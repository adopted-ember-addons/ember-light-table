// BEGIN-SNIPPET paginated-table
import BaseTable from '../base-table';
import { computed, action } from '@ember/object';

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
    this.send('setPage', 1);
  },

  @action
  setPage(page) {
    let totalPages = this.get('meta.totalPages');
    let currPage = this.get('page');

    if (page < 1 || page > totalPages || page === currPage) {
      return;
    }

    this.set('page', page);
    this.model.clear();
    this.fetchRecords.perform();
  }
});
// END-SNIPPET
