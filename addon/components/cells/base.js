import Ember from 'ember';
import layout from 'ember-light-table/templates/components/cells/base';
import cssStyleify from 'ember-light-table/utils/css-styleify';

const {
  Component,
  computed
} = Ember;

/**
 * @module Light Table
 * @submodule Cell Types
 */

/**
 * @module Cell Types
 * @class Base Cell
 */

const Cell = Component.extend({
  layout,
  tagName: 'td',
  classNames: ['lt-cell'],
  attributeBindings: ['style'],
  classNameBindings: ['align', 'isSorted', 'column.cellClassNames'],

  isSorted: computed.readOnly('column.sorted'),

  style: computed('column.width', function() {
    return cssStyleify(this.get('column').getProperties(['width']));
  }),

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }),

  /**
   * @property table
   * @type {Table}
   */
  table: null,

  /**
   * @property column
   * @type {Column}
   */
  column: null,

  /**
   * @property row
   * @type {Row}
   */
  row: null,

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * @property rawValue
   * @type {Mixed}
   */
  rawValue: null,

  /**
   * @property value
   * @type {Mixed}
   */
  value: computed('rawValue', function() {
    let rawValue = this.get('rawValue');
    let format = this.get('column.format');

    if (format && typeof format === 'function') {
      return format.call(this, rawValue);
    }
    return rawValue;
  })
});

Cell.reopenClass({
  positionalParams: ['column', 'row']
});

export default Cell;
