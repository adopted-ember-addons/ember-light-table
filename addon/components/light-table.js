import Ember from 'ember';
import layout from 'ember-light-table/templates/components/light-table';
import Table from 'ember-light-table/classes/Table';

const {
  assert,
  Component,
  computed,
  String:{htmlSafe},
  run: {debounce}
} = Ember;

/**
 * @module Components
 * @main ligh-table
 */

/**
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{t.head}}
 *   {{t.body}}
 *   {{t.foot}}
 * {{/light-table}}
 * ```
 *
 * Please see the documentation for the [Head](../classes/Head.html), [Body](../classes/Body.html), and [Foot](../classes/Foot.html) components
 * for more details on all possible options and actions.
 *
 * @class Light Table
 * @main Components
 * @uses TableScrollMixin
 */

const LightTable = Component.extend({
  layout,
  classNameBindings: [':ember-light-table', 'virtualScrollbar'],
  attributeBindings: ['style'],

  /**
   * @property table
   * @type {Table}
   */
  table: null,

  /**
   * This is used to propate custom user defined actions to custom cell and header components.
   * As an example, lets say I have a table with a column defined with `cellComponent: 'delete-user'`
   *
   * ```hbs
   * {{#light-table table tableActions=(hash
   *   deleteUser=(action 'deleteUser')
   *  ) as |t|}}
   *   {{t.head}}
   *   {{t.body}}
   *   {{t.foot}}
   * {{/light-table}}
   * ```
   *
   * Now in the `delete-user` component, we can access that `deleteUser` action and pass it the
   * row object which will bubble all the way to where you defined that action.
   *
   * ```hbs
   * <button {{action tableActions.deleteUser row}}>Delete Me</button>
   * ```
   *
   *
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * Table height.
   *
   * @property height
   * @type {String}
   * @default null
   */
  height: null,

  /**
   * Table component shared options
   *
   * @property sharedOptions
   * @type {Object}
   * @private
   */
  sharedOptions: computed(function () {
    return {
      height: this.get('height'),
      fixedHeader: false,
      fixedFooter: false
    };
  }).readOnly(),

  style: computed('height', function () {
    let height = this.get('height');
    if (height) {
      return htmlSafe(`height:${this.get('height')};`);
    }
  }),

  didInsertElement() {
    // TODO: didReceiveAttrs or observer in case fixed columns changes?
    if (this.get('table.fixedColumns.length')) {
      this._setColumnWidths();
      this._setupScrollListeners();
      this._setupResize();
    }
  },

  /**
   * Sets the width and position of fixed and standard columns.
   * @private
   */
  _setColumnWidths() {
    let [wrapperDiv] = this.$();
    let fixedColumnWidth = this.get('table.fixedColumnWidth');
    let [clientRects] = wrapperDiv.getClientRects();

    this.$('.standard-columns').css({
      width: clientRects.width - fixedColumnWidth,
      'margin-left': fixedColumnWidth
    });

    this.$('.fixed-columns').css({
      width: fixedColumnWidth
    });
  },

  /**
   * Handles setting up necessary scroll listeners.
   * @private
   */
  _setupScrollListeners() {
    this._setupStandardColumnScrollListener();
    this._setupWheelListener();
  },

  /**
   * Sets up a scroll listener on the standard columns, which keeps
   * the position of the fixed columns as well as the header in sync.
   * @private
   */
  _setupStandardColumnScrollListener() {
    let standardHeaderWrapper = this.$('.lt-head-wrap .standard-columns');
    let fixedBodyWrapper = this.$('.lt-body-wrap .fixed-columns');
    let standardBodyWrapper = this.$('.lt-body-wrap .standard-columns');
    let [scrollElement] = standardBodyWrapper;

    this._scrollListener = (e) => {
      fixedBodyWrapper.scrollTop(e.target.scrollTop);
      standardHeaderWrapper.scrollLeft(e.target.scrollLeft);
    };

    scrollElement.addEventListener('scroll', this._scrollListener, true);
  },

  /**
   * Sets up a wheel listener on the fixed columns in order to force scrolling
   * of the standard columns. Without this, using a wheel or trackpad over the
   * fixed columns would not scroll anything.
   *
   * Note: we must use jquery bind to add the listener so that the event delta
   * is passsed properly.
   * @private
   */
  _setupWheelListener() {
    let standardBodyWrapper = this.$('.lt-body-wrap .standard-columns');
    let fixedBodyWrapper = this.$('.lt-body-wrap .fixed-columns');

    this._wheelListener = (e) => {
     let newScrollTop = standardBodyWrapper.scrollTop() + e.originalEvent.deltaY;
     standardBodyWrapper.scrollTop(newScrollTop);

     // firefox needs this or we cant scroll fixed columns
     event.preventDefault();
    }

    // must use bind here to pass delta params correctly
    fixedBodyWrapper.bind('mousewheel', this._wheelListener);
  },

  /**
   * Sets up a resize listener that recalculates the width of the standard columns.
   * @private
   */
  _setupResize() {
    this._resizeHandler = () => {
      debounce(this, this._setColumnWidths, 20);
    };

    window.addEventListener('resize', this._resizeHandler, true);
  },

  willDestroyElement() {
    let [scrollElement] = this.$('.lt-body-wrapper .standard-columns');

    scrollElement.removeEventListener('scroll', this._scrollListener, true);
    window.removeEventListener('resize', this._resizeHandler, true);
    fixedBodyWrapper.unbind('mousewheel', this._wheelListener);

    this._resizeHandler = null;
    this._scrollListener = null;
    this._wheelListener = null;
  },

  init() {
    this._super(...arguments);
    assert('[ember-light-table] table must be an instance of Table', this.get('table') instanceof Table);
  }
});

LightTable.reopenClass({
  positionalParams: ['table']
});

export default LightTable;
