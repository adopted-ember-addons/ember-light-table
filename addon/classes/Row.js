import Ember from 'ember';

const { computed, guidFor } = Ember;

/**
 * @module Table
 * @class Row
 */
export default class Row extends Ember.ObjectProxy.extend({
  /**
   * @property hidden
   * @type {Boolean}
   * @default false
   */
  hidden: false,

  /**
   * @property expanded
   * @type {Boolean}
   * @default false
   */
  expanded: false,

  /**
   * @property selected
   * @type {Boolean}
   * @default false
   */
  selected: false,

  /**
   * Class names to be applied to this row
   *
   * @property classNames
   * @type {String | Array}
   */
  classNames: null,

  /**
   * Element ID for the corresponding `{{lt-row}}`.
   *
   * Note: named `rowId` in order to not shadow the `content.id` property.
   *
   * @property rowId
   * @type {String}
   * @readOnly
   */
  rowId: computed(function() {
    return guidFor(this);
  }).readOnly()
}) {
  /**
   * @class Row
   * @constructor
   * @param {Object} content
   * @param {Object} options
   */
  constructor(content, options = {}) {
    if (content instanceof Row) {
      return content;
    }

    super();
    this.setProperties(options);
    this.set('content', content);
  }
}
