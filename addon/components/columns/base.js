import DraggableColumn from '../draggable-column';
import classic from 'ember-classic-decorator';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
} from '@ember-decorators/component';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import cssStyleify from 'ember-light-table/utils/css-styleify';

import { readOnly } from '@ember/object/computed';

/**
 * @module Light Table
 * @submodule Column Types
 */

/**
 * @module Column Types
 * @class Base Column
 */

@classic
@tagName('th')
@classNames('lt-column')
@attributeBindings('style', 'colspan', 'rowspan')
@classNameBindings(
  'align',
  'isGroupColumn:lt-group-column',
  'isHideable',
  'isSortable',
  'isSorted',
  'isResizable',
  'isResizing',
  'isDraggable',
  'column.classNames'
)
export default class Base extends DraggableColumn {
  @computed('column.isGroupColumn')
  get isGroupColumn() {
    return this.column.isGroupColumn;
  }

  @readOnly('column.sortable')
  get isSortable() {
    return this.column.sortable;
  }

  @computed('column.sorted')
  get isSorted() {
    return this.column.sorted;
  }

  @computed('column.hideable')
  get isHideable() {
    return this.column.hideable;
  }

  @computed('column.resizable')
  get isResizable() {
    return this.column.resizable;
  }

  @computed('column.draggable')
  get isDraggable() {
    return this.column.draggable;
  }

  isResizing = false;

  get style() {
    return cssStyleify(this.column.getProperties(['width']));
  }

  @computed('column.align')
  get align() {
    return `align-${this.column.align}`;
  }

  /**
   * @property label
   * @type {String}
   */
  @computed('column.label')
  get label() {
    return this.column.label;
  }

  /**
   * @property table
   * @type {Table}
   */
  table = null;

  /**
   * @property column
   * @type {Column}
   */
  column = null;

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions = null;

  /**
   * @property extra
   * @type {Object}
   */
  extra = null;

  /**
   * @property sortIcons
   * @type {Object}
   */
  sortIcons = null;

  /**
   * @property sortIconProperty
   * @type {String|null}
   * @private
   */
  @computed('column.{sortable,sorted,ascending}', function () {
    let sorted = this.column.sorted;

    if (sorted) {
      let ascending = this.column.ascending;
      return ascending ? 'iconAscending' : 'iconDescending';
    }

    let sortable = this.column.sortable;
    return sortable ? 'iconSortable' : null;
  })
  sortIconProperty;

  /**
   * @property colspan
   * @type {Number}
   */
  @computed('column', 'column.visibleSubColumns.[]', {
    get() {
      let subColumns = this.column.visibleSubColumns;
      return !isEmpty(subColumns) ? subColumns.length : 1;
    },
  })
  colspan;

  /**
   * @property rowspan
   * @type {Number}
   */
  @computed('_rowspan', 'column.visibleSubColumns.[]', {
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
  })
  rowspan;
}
