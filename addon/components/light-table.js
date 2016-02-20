import Ember from 'ember';
import layout from '../templates/components/light-table';
import TableScroll from '../mixins/table-scroll';

const {
  computed,
  canInvoke
} = Ember;

/**
 * @module Components
 * @class Light-Table
 * @extends Ember.Component
 * @uses TableScroll
 */

export default Ember.Component.extend(TableScroll, {
  layout,
  tagName: 'table',
  classNames: ['ember-light-table'],

  /**
   * @property table
   * @type {Table}
   */
  table: null,
  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,
  /**
   * @property expandedRowComponent
   * @type {String}
   */
  expandedRowComponent: null,
  /**
   * @property noDataComponent
   * @type {String}
   */
  noDataComponent: null,
  /**
   * @property loadingComponent
   * @type {String}
   */
  loadingComponent: null,
  /**
   * @property noDataText
   * @type {String}
   * @default 'No data.'
   */
  noDataText: 'No data.',
  /**
   * @property canSelect
   * @type {Boolean}
   * @default true
   */
  canSelect: true,
  /**
   * @property isLoading
   * @type {Boolean}
   * @default false
   */
  isLoading: false,
  /**
   * @property multiRowExpansion
   * @type {Boolean}
   * @default true
   */
  multiRowExpansion: true,
  /**
   * @property expandOnClick
   * @type {Boolean}
   * @default true
   */
  expandOnClick: true,
  /**
   * @property multiColumnSort
   * @type {Boolean}
   * @default false
   */
  multiColumnSort: false,
  /**
   * @property iconAscending
   * @type {String}
   * @default ''
   */
  iconAscending: '',
  /**
   * @property iconDescending
   * @type {String}
   * @default ''
   */
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

      if(this.get('canExpand') && this.get('expandOnClick')) {
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
