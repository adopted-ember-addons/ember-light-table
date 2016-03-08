import Ember from 'ember';

 /**
  * @module Classes
  * @class Row
  */
export default class Row extends Ember.ObjectProxy.extend({
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
  selected: false
}) {
  /**
   * @class Row
   * @constructor
   * @param {Object} content
   */
  constructor(content) {
    if (content instanceof Row) {
      return content;
    }

    super();
    this.set('content', content);
  }
}
