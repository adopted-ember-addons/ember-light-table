import Ember from 'ember';
import layout from '../templates/components/light-table';
import callAction from '../utils/call-action';
import TableScrollMixin from '../mixins/table-scroll';
import Table from '../classes/Table';

const {
  assert
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
 * Please see the documentation for the [Head](../Classes/Head.html), [Body](../Classes/Body.html), and [Foot](../Classes/Foot.html) components
 * for more details on all possible options and actions.
 *
 * @class Light Table
 * @main Components
 * @uses TableScrollMixin
 */

const LightTable =  Ember.Component.extend(TableScrollMixin, {
  layout,
  tagName: 'table',
  classNames: ['ember-light-table'],

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

  init() {
    this._super(...arguments);
    assert(`[ember-light-table] table must be an instance of Table`, this.get('table') instanceof Table);
  },

  actions: {
    /**
     * Action to be called when user reached the bottom of the scroll container
     * @method onScrolledToBottom
     */
    onScrolledToBottom() {
      callAction.call(this, 'onScrolledToBottom', ...arguments);
    }
  }
});

LightTable.reopenClass({
  positionalParams: ['table']
});

export default LightTable;
