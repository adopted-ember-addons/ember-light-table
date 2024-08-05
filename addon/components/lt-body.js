import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { action } from '@ember/object';
import { cancel, debounce, once, schedule, scheduleOnce } from '@ember/runloop';
import Row from 'ember-light-table/classes/Row';

/**
 * @module Light Table
 */

/**
 * ```hbs
 * <LightTable @table={{this.table}} as |t| >
 *   <t.body @multiSelect={{true}} @onRowClick={{this.rowClicked}} as |body| >
 *     <body.ExpandedRow as |row| >
 *       Hello <b>{{row.firstName}}</b>
 *     </body.ExpandedRow>
 *
 *     {{#if this.isLoading}}
 *       {{#body.loader}}
 *         Loading...
 *       {{/body.loader}}
 *     {{/if}}
 *
 *     {{#if this.table.isEmpty}}
 *       {{#body.no-data}}
 *         No users found.
 *       {{/body.no-data}}
 *     {{/if}}
 *   </t.body>
 * </LightTable>
 * ```
 *
 * @class t.body
 */

@classic
@tagName('')
export default class LtBody extends Component {
  /**
   * @property table
   * @type {Table}
   * @private
   */
  table = null;

  /**
   * @property sharedOptions
   * @type {Object}
   * @private
   */
  sharedOptions = null;

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions = null;

  /**
   * @property extra
   * @type {Object}
   */
  extra = null;

  /**
   * @property isInViewport
   * @default false
   * @type {Boolean}
   */
  isInViewport = false;

  /**
   * Allows a user to select a row on click. All this will do is apply the necessary
   * CSS classes and add the row to `table.selectedRows`. If `multiSelect` is disabled
   * only one row will be selected at a time.
   *
   * @property canSelect
   * @type {Boolean}
   * @default true
   */
  canSelect = true;

  /**
   * Select a row on click. If this is set to `false` and multiSelect is
   * enabled, using click + `shift`, `cmd`, or `ctrl` will still work as
   * intended, while clicking on the row will not set the row as selected.
   *
   * @property selectOnClick
   * @type {Boolean}
   * @default true
   */
  selectOnClick = true;

  /**
   * Allows for expanding row. This will create a new row under the row that was
   * clicked with the template provided by `body.expanded-row`.
   *
   * ```hbs
   * <Body.expandedRow as |row| >
   *  This is the content of the expanded row for {{row.firstName}}
   * </Body.expandedRow>
   * ```
   *
   * @property canExpand
   * @type {Boolean}
   * @default false
   */
  canExpand = false;

  /**
   * Allows a user to select multiple rows with the `ctrl`, `cmd`, and `shift` keys.
   * These rows can be easily accessed via `table.get('selectedRows')`
   *
   * @property multiSelect
   * @type {Boolean}
   * @default false
   */
  multiSelect = false;

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
  multiSelectRequiresKeyboard = true;

  /**
   * Hide scrollbar when not scrolling
   *
   * @property autoHideScrollbar
   * @type {Boolean}
   * @default true
   */
  autoHideScrollbar = true;

  /**
   * Allows multiple rows to be expanded at once
   *
   * @property multiRowExpansion
   * @type {Boolean}
   * @default true
   */
  multiRowExpansion = true;

  /**
   * Expand a row on click
   *
   * @property expandOnClick
   * @type {Boolean}
   * @default true
   */
  expandOnClick = true;

  /**
   * If true, the body block will yield columns and rows, allowing you
   * to define your own table body
   *
   * @property overwrite
   * @type {Boolean}
   * @default false
   */
  overwrite = false;

  /**
   * If true, the body will prepend an invisible `<tr>` that scaffolds the
   * widths of the table cells.
   *
   * ember-light-table uses [`table-layout: fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout).
   * This means, that the widths of the columns are defined by the first row
   * only. By prepending this scaffolding row, widths of columns only need to
   * be specified once.
   *
   * @property enableScaffolding
   * @type {Boolean}
   * @default false
   */
  enableScaffolding = false;

  /**
   * ID of main table component. Used to generate divs for ember-wormhole and set scope for scroll observers
   *
   * @property tableId
   * @type {String}
   * @private
   */
  tableId = null;

  /**
   * @property scrollBuffer
   * @type {Number}
   * @default 500
   */
  scrollBuffer = 500;

  /**
   * @property scrollBufferRows
   * @type {Number}
   * @default 500 / estimatedRowHeight
   */
  get scrollBufferRows() {
    return Math.ceil(
      this.scrollBuffer / (this.sharedOptions.estimatedRowHeight || 1)
    );
  }

  /**
   * @property useVirtualScrollbar
   * @type {Boolean}
   * @default false
   * @private
   */
  useVirtualScrollbar = false;

