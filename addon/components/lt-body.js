import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { debounce, once, run } from '@ember/runloop';
import $ from 'jquery';
import layout from 'ember-light-table/templates/components/lt-body';
import { EKMixin } from 'ember-keyboard';
import ActivateKeyboardOnFocusMixin from 'ember-keyboard/mixins/activate-keyboard-on-focus';
import HasBehaviorsMixin from 'ember-light-table/mixins/has-behaviors';
import RowExpansionBehavior from 'ember-light-table/behaviors/row-expansion';
import SingleSelectBehavior from 'ember-light-table/behaviors/single-select';
import MultiSelectBehavior from 'ember-light-table/behaviors/multi-select';
import { behaviorGroupFlag, behaviorFlag, behaviorInstanceOf } from 'ember-light-table/mixins/has-behaviors';
import deprecatedAlias from 'ember-light-table/utils/deprecated-alias';
import Row from 'ember-light-table/classes/Row';

const deprecationUntil = '2.0';

/**
 * @module Light Table
 */

/**
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{#t.body multiSelect=true onRowClick=(action 'rowClicked') as |body|}}
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
export default Component.extend(EKMixin, ActivateKeyboardOnFocusMixin, HasBehaviorsMixin, {

  layout,
  classNames: ['lt-body-wrap'],

  attributeBindings: ['tabindex'],

  tabindex: 0,

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
   * Turn this off to use the new way of specifying behaviors.
   *
   * @property useLegacyBehaviors
   * @type {Object}
   */
  useLegacyBehaviorFlags: true,

  /**
   * @property extra
   * @type {Object}
   */
  extra: null,

  /**
   * @property isInViewport
   * @default false
   * @type {Boolean}
   */
  isInViewport: false,

  /**
   * Allows a user to select a row on click. All this will do is apply the necessary
   * CSS classes and add the row to `table.selectedRows`. If `multiSelect` is disabled
   * only one row will be selected at a time.
   *
   * @property canSelect
   * @type {Boolean}
   * @default true
   * @deprecated Please set the value of the `behaviors` property directly.
   */
  canSelect: deprecatedAlias(
    '_canSelect',
    'canSelect',
    'Please set the value of the "behaviors" property directly.',
    deprecationUntil
  ),

  _canSelect: behaviorGroupFlag('can-select'),

  /**
   * Select a row on click. If this is set to `false` and multiSelect is
   * enabled, using click + `shift`, `cmd`, or `ctrl` will still work as
   * intended, while clicking on the row will not set the row as selected.
   *
   * @property selectOnClick
   * @type {Boolean}
   * @default true
   * @deprecated Please set the flag directly on the `behaviors/multi-select` instance.
   */
  selectOnClick: deprecatedAlias(
    '_multiSelectBehavior.selectOnClick',
    'selectOnClick',
    'Please set the flag directly on the "behaviors/multi-select" instance.',
    deprecationUntil
  ),

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
   * @deprecated Please set the value of the `behaviors` property directly.
   */
  canExpand: deprecatedAlias(
    '_canExpand',
    'canExpand',
    'Please set the value of the "behaviors" property directly.',
    deprecationUntil
  ),

  _canExpand: behaviorGroupFlag('can-expand'),

  /**
   * Allows a user to select multiple rows with the `ctrl`, `cmd`, and `shift` keys.
   * These rows can be easily accessed via `table.get('selectedRows')`
   *
   * @property multiSelect
   * @type {Boolean}
   * @default false
   * @deprecated Please set the value of the `behaviors` property directly.
   */
  multiSelect: deprecatedAlias(
    '_multiSelect',
    'multiSelect',
    'Please set the value of the "behaviors" property directly.',
    deprecationUntil
  ),

  _multiSelect: behaviorFlag('can-select', '_multiSelectBehavior'),

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
   * @deprecated Please set the flag directly on the `behaviors/multi-select` instance.
   */
  multiSelectRequiresKeyboard: deprecatedAlias(
    '_multiSelectBehavior.requiresKeyboard',
    'multiSelectRequiresKeyboard',
    'Please set the flag directly on the "behaviors/multi-select" instance.',
    deprecationUntil
  ),

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
   * @deprecated Please set the flag directly on the `behaviors/row-expansion` instance.
   */
  multiRowExpansion: deprecatedAlias(
    '_rowExpansionBehavior.multiRow',
    'multiRowExpansion',
    'Please set the flag directly on the "behaviors/row-expansion" instance.',
    deprecationUntil
  ),

  /**
   * Expand a row on click
   *
   * @property expandOnClick
   * @type {Boolean}
   * @default true
   * @deprecated Please set the flag directly on the `behaviors/row-expansion` instance.
   */
  expandOnClick: deprecatedAlias(
    '_rowExpansionBehavior.expandOnClick',
    'expandOnClick',
    'Please set the flag directly on the "behaviors/row-expansion" instance.',
    deprecationUntil
  ),

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
  enableScaffolding: false,

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
   * @property scrollBufferRows
   * @type {Number}
   * @default 500 / estimatedRowHeight
   */
  scrollBufferRows: computed('scrollBuffer', 'sharedOptions.estimatedRowHeight', function() {
    return Math.ceil(
      this.get('scrollBuffer') / (this.get('sharedOptions.estimatedRowHeight') || 1)
    );
  }),

  /**
   * @property useVirtualScrollbar
   * @type {Boolean}
   * @default false
   * @private
   */
  useVirtualScrollbar: false,

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
  scrollTo: null,
  _scrollTo: null,

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
  scrollToRow: null,
  _scrollToRow: null,

  /**
   * @property targetScrollOffset
   * @type {Number}
   * @default 0
   * @private
   */
  targetScrollOffset: 0,

  /**
   * @property currentScrollOffset
   * @type {Number}
   * @default 0
   * @private
   */
  currentScrollOffset: 0,

  /**
   * @property hasReachedTargetScrollOffset
   * @type {Boolean}
   * @default true
   * @private
   */
  hasReachedTargetScrollOffset: true,

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

  /**
   * fills the screen with row items until lt-infinity component has exited the viewport
   * @property scheduleScrolledToBottom
   */
  scheduleScrolledToBottom: observer('rows.[]', 'isInViewport', function() {
    if (this.get('isInViewport')) {
      /*
       Continue scheduling onScrolledToBottom until no longer in viewport
       */
      this._schedulerTimer = run.scheduleOnce('afterRender', this, this._debounceScrolledToBottom);
    }
  }),

  _prevSelectedIndex: -1,

  init() {
    this._super(...arguments);

    /*
      We can only set `useVirtualScrollbar` once all contextual components have
      been initialized since fixedHeader and fixedFooter are set on t.head and t.foot
      initialization.
     */
    run.once(this, this._setupVirtualScrollbar);

    this._initDefaultBehaviorsIfNeeded();
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.setupScrollOffset();
  },

  destroy() {
    this._super(...arguments);
    this._cancelTimers();
  },

  didInsertElement() {
    this._super(...arguments);
    $(document).on('keydown', this, this._preventPropagation);
  },

  willDestroyElement() {
    this._super(...arguments);
    $(document).off('keydown', this, this._preventPropagation);
  },

  _preventPropagation(e) {
    if (e.target === e.data.element && [32, 33, 34, 35, 36, 38, 40].includes(e.keyCode)) {
      return false;
    }
  },

  _multiSelectBehavior: behaviorInstanceOf(MultiSelectBehavior),
  _rowExpansionBehavior: behaviorInstanceOf(RowExpansionBehavior),

  _initDefaultBehaviorsIfNeeded() {
    this._initDefaultBehaviorsIfNeeded = function() {};
    if (this.get('useLegacyBehaviorFlags')) {
      this.activateBehavior(MultiSelectBehavior.create({}), true);
      this.activateBehavior(SingleSelectBehavior.create({}), true);
      this.activateBehavior(RowExpansionBehavior.create({}), false);
    }
  },

  _setupVirtualScrollbar() {
    let { fixedHeader, fixedFooter } = this.get('sharedOptions');
    this.set('useVirtualScrollbar', fixedHeader || fixedFooter);
  },

  onRowsChange: observer('rows.[]', function() {
    this._checkTargetOffsetTimer = run.scheduleOnce('afterRender', this, this.checkTargetScrollOffset);
  }),

  setupScrollOffset() {
    let {
      scrollTo,
      _scrollTo,
      scrollToRow,
      _scrollToRow
    } = this.getProperties(['scrollTo', '_scrollTo', 'scrollToRow', '_scrollToRow']);
    let targetScrollOffset = null;

    this.setProperties({ _scrollTo: scrollTo, _scrollToRow: scrollToRow });

    if (scrollTo !== _scrollTo) {
      targetScrollOffset = Number.parseInt(scrollTo, 10);

      if (Number.isNaN(targetScrollOffset)) {
        targetScrollOffset = null;
      }

      this.setProperties({
        targetScrollOffset,
        hasReachedTargetScrollOffset: targetScrollOffset <= 0
      });
    } else if (scrollToRow !== _scrollToRow) {
      if (scrollToRow instanceof Row) {
        let rowElement = this.element.querySelector(`[data-row-id=${scrollToRow.get('rowId')}]`);

        if (rowElement instanceof Element) {
          targetScrollOffset = rowElement.offsetTop;
        }
      }

      this.setProperties({ targetScrollOffset, hasReachedTargetScrollOffset: true });
    }
  },

  checkTargetScrollOffset() {
    if (!this.get('hasReachedTargetScrollOffset')) {
      let targetScrollOffset = this.get('targetScrollOffset');
      let currentScrollOffset = this.get('currentScrollOffset');

      if (targetScrollOffset > currentScrollOffset) {
        this.set('targetScrollOffset', null);
        this._setTargetOffsetTimer = run.schedule('render', null, () => {
          this.set('targetScrollOffset', targetScrollOffset);
        });
      } else {
        this.set('hasReachedTargetScrollOffset', true);
      }
    }
  },

  toggleExpandedRow(row) {
    let multiRowExpansion = this.get('multiRowExpansion');
    let shouldExpand = !row.expanded;

    if (multiRowExpansion) {
      row.toggleProperty('expanded');
    } else {
      this.get('table.expandedRows').setEach('expanded', false);
      row.set('expanded', shouldExpand);
    }
  },

  /**
   * @method _debounceScrolledToBottom
   */
  _debounceScrolledToBottom(delay = 100) {
    /*
     This debounce is needed when there is not enough delay between onScrolledToBottom calls.
     Without this debounce, all rows will be rendered causing immense performance problems
     */
    if (this.onScrolledToBottom) {
      this._debounceTimer = debounce(this, this.onScrolledToBottom, delay);
    }
  },

  /**
   * @method _cancelTimers
   */
  _cancelTimers() {
    run.cancel(this._checkTargetOffsetTimer);
    run.cancel(this._setTargetOffsetTimer);
    run.cancel(this._schedulerTimer);
    run.cancel(this._debounceTimer);
  },
  signalSelectionChanged() {
    this.get('behaviors').forEach((b) => b.onSelectionChanged(this));
  },

  onSelectionChanged: observer('table.rows.@each.selected', function() {
    once(this, this.signalSelectionChanged);
  }),

  actions: {
    onRowClick() {
      this.triggerBehaviorEvent('rowClick', ...arguments);
      if (this.onRowClick) {
        this.onRowClick(...arguments);
      }
    },

    onRowDoubleClick() {
      this.triggerBehaviorEvent('rowDoubleClick', ...arguments);
      if (this.onRowDoubleClick) {
        this.onRowDoubleClick(...arguments);
      }
    },

    onRowMouseDown() {
      this.triggerBehaviorEvent('rowMouseDown', ...arguments);
      if (this.onRowMouseDown) {
        this.onRowMouseDown(...arguments);
      }
    },

    onRowMouseUp() {
      this.triggerBehaviorEvent('rowMouseUp', ...arguments);
      if (this.onRowMouseUp) {
        this.onRowMouseUp(...arguments);
      }
    },

    onRowMouseMove() {
      this.triggerBehaviorEvent('rowMouseMove', ...arguments);
      if (this.onRowMouseMove) {
        this.onRowMouseMove(...arguments);
      }
    },

    onRowTouchStart() {
      this.triggerBehaviorEvent('rowTouchStart', ...arguments);
      if (this.onRowTouchStart) {
        this.onRowTouchStart(...arguments);
      }
    },

    onRowTouchEnd() {
      this.triggerBehaviorEvent('rowTouchEnd', ...arguments);
      if (this.onRowTouchEnd) {
        this.onRowTouchEnd(...arguments);
      }
    },

    onRowTouchCancel() {
      this.triggerBehaviorEvent('rowTouchCancel', ...arguments);
      if (this.onRowTouchCancel) {
        this.onRowTouchCancel(...arguments);
      }
    },

    onRowTouchLeave() {
      this.triggerBehaviorEvent('rowTouchLeave', ...arguments);
      if (this.onRowTouchLeave) {
        this.onRowTouchLeave(...arguments);
      }
    },

    onRowTouchMove() {
      this.triggerBehaviorEvent('rowTouchMove', ...arguments);
      if (this.onRowTouchMove) {
        this.onRowTouchMove(...arguments);
      }
    },

    /**
     * onScroll action - sent when user scrolls in the Y direction
     *
     * This only works when `useVirtualScrollbar` is `true`, i.e. when you are
     * using fixed headers / footers.
     *
     * @event onScroll
     * @param {Number} scrollOffset The scroll offset in px
     * @param {Event} event The scroll event
     */
    onScroll(scrollOffset /* , event */) {
      this.set('currentScrollOffset', scrollOffset);
      if (this.onScroll) {
        this.onScroll(...arguments);
      }
    },

    /**
     * lt-infinity action to determine if component is still in viewport
     * @event inViewport
     */
    inViewport() {
      this.set('isInViewport', true);
    },
    /**
     * lt-infinity action to determine if component has exited the viewport
     * @event exitViewport
     */
    exitViewport() {
      this.set('isInViewport', false);
    },

    firstVisibleChanged(item, index /* , key */) {
      if (this.firstVisibleChanged) {
        this.firstVisibleChanged(...arguments);
      }
      const estimateScrollOffset = index * this.get('sharedOptions.estimatedRowHeight');
      if (this.onScroll) {
        this.onScroll(estimateScrollOffset, null);
      }
    },

    lastVisibleChanged(/* item, index, key */) {
      if (this.lastVisibleChanged) {
        this.lastVisibleChanged(...arguments);
      }
    },

    firstReached(/* item, index, key */) {
      if (this.firstReached) {
        this.firstReached(...arguments);
      }
    },

    lastReached(/* item, index, key */) {
      if (this.lastReached) {
        this.lastReached(...arguments);
      }
      if (this.onScrolledToBottom) {
        this.onScrolledToBottom();
      }
    }
  }
});
