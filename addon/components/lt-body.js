import Ember from 'ember';
import layout from '../templates/components/lt-body';
import callAction from '../utils/call-action';

const {
  isEmpty,
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'tbody',
  classNames: ['lt-body'],
  classNameBindings: ['isLoading', 'canSelect', 'multiSelect', 'isSelecting','canExpand'],

  table: null,

  /**
   * @property canSelect
   * @type {Boolean}
   * @default true
   */
  canSelect: true,

  canExpand: false,

  /**
   * @property multiSelect
   * @type {Boolean}
   * @default true
   */
  multiSelect: false,

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

  rows: computed.oneWay('table.rows'),
  columns: computed.oneWay('table.visibleColumns'),
  colspan: computed.oneWay('columns.length'),

  _currSelectedIndex: -1,
  _prevSelectedIndex: -1,

  hasNoData: computed('table.rows.[]', 'isLoading', function() {
    return isEmpty(this.get('table.rows')) && !this.get('isLoading');
  }),

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

  actions: {
    onRowClick(row, e) {
      let rows = this.get('table.rows');
      let multiSelect = this.get('multiSelect');
      let canSelect = this.get('canSelect');
      let isSelected = row.get('selected');
      let currIndex = rows.indexOf(row);
      let prevIndex = this._prevSelectedIndex === -1 ? currIndex : this._prevSelectedIndex;

      this._currSelectedIndex = currIndex;
      this._prevSelectedIndex = prevIndex;

      if (canSelect) {
        if (e.shiftKey && multiSelect) {
          rows.slice(Math.min(currIndex, prevIndex), Math.max(currIndex, prevIndex) + 1).forEach(r => r.set('selected', !isSelected));
          this._prevSelectedIndex = currIndex;
        } else if ((e.ctrlKey || e.metaKey) && multiSelect) {
          row.toggleProperty('selected');
        } else {
          this.get('table.selectedRows').setEach('selected', false);
          row.set('selected', !isSelected);

          if (this.get('canExpand') && this.get('expandOnClick')) {
            this.togglExpandedRow(row);
          }
        }
        this._prevSelectedIndex = currIndex;
      } else {
        if (this.get('canExpand') && this.get('expandOnClick')) {
          this.togglExpandedRow(row);
        }
      }

      callAction.call(this, 'onRowClick', ...arguments);
    },

    onRowDoubleClick( /* row */ ) {
      callAction.call(this, 'onRowDoubleClick', ...arguments);
    }
  }
});
