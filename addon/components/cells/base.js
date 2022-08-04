import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';

/**
 * @module Light Table
 * @submodule Cell Types
 */

/**
 * @module Cell Types
 * @class Base Cell
 */

export default Component.extend({
  tagName: 'td',
  classNames: ['lt-cell'],
  attributeBindings: ['style'],
  classNameBindings: ['align', 'isSorted', 'column.cellClassNames'],

  enableScaffolding: false,

  isSorted: readOnly('column.sorted'),

  style: computed('enableScaffolding', 'column.width', function () {
    let column = this.column;
    let columnWidth = column.get('width');

    if (this.enableScaffolding || !column) {
      return;
    }

    // For performance reasons, it's more interesting to bypass cssStyleify
    // since it leads to a lot of garbage collections
    // when displaying many cells
    return columnWidth ? htmlSafe(`width: ${columnWidth};`) : null;
  }),

  align: computed('column.align', function () {
    return `align-${this.column.align}`;
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
   * @property extra
   * @type {Object}
   */
  extra: null,

  /**
   * @property rawValue
   * @type {Mixed}
   */
  rawValue: null,

  /**
   * @property value
   * @type {Mixed}
   */
  value: computed('column.format', 'rawValue', function () {
    let rawValue = this.rawValue;
    let format = this.column.format;

    if (format && typeof format === 'function') {
      return format.call(this, rawValue);
    }

    return rawValue;
  }),
});
