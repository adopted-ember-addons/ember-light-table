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
  tableActions: null,
  expandedRowComponent: null,
  noDataComponent: null,
  loadingComponent: null,
  noDataText: 'No data.',
  canSelect: true,
  isLoading: false,
  multiRowExpansion: true,
  multiColumnSort: false,
  iconAscending: '',
  iconDescending: '',

  rows: computed.oneWay('table.rows'),
  columns: computed.oneWay('table.columns'),

  canExpand: computed.notEmpty('expandedRowComponent'),
  hasNoData: computed.empty('rows'),

  sortIcons: computed('iconAscending', 'iconDescending', function() {
    return this.getProperties(['iconAscending', 'iconDescending']);
  }),

  visibleColumns: computed.oneWay('table.visibleColumns'),
  visibleColumnGroups: computed.oneWay('table.visibleColumnGroups'),
  visibleSubColumns: computed.oneWay('table.visibleSubColumns'),

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
      if(column.sortable) {
        if(column.sorted) {
          column.toggleProperty('ascending');
        } else {
          if(!this.get('multiColumnSort')) {
            this.get('table.sortedColumns').setEach('sorted', false);
          }
          column.set('sorted', true);
        }
      }
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

    onColumnDoubleClick(column) {
      this._callAction('onColumnDoubleClick', column);
    },

    onRowDoubleClick(row) {
      this._callAction('onRowDoubleClick', row);
    },

    onScrolledToBottom() {
      this._callAction('onScrolledToBottom');
    },
  }
});
