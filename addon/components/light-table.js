import Ember from 'ember';
import layout from 'ember-light-table/templates/components/light-table';
import Table from 'ember-light-table/classes/Table';
import cssStyleify from 'ember-light-table/utils/css-styleify';
import callAction from 'ember-light-table/utils/call-action';

const {
  assert,
  Component,
  computed,
  inject,
  observer,
  on,
  isNone,
  isEmpty,
  run,
  A: emberArray
} = Ember;

function intersections(array1, array2) {
  return array1.filter((n) => {
    return array2.indexOf(n) > -1;
  });
}

/**
 * @module Light Table
 * @main light-table
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
 * Please see the documentation for the [Head](../classes/t.head.html), [Body](../classes/t.body.html), and [Foot](../classes/t.foot.html) components
 * for more details on all possible options and actions.
 *
 * @class light-table
 * @main Components
 */

const LightTable = Component.extend({
  layout,
  classNameBindings: [':ember-light-table'],
  attributeBindings: ['style'],

  media: inject.service(),

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
   * Class names that will be added to all <table> tags
   *
   * @property tableClassNames
   * @type {String}
   * @default ''
   */
  tableClassNames: '',

  /**
   * Enable responsive behavior
   *
   * @property responsive
   * @type {Boolean}
   * @default false
   */
  responsive: false,

  /**
   * A hash to determine the number of columns to show per given breakpoint.
   * If this is specified, it will override any column specific breakpoints.
   *
   * If we have the following breakpoints defined in `app/breakpoints.js`:
   *
   * - mobile
   * - tablet
   * - desktop
   *
   * The following hash can be passed in:
   *
   * ```js
   * {
   *  mobile: 2,
   *  tablet: 4
   * }
   * ```
   *
   * If there is no rule specified for a given breakpoint (i.e. `desktop`),
   * all columns will be shown.
   *
   * @property breakpoints
   * @type {Object}
   * @default null
   */
  breakpoints: null,

  /**
   * Table component shared options
   *
   * @property sharedOptions
   * @type {Object}
   * @private
   */
  sharedOptions: computed(function() {
    return {
      height: this.get('height'),
      fixedHeader: false,
      fixedFooter: false
    };
  }).readOnly(),

  style: computed('height', function() {
    return cssStyleify(this.getProperties(['height']));
  }),

  init() {
    this._super(...arguments);

    let table = this.get('table');
    let media = this.get('media');

    assert('[ember-light-table] table must be an instance of Table', table instanceof Table);

    if (isNone(media)) {
      this.set('responsive', false);
    }
  },

  destroy() {
    this._super(...arguments);
    run.cancel(this._breakpointChangeTimer);
  },

  onMediaChange: on('init', observer('media.matches.[]', 'table.allColumns.[]', function() {
    let responsive = this.get('responsive');
    let matches = this.get('media.matches');
    let breakpoints = this.get('breakpoints');
    let table = this.get('table');
    let numColumns = 0;

    if (!responsive) {
      return;
    }

    if (!isNone(breakpoints)) {
      Object.keys(breakpoints).forEach((b) => {
        if (matches.indexOf(b) > -1) {
          numColumns = Math.max(numColumns, breakpoints[b]);
        }
      });

      this._displayColumns(numColumns);
    } else {
      table.get('allColumns').forEach((c) => {
        let breakpoints = c.get('breakpoints');

        if (isEmpty(breakpoints) || intersections(matches, breakpoints).length > 0) {
          c.set('responsiveHidden', false);
        } else {
          c.set('responsiveHidden', true);
        }
      });
    }

    this._breakpointChangeTimer = run.next(this, 'send', 'onBreakpointChange', matches);
  })),

  _displayColumns(numColumns) {
    let table = this.get('table');
    let hiddenColumns = table.get('responsiveHiddenColumns');
    let visibleColumns = table.get('visibleColumns');

    if (!numColumns) {
      hiddenColumns.setEach('responsiveHidden', false);
    } else if (visibleColumns.length > numColumns) {
      emberArray(visibleColumns.slice(numColumns, visibleColumns.length)).setEach('responsiveHidden', true);
    } else if (visibleColumns.length < numColumns) {
      emberArray(hiddenColumns.slice(0, numColumns - visibleColumns.length)).setEach('responsiveHidden', false);
    }
  },

  actions: {
    /**
     * onBreakpointChange action.
     * @event onBreakpointChange
     * @param  {Array} matches list of matching breakpoints
     */
    onBreakpointChange(/* matches */) {
      callAction(this, 'onBreakpointChange', ...arguments);
    }
  }
});

LightTable.reopenClass({
  positionalParams: ['table']
});

export default LightTable;
