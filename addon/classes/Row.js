import Ember from 'ember';

 /**
  * @module Table
  * @class Row
  */
export default class Row extends Ember.ObjectProxy.extend({
  /**
   * @property hidden
   * @type {Boolean}
   * @default undefined
   */

  /**
   * @property expanded
   * @type {Boolean}
   * @default undefined
   */

  /**
   * @property selected
   * @type {Boolean}
   * @default undefined
   */

  /**
   * Class names to be applied to this row
   *
   * @property classNames
   * @type {String | Array}
   */
  classNames: null,
}) {
  /**
   * @class Row
   * @constructor
   * @param {Object} content
   * @param {Object} options
   */
  constructor(content = {}, options = {}) {
    if (content instanceof Row) {
      return content;
    }

    super();
    this.set('content', content);
    this.setProperties(options);

    if (Ember.isNone(this.get('hidden'))) {
      this.set('hidden', false);
    }

    if (Ember.isNone(this.get('expanded'))) {
      this.set('expanded', false);
    }

    if (Ember.isNone(this.get('selected'))) {
      this.set('selected', false);
    }
  }
}
