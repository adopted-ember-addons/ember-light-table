import Ember from 'ember';
import layout from 'ember-light-table/templates/components/lt-body';
import callAction from 'ember-light-table/utils/call-action';

const {
  Component,
  computed,
  run
} = Ember;

/**
 * @module Light Table
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
 *     {{#if table.isEmpty}}
 *       {{#body.no-data}}
 *         No users found.
 *       {{/body.no-data}}
 *     {{/if}}
 *   {{/t.body}}
 * {{/light-table}}
 * ```
 *
 * @class t.body
 */

export default Component.extend({
  layout,
  classNames: ['lt-body-wrap'],
  classNameBindings: ['canSelect', 'multiSelect', 'canExpand'],

  /**
   * @property table
   * @type {Table}
   * @private
   */
  table: null,

  /**
   * @property sharedOptions
   * @type {Object}
   * @private
   */
  sharedOptions: null,

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
   *  This is the content of the expanded row for {{row.firstName}}
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
   * When multiSelect is true, this property determines whether or not `ctrl`
   * (or `cmd`) is required to select additional rows, one by one. When false,
   * simply clicking on subsequent rows will select or deselect them.
   *
   * `shift` to select many consecutive rows is unaffected by this property.
   *
   * @property multiSelectRequiresKeyboard
   * @type {Boolean}
   * @default true
   */
  multiSelectRequiresKeyboard: true,

  /**
   * Hide scrollbar when not scrolling
   *
   * @property autoHideScrollbar
   * @type {Boolean}
   * @default true
   */
  autoHideScrollbar: true,

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

  /**
   * If true, the body block will yield columns and rows, allowing you
   * to define your own table body
   *
   * @property overwrite
   * @type {Boolean}
   * @default false
   */
  overwrite: false,

  /**
   * ID of main table component. Used to generate divs for ember-wormhole
   *
   * @property tableId
   * @type {String}
   * @private
   */
  tableId: null,

  /**
   * @property scrollBuffer
   * @type {Number}
   * @default 500
   */
  scrollBuffer: 500,

  /**
   * @property useVirtualScrollbar
   * @type {Boolean}
   * @default false
   * @private
   */
  useVirtualScrollbar: false,

  /**
   * Allows to customize the component used to render rows
   * 
   * ```hbs
   * {{#light-table table as |t|}}
   *    {{t.body rowComponent=(component 'my-row')}}
   * {{/light-table}}
   * ```
   * @property rowComponent
   * @type {Ember.Component}
   * @default null
   */
  rowComponent: null,

  /**
   * Allows to customize the component used to render spanned rows
   * 
   * ```hbs
   * {{#light-table table as |t|}}
   *    {{t.body spannedRowComponent=(component 'my-spanned-row')}}
   * {{/light-table}}
   * ```
   * @property spannedRowComponent
   * @type {Ember.Component}
   * @default null
   */
  spannedRowComponent: null,

  /**
   * Allows to customize the component used to render infinite loader
   * 
   * ```hbs
   * {{#light-table table as |t|}}
   *    {{t.body infinityComponent=(component 'my-infinity')}}
   * {{/light-table}}
   * ```
   * @property infinityComponent
   * @type {Ember.Component}
   * @default null
   */
  infinityComponent: null,

  rows: computed.readOnly('table.visibleRows'),
  columns: computed.readOnly('table.visibleColumns'),
  colspan: computed.readOnly('columns.length'),

  _currSelectedIndex: -1,
  _prevSelectedIndex: -1,

  init() {
    this._super(...arguments);

    /*
      We can only set `useVirtualScrollbar` once all contextual components have
      been initialized since fixedHeader and fixedFooter are set on t.head and t.foot
      initialization.
     */
    run.once(this, this._setupVirtualScrollbar);
  },

  _setupVirtualScrollbar() {
    const { fixedHeader, fixedFooter } = this.get('sharedOptions');
    this.set('useVirtualScrollbar', fixedHeader || fixedFooter);
  },

  toggleExpandedRow(row) {
    let multi = this.get('multiRowExpansion');
    let shouldExpand = !row.expanded;

    if (multi) {
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
      let multiSelectRequiresKeyboard = this.get('multiSelectRequiresKeyboard');
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
        } else if ((!multiSelectRequiresKeyboard || (e.ctrlKey || e.metaKey)) && multiSelect) {
          row.toggleProperty('selected');
        } else {
          this.get('table.selectedRows').setEach('selected', false);
          row.set('selected', !isSelected);

          if (this.get('canExpand') && this.get('expandOnClick')) {
            this.toggleExpandedRow(row);
          }
        }
        this._prevSelectedIndex = currIndex;
      } else {
        if (this.get('canExpand') && this.get('expandOnClick')) {
          this.toggleExpandedRow(row);
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
    onRowDoubleClick(/* row */) {
      callAction(this, 'onRowDoubleClick', ...arguments);
    },

    /**
     * onScrolledToBottom action - sent when user scrolls to the bottom
     *
     * @event onScrolledToBottom
     */
    onScrolledToBottom() {
      callAction(this, 'onScrolledToBottom');
    }
  }
});
