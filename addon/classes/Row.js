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
   * @property elementId
   * @type {String}
   * @readOnly
   */
  elementId: computed(function() {
    return `lt-row-${guidFor(this)}`;
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
