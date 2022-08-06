import classic from 'ember-classic-decorator';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/template';

/**
 * @module Light Table
 * @submodule Cell Types
 */

/**
 * @module Cell Types
 * @class Base Cell
 */

@classic
@tagName('td')
@classNames('lt-cell')
@attributeBindings('style')
@classNameBindings('align', 'isSorted', 'column.cellClassNames')
export default class Base extends Component {
  enableScaffolding = false;

  get isSorted() {
    return this.column.isSorted;
  }

  @computed('enableScaffolding', 'column.width')
  get style() {
    let column = this.column;
    let columnWidth = column.get('width');

    if (this.enableScaffolding || !column) {
      return null;
    }

    // For performance reasons, it's more interesting to bypass cssStyleify
    // since it leads to a lot of garbage collections
    // when displaying many cells
    return columnWidth ? htmlSafe(`width: ${columnWidth};`) : null;
  }

  get align() {
    return `align-${this.column.align}`;
  }

  /**
   * @property table
   * @type {Table}
   */
  table = null;

  /**
   * @property column
   * @type {Column}
   */
  column = null;

  /**
   * @property row
   * @type {Row}
   */
  row = null;

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions = null;

  /**
   * @property extra
   * @type {Object}
   */
  extra = null;

  /**
   * @property rawValue
   * @type {Mixed}
   */
  rawValue = null;

  /**
   * @property value
   * @type {Mixed}
   */
  @computed('column.format', 'rawValue')
  get value() {
    const rawValue = this.rawValue;
    const format = this.column.format;

    if (format && typeof format === 'function') {
      return format.call(this, rawValue);
    }

    return rawValue;
  }
}
