import { set } from '@ember/object';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { oneWay, readOnly } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import layout from 'ember-light-table/templates/components/columns/base';
import DraggableColumnMixin from 'ember-light-table/mixins/draggable-column';
import cssStyleify from 'ember-light-table/utils/css-styleify';

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
  classNameBindings: [
    'align',
    'isGroupColumn:lt-group-column',
    'isHideable',
    'isSortable',
    'isSorted',
    'isResizable',
    'isResizing',
    'isDraggable',
    'column.classNames',
  ],

  isGroupColumn: readOnly('column.isGroupColumn'),
  isSortable: readOnly('column.sortable'),
  isSorted: readOnly('column.sorted'),
  isHideable: readOnly('column.hideable'),
  isResizable: readOnly('column.resizable'),
  isDraggable: readOnly('column.draggable'),
  isResizing: false,

  style: computed('column.width', function () {
    return cssStyleify(this.column.getProperties(['width']));
  }),

  align: computed('column.align', function () {
    return `align-${this.column.align}`;
  }),

  /**
   * @property label
   * @type {String}
   */
  label: oneWay('column.label'),

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
   * @property extra
   * @type {Object}
   */
  extra: null,

  /**
   * @property sortIcons
   * @type {Object}
   */
  sortIcons: null,

  /**
   * @property sortIconProperty
   * @type {String|null}
   * @private
   */
  sortIconProperty: computed('column.{sortable,sorted,ascending}', function () {
    let sorted = this.column.sorted;

    if (sorted) {
      let ascending = this.column.ascending;
      return ascending ? 'iconAscending' : 'iconDescending';
    }

    let sortable = this.column.sortable;
    return sortable ? 'iconSortable' : null;
  }),

  /**
   * @property colspan
   * @type {Number}
   */
  colspan: computed('column', 'column.visibleSubColumns.[]', function () {
    let subColumns = this.column.visibleSubColumns;
    return !isEmpty(subColumns) ? subColumns.length : 1;
  }),

  /**
   * @property rowspan
   * @type {Number}
   */
  rowspan: computed('_rowspan', 'column.visibleSubColumns.[]', {
    get() {
      if (this._rowspan) {
        return this._rowspan;
      }

      let subColumns = this.column.visibleSubColumns;
      return !isEmpty(subColumns) ? 1 : 2;
    },

    set(key, value) {
      return set(this, '_rowspan', value);
    },
  }),
});

Column.reopenClass({
  positionalParams: ['column'],
});

export default Column;
