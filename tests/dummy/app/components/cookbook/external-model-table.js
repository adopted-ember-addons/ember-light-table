// BEGIN-SNIPPET external-model-table
import Component from '@ember/component';
import { computed } from '@ember/object';
import Table from 'ember-light-table';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';
import diffAttrs from 'ember-diff-attrs';

export default Component.extend({
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

  canLoadMore: true,
  enableSync: true,

  meta: null,
  table: null,

  didReceiveAttrs: diffAttrs('model', function(changedAttrs, ...args) {
    this._super(...args);

    if (changedAttrs && changedAttrs.model) {
      if (isEmpty(changedAttrs.model[1])) {
        this.set('canLoadMore', false);
      } else {
        this.get('rows').pushObjects(changedAttrs.model[1].toArray());
        this.set('meta', changedAttrs.model[1].get('meta'));
      }
    }
  }),

  init() {
    this._super(...arguments);

    this.set('rows', A([]));
    let table = new Table(this.get('columns'), this.get('rows'), { enableSync: this.get('enableSync') });
    let sortColumn = table.get('allColumns').findBy('valuePath', this.get('sort'));

    // Setup initial sort column
    if (sortColumn) {
      sortColumn.set('sorted', true);
    }

    this.set('table', table);
  },

  actions: {
    onScrolledToBottom() {
      if (this.get('canLoadMore')) {
        this.get('fetchMore')();
      }
    },

    onColumnClick(column) {
      if (column.sorted) {
        this.set('canLoadMore', true);
        this.get('onSort')({
          dir: column.ascending ? 'asc' : 'desc',
          sort: column.get('valuePath'),
          page: 1
        });
        this.get('rows').clear();
      }
    }
  }
});
// END-SNIPPET
