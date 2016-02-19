import Ember from 'ember';

const {
  merge
} = Ember;


/**
 * @module Classes
 * @class Row
 * @extends Ember.Object
 */

const defaultOptions = {
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
};

export default class Row extends Ember.Object {
  /**
   * @class Row
   * @constructor
   * @param  {Object} data
   */
  constructor(data) {
    if(data instanceof Row) {
      return data;
    }
    super();
    var options = merge({}, defaultOptions);
    options.data = data;
    Object.keys(options).forEach(k => this[k] = options[k]);
  }
}
