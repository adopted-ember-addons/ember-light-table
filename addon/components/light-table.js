import Ember from 'ember';
import layout from '../templates/components/light-table';
import TableScroll from '../mixins/table-scroll';

const {
  computed,
  canInvoke
} = Ember;

export default Ember.Component.extend(TableScroll, {
  layout,
  tagName: 'table',
  classNames: ['ember-light-table'],

  // Possible Options
  table: null,
  expandedRowComponent: null,
  noDataComponent: null,
  loadingComponent: null,
  noDataText: 'No data.',
  canSelect: true,
  isLoading: false,
  multiRowExpansion: true,

  canExpand: computed.notEmpty('expandedRowComponent'),
  rows: computed.oneWay('table.rows'),
  columns: computed.oneWay('table.columns'),
  hasNoData: computed.empty('rows'),

  togglExpandedRow(row) {
    let multi = this.get('multiRowExpansion');
    let shouldExpand = !row.expanded;

    if(multi) {
      row.toggleProperty('expanded');
    } else {
      this.get('table.expandedRows').setEach('expanded', false);
      row.set('expanded', shouldExpand);
    }
  },

  _callAction(action, ...params) {
    if(canInvoke(this.attrs, action)) {
      this.attrs[action](...params);
    }
  },

  actions: {
    onColumnClick(column) {
      this._callAction('onColumnClick', column);
    },

    onRowClick(row) {
      if(this.get('canSelect')) {
        row.toggleProperty('selected');
      }

      if(this.get('canExpand')) {
        this.togglExpandedRow(row);
      }

      this._callAction('onRowClick', row);
    },

    onScrolledToBottom() {
      this._callAction('onScrolledToBottom');
    },
  }
});
