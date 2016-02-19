import Ember from 'ember';

const {
  merge,
  isEmpty,
  computed,
  A: emberArray
} = Ember;

/**
 * @module Classes
 * @class Column
 * @extends Ember.Object
 */

const defaultOptions = {
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
  width: null
};

export default class Column extends Ember.Object {

  /**
   * @class Column
   * @constructor
   * @param {Object} column Column options
   */
  constructor(column = {}) {
    if(column instanceof Column) {
      return column;
    }
    super();
    var options = merge({}, defaultOptions);
    merge(options, column);
    Object.keys(options).forEach(k => this[k] = options[k]);

    if(!isEmpty(this.subColumns)) {
      this.subColumns = emberArray(this.subColumns.map(sc => new Column(sc)));
    }

    this._setupComputedProperties();
  }

  /**
   * Sets up computed properties for the class
   * @method  _setupComputedProperties
   * @private
   */
  _setupComputedProperties() {

    /**
     * @property isGroupColumn
     * @type {Boolean}
     */
    this.isGroupColumn = computed.notEmpty('subColumns');

    /**
     * @property isVisibleGroupColumn
     * @type {Boolean}
     */
    this.isVisibleGroupColumn = computed('visibleSubColumns.[]', 'hidden', function() {
      return !isEmpty(this.get('visibleSubColumns')) && !this.get('hidden');
    });

    /**
     * @property visibleSubColumns
     * @type {Array}
     */
    this.visibleSubColumns = computed('subColumns.@each.hidden', 'hidden', function() {
      let subColumns = this.get('subColumns');
      return isEmpty(subColumns) || this.get('hidden') ? [] : subColumns.filterBy('hidden', false);
    });
  }
}