  /**
   * Set this property to scroll to a specific px offset.
   *
   * This only works when `useVirtualScrollbar` is `true`, i.e. when you are
   * using fixed headers / footers.
   *
   * @property scrollTo
   * @type {Number}
   * @default null
   */
  scrollTo = null;
  _scrollTo = null;

  /**
   * Set this property to a `Row` to scroll that `Row` into view.
   *
   * This only works when `useVirtualScrollbar` is `true`, i.e. when you are
   * using fixed headers / footers.
   *
   * @property scrollToRow
   * @type {Row}
   * @default null
   */
  scrollToRow = null;
  _scrollToRow = null;

  /**
   * @property targetScrollOffset
   * @type {Number}
   * @default 0
   * @private
   */
  targetScrollOffset = 0;

  /**
   * @property currentScrollOffset
   * @type {Number}
   * @default 0
   * @private
   */
  currentScrollOffset = 0;

  /**
   * @property hasReachedTargetScrollOffset
   * @type {Boolean}
   * @default true
   * @private
   */
  hasReachedTargetScrollOffset = true;

  /**
   * Allows to customize the component used to render rows
   *
   * ```hbs
   * <LightTable @table={{this.table}} as |t|}}
   *    <t.body @rowComponent={{component 'my-row'}} />
   * </LightTable>
   * ```
   * @property rowComponent
   * @type {Ember.Component}
   * @default null
   */
  rowComponent = null;

  /**
   * Allows to customize the component used to render spanned rows
   *
   * ```hbs
   * <LightTable @table={{this.table}} as |t| >
   *    <t.body @spannedRowComponent={{component 'my-spanned-row'}} />
   * </LightTable>
   * ```
   * @property spannedRowComponent
   * @type {Ember.Component}
   * @default null
   */
  spannedRowComponent = null;

  /**
   * Allows to customize the component used to render infinite loader
   *
   * ```hbs
   * <LightTable @table={{this.table}} as |t|>
   *    <t.body @infinityComponent={{component 'my-infinity'}} />
   * </LightTable>
   * ```
   * @property infinityComponent
   * @type {Ember.Component}
   * @default null
   */
  infinityComponent = null;

  get rows() {
    return this.table?.visibleRows;
  }

  get columns() {
    return this.table.visibleColumns;
  }

  get colspan() {
    return this.columns.length;
  }

  /**
   * fills the screen with row items until lt-infinity component has exited the viewport
   * @property scheduleScrolledToBottom
   */
  @action
  scheduleScrolledToBottom() {
    if (this.isInViewport && this.onScrolledToBottom) {
      /*
      Continue scheduling onScrolledToBottom until no longer in viewport
      */
      this._schedulerTimer = scheduleOnce(
        'afterRender',
        this,
        this._debounceScrolledToBottom
      );
    }
  }

  _prevSelectedIndex = -1;

  init() {
    super.init(...arguments);

    /*
     We can only set `useVirtualScrollbar` once all contextual components have
     been initialized since fixedHeader and fixedFooter are set on t.head and t.foot
     initialization.
    */
    once(this, this._setupVirtualScrollbar);
  }

  destroy() {
    super.destroy(...arguments);
    this._cancelTimers();
  }

  _setupVirtualScrollbar() {
    let { fixedHeader, fixedFooter } = this.sharedOptions;
    this.set('useVirtualScrollbar', fixedHeader || fixedFooter);
  }

  @action
  onRowsChange() {
    this._checkTargetOffsetTimer = scheduleOnce(
      'afterRender',
      this,
      this.checkTargetScrollOffset
    );
  }

  @action
  setupScrollOffset(element) {
    let { scrollTo, _scrollTo, scrollToRow, _scrollToRow } = this;
    let targetScrollOffset = null;

    this.setProperties({ _scrollTo: scrollTo, _scrollToRow: scrollToRow });

    if (scrollTo !== _scrollTo) {
      targetScrollOffset = Number.parseInt(scrollTo, 10);

      if (Number.isNaN(targetScrollOffset)) {
        targetScrollOffset = null;
      }

      this.setProperties({
        targetScrollOffset,
        hasReachedTargetScrollOffset: targetScrollOffset <= 0,
      });
    } else if (scrollToRow !== _scrollToRow) {
      if (scrollToRow instanceof Row) {
        let rowElement = element.querySelector(
          `[data-row-id=${scrollToRow.get('rowId')}]`
        );

        if (rowElement instanceof Element) {
          targetScrollOffset = rowElement.offsetTop;
        }
      }

      this.setProperties({
        targetScrollOffset,
        hasReachedTargetScrollOffset: true,
      });
    }
  }

  checkTargetScrollOffset() {
    if (!this.hasReachedTargetScrollOffset) {
      let targetScrollOffset = this.targetScrollOffset;
      let currentScrollOffset = this.currentScrollOffset;

      if (targetScrollOffset > currentScrollOffset) {
        this.set('targetScrollOffset', null);
        this._setTargetOffsetTimer = schedule('render', null, () => {
          this.set('targetScrollOffset', targetScrollOffset);
        });
      } else {
        this.set('hasReachedTargetScrollOffset', true);
      }
    }
  }

