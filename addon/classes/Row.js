import Ember from 'ember';

/**
 * @module Classes
 */

 /**
  * @class Row
  * @extends Ember.Object
  */
export default class Row extends Ember.Object.extend({
  /**
   * @property data
   * @type {Object}
   */
  data: null,

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
   * @param {Object} data
   */
  constructor(data) {
    if (data instanceof Row) {
      return data;
    }

    super();
    this.set('data', data);
  }
}
