import Ember from 'ember';
import layout from '../templates/components/lt-body';
import callAction from '../utils/call-action';

const {
  computed
} = Ember;

/**
 * @module Components
 */

/**
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{#t.body multiSelect=true onRowClick=(action 'rowClicked')}}
 *     {{#body.expanded-row as |row|}}
 *       Hello <b>{{row.firstName}}</b>
 *     {{/body.expanded-row}}
 *
 *     {{#if isLoading}}
 *       {{#body.loader}}
 *         Loading...
 *       {{/body.loader}}
 *     {{/if}}
 *
 *     {{#if table.isEmpty)}}
 *       {{#body.no-data}}
 *         No users found.
 *       {{/body.no-data}}
 *     {{/if}}
 *   {{/t.body}}
 * {{/light-table}}
 * ```
 *
 * @class Body
 */

export default Ember.Component.extend({
  layout,
  tagName: 'tbody',
  classNames: ['lt-body'],
  classNameBindings: ['isLoading', 'canSelect', 'multiSelect', 'isSelecting','canExpand'],

  /**
   * @property table
   * @type {Table}
   * @private
   */
  table: null,

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * Allows a user to select a row on click. All this will do is apply the necessary
   * CSS classes and add the row to `table.selectedRows`. If `multiSelect` is disabled
   * only one row will be selected at a time.
   * 
   * @property canSelect
   * @type {Boolean}
   * @default true
   */
  canSelect: true,

  /**
   * Allows for expanding row. This will create a new row under the row that was
   * clicked with the template provided by `body.expanded-row`.
   *
   * ```hbs
   * {{#body.expanded-row as |row|}}
   * 	This is the content of the expanded row for {{row.firstName}}
   * {{/body.expanded-row}}
   * ```
   *
   * @property canExpand
   * @type {Boolean}
   * @default false
   */
  canExpand: false,

  /**
   * Allows a user to select multiple rows with the `ctrl`, `cmd`, and `shift` keys.
   * These rows can be easily accessed via `table.get('selectedRows')`
   *
   * @property multiSelect
   * @type {Boolean}
   * @default false
   */
  multiSelect: false,

  /**
   * Allows multiple rows to be expanded at once
   *
   * @property multiRowExpansion
   * @type {Boolean}
   * @default true
   */
  multiRowExpansion: true,

  /**
   * Expand a row on click
   *
   * @property expandOnClick
   * @type {Boolean}
   * @default true
   */
  expandOnClick: true,

  rows: computed.oneWay('table.rows'),
  visibleColumns: computed.oneWay('table.visibleColumns'),
  colspan: computed.oneWay('visibleColumns.length'),

  _currSelectedIndex: -1,
  _prevSelectedIndex: -1,

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
    /**
     * onRowClick action. Handles selection, and row expansion.
     * @event onRowClick
     * @param  {Row}   row The row that was clicked
     * @param  {Event}   event   The click event
     */
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

      callAction(this, 'onRowClick', ...arguments);
    },

    /**
     * onRowDoubleClick action.
     * @event onRowDoubleClick
     * @param  {Row}   row The row that was clicked
     * @param  {Event}   event   The click event
     */
    onRowDoubleClick( /* row */ ) {
      callAction(this, 'onRowDoubleClick', ...arguments);
    }
  }
});
