import Ember from 'ember';

const {
  isEmpty,
  computed,
  A: emberArray
} = Ember;

/**
 * @module Classes
 */

 /**
  * @class Column
  * @extends Ember.Object
  */
export default class Column extends Ember.Object.extend({
  /**
   * @property hidden
   * @type {Boolean}
   * @default false
   */
  hidden: false,

  /**
   * @property ascending
   * @type {Boolean}
   * @default true
   */
  ascending: true,

  /**
   * @property sortable
   * @type {Boolean}
   * @default true
   */
  sortable: true,

  /**
   * @property sorted
   * @type {Boolean}
   * @default false
   */
  sorted: false,

  /**
   * Column header label
   * @property label
   * @type {String}
   * @default ''
   */
  label: '',

  /**
   * Text alignment. Possible values are ['left', 'right', 'center']
   * @property align
   * @type {String}
   * @default 'left'
   */
  align: 'left',

  /**
   * An array of sub columns to be grouped together
   * @property subColumns
   * @type {Array}
   * @optional
   */
  subColumns: null,

  /**
   * Component name for the column header
   * @property headerComponent
   * @type {String}
   * @optional
   */
  headerComponent: null,

  /**
   * Component name for the column cells
   * @property cellComponent
   * @type {String}
   * @optional
   */
  cellComponent: null,

  /**
   * @property valuePath
   * @type {String}
   */
  valuePath: null,

  /**
   * @property width
   * @type {String}
   */
  width: null,

  /**
   * @property isGroupColumn
   * @type {Boolean}
   */
  isGroupColumn: computed.notEmpty('subColumns'),

  /**
   * @property isVisibleGroupColumn
   * @type {Boolean}
   */
  isVisibleGroupColumn: computed('visibleSubColumns.[]', 'hidden', function() {
    return !isEmpty(this.get('visibleSubColumns')) && !this.get('hidden');
  }),

  /**
   * @property visibleSubColumns
   * @type {Array}
   */
  visibleSubColumns: computed('subColumns.@each.hidden', 'hidden', function() {
    let subColumns = this.get('subColumns');
    return isEmpty(subColumns) || this.get('hidden') ? [] : subColumns.filterBy('hidden', false);
  })
}) {
  /**
   * @class Column
   * @constructor
   * @param {Object} options
   */
  constructor(options = {}) {
    if(options instanceof Column) {
      return options;
    }

    super();
    this.setProperties(options);

    if(!isEmpty(options.subColumns)) {
      this.set('subColumns', emberArray(options.subColumns.map(sc => new Column(sc))));
    }
  }
}
