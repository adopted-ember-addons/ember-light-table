import Ember from 'ember';
import layout from 'ember-light-table/templates/components/columns/base';

const {Component, computed, isEmpty} = Ember;

/**
 * @module Column Types
 * @class Base Column
 */
const Column = Component.extend({
  layout,
  tagName: 'th',
  classNames: ['lt-column'],
  attributeBindings: ['width', 'colspan', 'rowspan'],
  classNameBindings: ['align', 'isGroupColumn:lt-group-column', 'isHideable', 'isSortable', 'isSorted', 'column.classNames'],

  width: computed.readOnly('column.width'),
  isGroupColumn: computed.readOnly('column.isGroupColumn'),
  isSortable: computed.readOnly('column.sortable'),
  isSorted: computed.readOnly('column.sorted'),
  isHideable: computed.readOnly('column.hideable'),

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

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
