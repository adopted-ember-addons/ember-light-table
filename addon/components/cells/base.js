import Ember from 'ember';

const {
  computed
} = Ember;

/**
 * @module Cell Types
 * @class Base Cell
 */
const Cell = Ember.Component.extend({
  tagName: 'td',
  classNames: ['lt-cell'],
  attributeBindings: ['width'],
  classNameBindings: ['align', 'isSorted', 'column.cellClassNames'],

  width: computed.readOnly('column.width'),
  isSorted: computed.readOnly('column.sorted'),

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

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
    const rawValue = this.get('rawValue');
    const format = this.get('column.format');
    if(format && typeof format === 'function') {
      return format.call(this, rawValue);
    }
    return rawValue;
  }).readOnly()
});

Cell.reopenClass({
  positionalParams: ['column', 'row']
});

export default Cell;
