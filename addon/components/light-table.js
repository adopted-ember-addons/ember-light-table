import { A as emberArray } from '@ember/array';
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { isEmpty, isNone } from '@ember/utils';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';
import layout from 'ember-light-table/templates/components/light-table';
import Table from 'ember-light-table/classes/Table';
import cssStyleify from 'ember-light-table/utils/css-styleify';

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
 * Using angle brackets (Ember 3.4+)
 * 
 * ```hbs
 * <LightTable table as |t|>
 *   <t.head />
 *   <t.body />
 *   <t.foot />
 * </LightTable>
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
  classNameBindings: [':ember-light-table', 'occlusion'],
  attributeBindings: ['style'],

  media: service(),
  scrollbarThickness: service(),

  /**
   * @property table
   * @type {Table}
   */
  table: null,

  /**
   * This is used to propagate custom user defined actions to custom cell and header components.
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
   * Object to store any arbitrary configuration meant to be used by custom
   * components.
   *
   * ```hbs
   * {{#light-table table
   *   extra=(hash
   *     highlightColor="yellow"
   *    )
   *    as |t|
   *  }}
   *   {{t.head}}
   *   {{t.body}}
   *   {{t.foot}}
   * {{/light-table}}
   * ```
   *
   * Now in all custom components, you can access this value like so:
   *
   * ```hbs
   * <span style="background: {{extra.highlightColor}}">{{value}}<span>
   * ```
   *
   * @property extra
   * @type {Object}
   */
  extra: null,

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
   * Toggles occlusion rendering functionality. Currently experimental.
   * If set to true, you must set {{#crossLink 't.body/estimatedRowHeight:property'}}{{/crossLink}} to
   * something other than the default value.
   *
   * @property occlusion
   * @type Boolean
   * @default False
   */
  occlusion: false,

  /**
   * Estimated size of a row. Used in `vertical-collection` to determine roughly the number
   * of rows exist out of the viewport.
   *
   * @property estimatedRowHeight
   * @type Number
   * @default false
   */
  estimatedRowHeight: 0,

  /**
   * Whether `vertical-collection` should recycle table rows. This speeds up performance with occlusion
   * rendering but may cause problems if any components expect to reset their state to the initial state
   * with every rerender of the list.
   *
   * @property shouldRecycle
   * @type Boolean
   * @default true
   */
  shouldRecycle: true,

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
      fixedFooter: false,
      occlusion: this.get('occlusion'),
      estimatedRowHeight: this.get('estimatedRowHeight'),
      shouldRecycle: this.get('shouldRecycle')
    };
  }).readOnly(),

  visibleColumns: computed.readOnly('table.visibleColumns'),

  /**
   * Calculates the total width of the visible columns via their `width`
   * propert.
   *
   * Returns 0 for the following conditions
   *  - All widths are not set
   *  - Widths are not the same unit
   *  - Unit cannot be determined
   *
   * @property totalWidth
   * @type {Number}
   * @private
   */
  totalWidth: computed('visibleColumns.@each.width', function() {
    let visibleColumns = this.get('visibleColumns');
    let widths = visibleColumns.getEach('width');
    let unit = (widths[0] || '').match(/\D+$/);
    let totalWidth = 0;

    if (isEmpty(unit)) {
      return 0;
    }

    unit = unit[0];

    /*
     1. Check if all widths are present
     2. Check if all widths are the same unit
     */
    for (let i = 0; i < widths.length; i++) {
      let width = widths[i];

      if (isNone(width) || width.indexOf(unit) === -1) {
        return 0;
      }

      totalWidth += parseInt(width, 10);
    }

    return `${totalWidth}${unit}`;
  }),

  style: computed('totalWidth', 'height', 'occlusion', function() {
    let totalWidth = this.get('totalWidth');
    let style = this.getProperties(['height']);

    if (totalWidth) {
      if (this.get('occlusion')) {
        const scrollbarThickness = this.get('scrollbarThickness.thickness');
        style.width = `calc(${totalWidth} + ${scrollbarThickness}px)`;
      } else {
        style.width = totalWidth;
      }

      style.overflowX = 'auto';
    }

    return cssStyleify(style);
  }),

  init() {
    this._super(...arguments);

    let table = this.get('table');
    let media = this.get('media');

    assert('[ember-light-table] table must be an instance of Table', table instanceof Table);

    if (isNone(media)) {
      this.set('responsive', false);
    }

    this.onMediaChange();
  },

  onMediaChange: observer('media.matches.[]', 'table.allColumns.[]', function() {
    let responsive = this.get('responsive');
    let matches = this.get('media.matches');
    let breakpoints = this.get('breakpoints');
    let table = this.get('table');
    let numColumns = 0;

    if (!responsive) {
      return;
    }

    this.send('onBeforeResponsiveChange', matches);

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
        let isMatch = isEmpty(breakpoints) || intersections(matches, breakpoints).length > 0;
        c.set('responsiveHidden', !isMatch);
      });
    }

    this.send('onAfterResponsiveChange', matches);
  }),

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
     * onBeforeResponsiveChange action.
     * Called before any column visibility is altered.
     *
     * @event onBeforeResponsiveChange
     * @param  {Array} matches list of matching breakpoints
     */
    onBeforeResponsiveChange(/* matches */) {
      this.sendAction('onBeforeResponsiveChange', ...arguments);
    },

    /**
     * onAfterResponsiveChange action.
     * Called after all column visibility has been altered.
     *
     * @event onAfterResponsiveChange
     * @param  {Array} matches list of matching breakpoints
     */
    onAfterResponsiveChange(/* matches */) {
      this.sendAction('onAfterResponsiveChange', ...arguments);
    }
  }
});

LightTable.reopenClass({
  positionalParams: ['table']
});

export default LightTable;
