// BEGIN-SNIPPET paginated-table
import Ember from 'ember';
import TableCommon from '../../mixins/table-common';

const { Component, computed } = Ember;

export default Component.extend(TableCommon, {
  columns: computed(function() {
    return [
      {
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar'
      },
      {
        label: 'First Name',
        valuePath: 'firstName',
        width: '150px'
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
        width: '150px'
      },
      {
        label: 'Address',
        valuePath: 'address'
      },
      {
        label: 'State',
        valuePath: 'state'
      },
      {
        label: 'Country',
        valuePath: 'country'
      }
    ];
  }),

  init() {
    this._super(...arguments);
    this.send('setPage', 1);
  },

  actions: {
    setPage(page) {
      let totalPages = this.get('meta.totalPages');
      let currPage = this.get('page');

      if (page < 1 || page > totalPages || page === currPage) {
        return;
      }

      this.set('page', page);
      this.get('model').clear();
      this.get('fetchRecords').perform();
    }
  }
});
// END-SNIPPET
