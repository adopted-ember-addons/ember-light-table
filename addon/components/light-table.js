import Ember from 'ember';
import layout from 'ember-light-table/templates/components/light-table';
import Table from 'ember-light-table/classes/Table';

const {
  assert,
  computed
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

const LightTable =  Ember.Component.extend({
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
  sharedOptions: computed(function() {
    return {
      height: this.get('height'),
      fixedHeader: false,
      fixedFooter: false
    };
  }).readOnly(),

  style: computed('height', function() {
    let height = this.get('height');
    if (height) {
      return Ember.String.htmlSafe(`height:${this.get('height')};`);
    }
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
