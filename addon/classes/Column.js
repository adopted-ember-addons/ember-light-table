import { A as emberArray, makeArray } from '@ember/array';
import EmberObject, { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { guidFor } from '@ember/object/internals';
import fixProto from 'ember-light-table/utils/fix-proto';

/**
 * @module Table
 * @class Column
 */
export default class Column extends EmberObject.extend({
  /**
   * Whether the column can be hidden.
   *
   * CSS Classes:
   *  - `is-hideable`
   *
   * @property hideable
   * @type {Boolean}
   * @default true
   */
  hideable: true,

  /**
   * Whether the column can is hidden.
   *
   * CSS Classes:
   *  - `is-hidden`
   *
   * @property hidden
   * @type {Boolean}
   * @default false
   */
  hidden: false,

  /**
   * If true, this column has been hidden due to the responsive behavior
   *
   * @property responsiveHidden
   * @type {Boolean}
   * @default false
   */
  responsiveHidden: false,

  /**
   * @property ascending
   * @type {Boolean}
   * @default true
   */
  ascending: true,

  /**
   * Whether the column can be sorted.
   *
   * CSS Classes:
   *  - `is-sortable`
   *
   * @property sortable
   * @type {Boolean}
   * @default true
   */
  sortable: true,

  /**
   * Whether the column can be resized.
   *
   * CSS Classes:
   *  - `is-resizable`
   *  - `is-resizing`
   *
   * @property resizable
   * @type {Boolean}
   * @default false
   */
  resizable: false,

  /**
   * Whether the column can be reorder via drag and drop.
   *
   * CSS Classes:
   *  - `is-draggable`
   *  - `is-dragging`
   *  - `is-drag-target`
   *    - `drag-left`
   *    - `drag-right`
   *
   * @property draggable
   * @type {Boolean}
   * @default false
   */
  draggable: false,

  /**
   * Whether the column is a valid drop target.
   *
   * @property droppable
   * @type {Boolean}
   * @default true
   */
  droppable: true,

  /**
   * Whether the column is sorted.
   *
   * CSS Classes:
   *  - `is-sorted`
   *
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
   * The minimum width (in px) that this column can be resized to.
   * @property minResizeWidth
   * @type {Number}
   * @default 0
   */
  minResizeWidth: 0,

  /**
   * The parent column (or group) for this sub-column.
   * This will only have a value if this column is a sub-column.
   * Note: this doesn't update if you move this sub-column to another parent after instantiation.
   *
   * @property parent
   * @type Column
   * @optional
   */
  parent: null,

  /**
   * An array of sub columns to be grouped together
   * @property subColumns
   * @type {Array}
   * @optional
   */
  subColumns: null,

  /**
   * An array of media breakpoints that determine when this column will be shown
   *
   * If we have the following breakpoints defined in `app/breakpoints.js`:
   *
   * - mobile
   * - tablet
   * - desktop
   *
   * And we want to show this column only for tablet and desktop media, the following
   * array should be specified: `['tablet', 'desktop']`.
   *
   * If this property is `null`, `undefined`, or `[]`, then this column will always
   * be shown, regardless of the current media type.
   *
   * @property breakpoints
   * @type {Array}
   * @optional
   */
  breakpoints: null,

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
   * A format function used to calculate a cell's value. This method will be passed
   * the raw value if `valuePath` is specified.
   *
   * @property format
   * @type {Function}
   */
  format: null,

  /**
   * Column's unique ID.
   *
   * @property columnId
   * @type {String}
   * @private
   */
  columnId: computed(function() {
    return guidFor(this);
  }).readOnly(),

  /**
   * True if `hidden` or `responsiveHidden` is true.
   * @property isHidden
   * @type {Boolean}
   */
  isHidden: computed.or('hidden', 'responsiveHidden').readOnly(),

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
  isVisibleGroupColumn: computed('visibleSubColumns.[]', 'isHidden', function() {
    return !isEmpty(this.visibleSubColumns) && !this.isHidden;
  }).readOnly(),

  /**
   * @property visibleSubColumns
   * @type {Array}
   * @private
   */
  visibleSubColumns: computed('subColumns.@each.isHidden', 'isHidden', function() {
    let subColumns = this.subColumns;
    let isHidden = this.isHidden;

    return emberArray(isHidden ? [] : subColumns.filterBy('isHidden', false));
  }).readOnly(),

  init(options = {}) {
    this.setProperties(options);

    const subColumns = emberArray(makeArray(this.subColumns).map((sc) => Column.create(sc)));
    subColumns.setEach('parent', this);

    this.set('subColumns', subColumns);
  }
}) {}

// https://github.com/offirgolan/ember-light-table/issues/436#issuecomment-310138868
fixProto(Column);
