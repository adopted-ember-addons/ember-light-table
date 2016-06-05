import Ember from 'ember';

const {
  isEmpty,
  computed,
  A: emberArray
} = Ember;

 /**
  * @module Classes
  * @class Column
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
   * Type of column component
   *
   * @property type
   * @type {String}
   * @default 'base'
   */
  type: 'base',

  /**
   * Type of cell component
   *
   * @property cellType
   * @type {String}
   * @default 'base'
   */
  cellType: 'base',

  /**
   * Component name for the column header
   * @property headerComponent
   * @type {String}
   * @optional
   */
  headerComponent: null,

  /**
   * Component name for the column cells. This component is automatically passed row,
   * column, and value variables, and you can specify a valuePath to set what property
   * the value is set to.
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
   * Class names to be applied to header and footer cells of this column
   *
   * @property classNames
   * @type {String | Array}
   */
  classNames: null,

  /**
   * Class names to be applied to all cells of this column
   *
   * @property cellClassNames
   * @type {String | Array}
   */
  cellClassNames: null,

  /**
   * A format function used to calculate a cell's value
   * @property format
   * @type {Function}
   */
  format: null,

  /**
   * @property isGroupColumn
   * @type {Boolean}
   * @private
   */
  isGroupColumn: computed.notEmpty('subColumns').readOnly(),

  /**
   * @property isVisibleGroupColumn
   * @type {Boolean}
   * @private
   */
  isVisibleGroupColumn: computed('visibleSubColumns.[]', 'hidden', function() {
    return !isEmpty(this.get('visibleSubColumns')) && !this.get('hidden');
  }).readOnly(),

  /**
   * @property visibleSubColumns
   * @type {Array}
   * @private
   */
  visibleSubColumns: computed('subColumns.@each.hidden', 'hidden', function() {
    let subColumns = this.get('subColumns');
    return isEmpty(subColumns) || this.get('hidden') ? [] : subColumns.filterBy('hidden', false);
  }).readOnly()
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
