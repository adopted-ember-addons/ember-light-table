import Ember from 'ember';

const { computed, isBlank } = Ember;

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
   * @property rowComponent
   * @type {Ember.Component}
   * @private
   */
  rowComponent: null,

  /**
   * @property scrollOffset
   * @type {Number}
   * @private
   * @readOnly
   */
  scrollOffset: computed(function() {
    const element = this.get('rowComponent.element');

    if (isBlank(element)) {
      return null;
    }

    return element.offsetTop;
  }).readOnly().volatile()
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
