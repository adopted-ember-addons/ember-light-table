import Ember from 'ember';

const {
  isEmpty,
  computed,
  A: emberArray
} = Ember;

 /**
  * @module Table
  * @namespace LightTable
  * @class Column
  */
export default class Column extends Ember.Object.extend({
  /**
   * @property hideable
   * @type {Boolean}
   * @default true
   */
  hideable: true,

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
   * @property resizable
   * @type {Boolean}
   * @default false
   */
  resizable: false,

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
   * You can create your own column types by running the blueprint:
   * `ember g column-type my-column-type`
   *
   * This will generate a component for you which represents the `<th>`
   * element for the column. If you want to apply custom actions to the `th`,
   * or do some custom styling of the `th` with classNameBindings, all of that is
   * available to you in this component.
   *
   * You can then specify the custom type you created as a string here, to use it.
   *
   *
   * @property type
   * @type {String}
   * @default 'base'
   */
  type: 'base',

  /**
   * Type of cell component
   *
   * You can create your own cell types by running the blueprint:
   * `ember g cell-type my-cell-type`
   *
   * This will generate a component for you which represents the `<td>`
   * cells in the column. If you want to apply custom actions to the `td`,
   * or do some custom styling of the `td` with classNameBindings, all of that is
   * available to you in this component.
   *
   * You can then specify the custom type you created as a string here, to use it.
   *
   * @property cellType
   * @type {String}
   * @default 'base'
   */
  cellType: 'base',

  /**
   * Component name for the column
   * @property component
   * @type {String}
   * @optional
   */
  component: null,

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
