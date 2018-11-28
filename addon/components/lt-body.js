import Component from '@ember/component';
import { A as emberArray } from '@ember/array';
import { computed, observer } from '@ember/object';
import { getOwner } from '@ember/application';
import { debounce, once, run, schedule } from '@ember/runloop';
import { warn } from '@ember/debug';
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

  scrollTo: null,

  _onScrollTo: observer('scrollTo', function() {
    warn('Property "scrollTo" is not supported anymore, please use lt-scrollable directly instead.');
  }),

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

  _onScrollToRow: observer('scrollToRow', function() {
    let row = this.get('scrollToRow');
    if (row) {
      let ltRow = this.get('ltRows').findBy('row', row);
      if (ltRow) {
        schedule('afterRender', () => this.makeRowVisible(ltRow.$()));
      } else {
        throw 'Row passed to scrollToRow() is not part of the rendered table.';
      }
    }
  }),

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

  /* Components to add in the scrollable content
   *
   * @property
   * @type {[ { component, namedArgs ]} ]}
   * @default []
   */
  decorations: null,

  scrollableContainer: computed('sharedOptions.frameId', function() {
    // TODO: FIX: lt-body should not know about .tse-scroll-content
    const id = this.get('sharedOptions.frameId');
    return `#${id} .tse-scroll-content, #${id} .lt-scrollable`;
  }),

  init() {
    this._super(...arguments);

    if (this.get('decorations') === null) {
      this.set('decorations', emberArray());
    }

    this.get('table.focusIndex'); // so the observers are triggered

    this._initDefaultBehaviorsIfNeeded();
  },

  didReceiveAttrs() {
    this._super(...arguments);
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

  makeRowAtVisible(i, nbExtraRows = 0) {
    this.makeRowVisible(this.get('ltRows').objectAt(i).$(), nbExtraRows);
  },

  $scrollableContainer: computed(function() {
    return this.$().parents('.lt-scrollable');
  }).volatile().readOnly(),

  $scrollableContent: computed(function() {
    return this.$().parents('.scrollable-content');
  }).volatile().readOnly(),

  makeRowVisible($row, nbExtraRows = 0) {
    let $scrollableContent = this.get('$scrollableContent');
    let $scrollableContainer = this.get('$scrollableContainer');
    if ($row.length !== 0 && $scrollableContent.length !== 0 && $scrollableContainer.length !== 0) {
      let rt = $row.offset().top - $scrollableContent.offset().top;
      let rh = $row.height();
      let rb = rt + rh;
      let h = $scrollableContainer.height();
      let t = this.get('scrollTop');
      let b = t + h;
      let extraSpace = rh * nbExtraRows;
      if (rt - extraSpace <= t) {
        if (this.onScrollTo) {
          this.onScrollTo(rt - extraSpace);
        }
      } else if (rb + extraSpace >= b) {
        if (this.onScrollTo) {
          this.onScrollTo(t + rb - b + extraSpace);
        }
      }
    }
  },

  _onFocusedRowChanged: observer('table.focusIndex', function() {
    if (typeof FastBoot === 'undefined') {
      run.schedule('afterRender', null, () => this.makeRowVisible(this.$('tr.has-focus'), 0.5));
    }
  }),

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

  ltRows: computed(function() {
    let vrm = getOwner(this).lookup('-view-registry:main');
    let q = this.$('tr:not(.lt-expanded-row)');
    return emberArray($.makeArray(q.map((i, e) => vrm[e.id])));
  }).volatile(),

  getLtRowAt(position) {
    return this
      .get('ltRows')
      .find((ltr) => {
        let top = ltr.get('top');
        return top <= position && position < top + ltr.get('height');
      });
  },

  pageSize: computed(function() {
    let rows = this.get('table.rows');
    if (rows.get('length') === 0) {
      return 0;
    }
    let r0 = this.getLtRowAt(0);
    if (!r0) {
      r0 = this.get('ltRows').get('firstObject');
    }
    let rN = this.getLtRowAt(this.get('$scrollableContainer').height());
    if (!rN) {
      rN = this.get('ltRows').get('lastObject');
    }
    let i = (r) => rows.indexOf(r.get('row'));
    return i(rN) - i(r0);
  }).volatile().readOnly(),

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

    firstVisibleChanged(/* item, index, key */) {
      if (this.firstVisibleChanged) {
        this.firstVisibleChanged(...arguments);
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