  toggleExpandedRow(row) {
    let multiRowExpansion = this.multiRowExpansion;
    let shouldExpand = !row.expanded;

    if (multiRowExpansion) {
      row.toggleProperty('expanded');
    } else {
      this.table.expandedRows.setEach('expanded', false);
      row.set('expanded', shouldExpand);
    }
  }

  /**
   * @method _debounceScrolledToBottom
   */
  _debounceScrolledToBottom(delay = 100) {
    /*
    This debounce is needed when there is not enough delay between onScrolledToBottom calls.
    Without this debounce, all rows will be rendered causing immense performance problems
    */
    this._debounceTimer = debounce(this, this.onScrolledToBottom, delay);
  }

  /**
   * @method _cancelTimers
   */
  _cancelTimers() {
    cancel(this._checkTargetOffsetTimer);
    cancel(this._setTargetOffsetTimer);
    cancel(this._schedulerTimer);
    cancel(this._debounceTimer);
  }

  /**
   * lt-infinity action to determine if component is still in viewport
   * @event enterViewport
   */
  @action
  enterViewport() {
    this.set('isInViewport', true);
  }

  /**
   * lt-infinity action to determine if component has exited the viewport
   * @event exitViewport
   */
  @action
  exitViewport() {
    this.set('isInViewport', false);
  }

  /**
   * onRowClick action. Handles selection, and row expansion.
   * @event onRowClick
   * @param  {Row}   row The row that was clicked
   * @param  {Event}   event   The click event
   */
  @action
  rowClicked(row, e) {
    let rows = this.table.rows;
    let multiSelect = this.multiSelect;
    let multiSelectRequiresKeyboard = this.multiSelectRequiresKeyboard;
    let canSelect = this.canSelect;
    let selectOnClick = this.selectOnClick;
    let canExpand = this.canExpand;
    let expandOnClick = this.expandOnClick;
    let isSelected = row.get('selected');
    let currIndex = rows.indexOf(row);
    let prevIndex =
      this._prevSelectedIndex === -1 ? currIndex : this._prevSelectedIndex;

    this._prevSelectedIndex = currIndex;

    let toggleExpandedRow = () => {
      if (canExpand && expandOnClick) {
        this.toggleExpandedRow(row);
      }
    };

    if (canSelect) {
      if (e.shiftKey && multiSelect) {
        rows
          .slice(
            Math.min(currIndex, prevIndex),
            Math.max(currIndex, prevIndex) + 1
          )
          .forEach((r) => r.set('selected', !isSelected));
      } else if (
        (!multiSelectRequiresKeyboard || e.ctrlKey || e.metaKey) &&
        multiSelect
      ) {
        row.toggleProperty('selected');
      } else {
        if (selectOnClick) {
          this.table.selectedRows.setEach('selected', false);
          row.set('selected', !isSelected);
        }

        toggleExpandedRow();
      }
    } else {
      toggleExpandedRow();
    }

    this.onRowClick?.(...arguments);
  }

  /**
   * onRowDoubleClick action.
   * @event onRowDoubleClick
   * @param  {Row}   row The row that was clicked
   * @param  {Event}   event   The click event
   */
  @action
  rowDoubleClicked /* row */() {
    this.onRowDoubleClick?.(...arguments);
  }

  /*.
   * onScroll action - sent when user scrolls in the Y direction
   *
   * This only works when `useVirtualScrollbar` is `true`, i.e. when you are
   * using fixed headers / footers.
   *
   * @event onScroll
   * @param {Number} scrollOffset The scroll offset in px
   * @param {Event} event The scroll event
   */
  @action
  scroll(scrollOffset /* , event */) {
    this.set('currentScrollOffset', scrollOffset);
    this.onScroll?.(...arguments);
  }

  // Note: Component parameter @firtVisbleChaned is not documented
  @action
  firstVisibleRowChanged(item, index /* , key */) {
    this.firstVisibleChanged?.(...arguments);
    const estimateScrollOffset = index * this.sharedOptions.estimatedRowHeight;
    this.onScroll?.(estimateScrollOffset, null);
  }

  // Note: Component parameter @lastVisibleChanged is not documented
  @action
  lastVisibleRowChanged /* item, index, key */() {
    this.lastVisibleChanged?.(...arguments);
  }

  // Note: Component parameter @firstReached is not documented
  @action
  firstRowReached /* item, index, key */() {
    this.firstReached?.(...arguments);
  }

  // Note: Component parameter @lastReached is not documented
  @action
  lastRowReached /* item, index, key */() {
    this.lastReached?.(...arguments);
    this.onScrolledToBottom?.();
  }
}
