import Ember from 'ember';

const { computed, guidFor } = Ember;

/**
 * @module Table
 * @extends Ember.ObjectProxy
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
   * Data content for this row. Since this class extends Ember.ObjectProxy,
   * all properties are forwarded to the content. This means that instead of
   * `row.content.foo` you can just do `row.foo`. Please note that methods are
   * not forwarded. You will not be able to do `row.save()`, instead, you would have
   * to do `row.content.save()`.
   *
   * @property content
   * @type {Object}
   */
  content: null,

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
