import Ember from 'ember';
import layout from 'ember-light-table/templates/components/columns/base';
import DraggableColumnMixin from 'ember-light-table/mixins/draggable-column';
import cssStyleify from 'ember-light-table/utils/css-styleify';

const {
  Component,
  computed,
  isEmpty
} = Ember;

/**
 * @module Light Table
 * @submodule Column Types
 */

/**
 * @module Column Types
 * @class Base Column
 */

const Column = Component.extend(DraggableColumnMixin, {
  layout,
  tagName: 'th',
  classNames: ['lt-column'],
  attributeBindings: ['style', 'colspan', 'rowspan'],
  classNameBindings: ['align', 'isGroupColumn:lt-group-column', 'isHideable', 'isSortable', 'isSorted', 'isResizable', 'isResizing', 'isDraggable', 'column.classNames'],

  isGroupColumn: computed.readOnly('column.isGroupColumn'),
  isSortable: computed.readOnly('column.sortable'),
  isSorted: computed.readOnly('column.sorted'),
  isHideable: computed.readOnly('column.hideable'),
  isResizable: computed.readOnly('column.resizable'),
  isDraggable: computed.readOnly('column.draggable'),
  isResizing: false,

  style: computed('column.width', function() {
    return cssStyleify(this.get('column').getProperties(['width']));
  }),

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }),

  /**
   * @property label
   * @type {String}
   */
  label: computed.oneWay('column.label'),

  /**
   * @property table
   * @type {Table}
   */
  table: null,

  /**
   * @property column
   * @type {Column}
   */
  column: null,

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * @property sortIcons
   * @type {Object}
   */
  sortIcons: null,

  /**
   * @property colspan
   * @type {Number}
   */
  colspan: computed('column', 'column.visibleSubColumns.[]', function() {
    let subColumns = this.get('column.visibleSubColumns');
    return !isEmpty(subColumns) ? subColumns.length : 1;
  }),

  /**
   * @property rowspan
   * @type {Number}
   */
  rowspan: computed('column.visibleSubColumns.[]', function() {
    let subColumns = this.get('column.visibleSubColumns');
    return !isEmpty(subColumns) ? 1 : 2;
  })
});

Column.reopenClass({
  positionalParams: ['column']
});

export default Column;
