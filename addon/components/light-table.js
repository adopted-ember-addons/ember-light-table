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
 */

/**
 * @class Light-Table
 * @extends Ember.Component
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
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  init() {
    this._super(...arguments);
    assert(`[ember-light-table] table must be an instance of Table`, this.get('table') instanceof Table);
  },

  actions: {
    onScrolledToBottom() {
      callAction.call(this, 'onScrolledToBottom', ...arguments);
    }
  }
});

LightTable.reopenClass({
  positionalParams: ['table']
});

export default LightTable;
