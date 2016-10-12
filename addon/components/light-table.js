import Ember from 'ember';
import layout from 'ember-light-table/templates/components/light-table';
import Table from 'ember-light-table/classes/Table';
import cssStyleify from 'ember-light-table/utils/css-styleify';

const {
  assert,
  Component,
  computed,
  isEmpty,
  isNone
} = Ember;

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
  totalWidth: computed('visibleColumns.[]', 'visibleColumns.@each.width', function() {
    let visibleColumns = this.get('visibleColumns');
    let widths = visibleColumns.getEach('width');
    let unit = (widths[0] || '').match(/\D+$/);

    if(isEmpty(unit)) {
      return 0;
    }

    unit = unit[0];

    // 1. Check if all widths are present
    // 2. Check if all widths are the same unit
    for(let i = 0; i < widths.length; i++) {
      let width = widths[i];

      if(isNone(width) || width.indexOf(unit) === -1) {
        return 0;
      }
    }

    return widths.reduce((t, w) => t += parseInt(w, 10), 0) + unit;
  }),

  style: computed('totalWidth', 'height', function () {
    let totalWidth = this.get('totalWidth');
    let style = this.getProperties(['height']);

    if(totalWidth) {
      style.width = totalWidth;
      style.overflowX = 'auto';
    }

    return cssStyleify(style);
  }),

  init() {
    this._super(...arguments);
    assert('[ember-light-table] table must be an instance of Table', this.get('table') instanceof Table);
  }
});

LightTable.reopenClass({
  positionalParams: ['table']
});

export default LightTable;
