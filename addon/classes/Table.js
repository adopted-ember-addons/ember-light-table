import Ember from 'ember';
import Row from './Row';
import Column from './Column';

const {
  computed,
  makeArray,
  isNone,
  isEmpty,
  A: emberArray
} = Ember;

/**
 * @module Classes
 */

 /**
  * @class Table
  * @extends Ember.Object
  */
export default class Table extends Ember.Object.extend({
  /**
   * @property columns
   * @type {Ember.Array}
   * @default []
   */
  columns: null,

  /**
   * @property rows
   * @type {Ember.Array}
   * @default []
   */
  rows: null,

  /**
   * @property expandedRows
   * @type {Ember.Array}
   */
  expandedRows: computed.filterBy('rows', 'expanded', true).readOnly(),

  /**
   * @property selectedRows
   * @type {Ember.Array}
   */
  selectedRows: computed.filterBy('rows', 'selected', true).readOnly(),

  /**
   * @property sortedColumns
   * @type {Ember.Array}
   */
  sortedColumns: computed.filterBy('visibleColumns', 'sorted', true).readOnly(),

  /**
   * @property sortableColumns
   * @type {Ember.Array}
   */
  sortableColumns: computed.filterBy('visibleColumns', 'sortable', true).readOnly(),

  /**
   * @property visibleColumns
   * @type {Ember.Array}
   */
  visibleColumns: computed.filterBy('iterableColumns', 'hidden', false).readOnly(),

  /**
   * @property visibleColumns
   * @type {Ember.Array}
   */
  visibleColumnGroups: computed('columns.@each.{hidden,isVisibleGroupColumn}', function() {
    return emberArray(this.get('columns').reduce((arr, c) => {
      if (c.get('isVisibleGroupColumn') || (!c.get('isGroupColumn') && !c.get('hidden'))) {
        arr.push(c);
      }
      return arr;
    }, []));
  }).readOnly(),

  /**
   * @property visibleSubColumns
   * @type {Ember.Array}
   */
  visibleSubColumns: computed('columns.@each.visibleSubColumns', function() {
    return emberArray([].concat(...this.get('columns').getEach('visibleSubColumns')));
  }).readOnly(),

  /**
   * @property iterableColumns
   * @type {Ember.Array}
   */
  iterableColumns: computed('columns.[]', 'columns.@each.subColumns', function() {
    return emberArray(this.get('columns').reduce((arr, c) => {
      let subColumns = c.get('subColumns');
      if (isEmpty(subColumns)) {
        arr.push(c);
      } else {
        subColumns.forEach(sc => arr.push(sc));
      }
      return arr;
    }, []));
  }).readOnly()
}) {
  /**
   * @class Table
   * @constructor
   * @param  {Array} columns
   * @param  {Array} rows
   */
  constructor(columns = [], rows = []) {
    super();
    this.setProperties({
      rows: emberArray(Table.createRows(rows)),
      columns: emberArray(Table.createColumns(columns)),
    });
  }

  // Rows

  /**
   * Replace all the row's content with content of the argument. If argument is an empty array receiver will be cleared.
   * @method setRows
   * @param  {Array} rows
   */
  setRows(rows = []) {
    this.rows.setObjects(Table.createRows(rows));
  }

  /**
   * Push the object onto the end of the row array if it is not already present.
   * @method addRow
   * @param  {Object} row
   */
  addRow(row) {
    if (row instanceof Row) {
      this.rows.addObject(row);
    } else if (isNone(this.rows.findBy('data', row))) {
      this.pushRow(row);
    }
  }

  /**
   * Push the objects onto the end of the row array if it is not already present.
   * @method addRows
   * @param  {Array} rows
   */
  addRows(rows = []) {
    rows.forEach(r => this.addRow(r));
  }

  /**
   * Push the object onto the end of the row array.
   * @method pushRow
   * @param  {Object} row
   */
  pushRow(row) {
    this.rows.pushObject(Table.createRow(row));
  }

  /**
   * Push the object onto the end of the row array.
   * @method pushRows
   * @param  {Array}  rows
   */
  pushRows(rows = []) {
    this.rows.pushObjects(Table.createRows(rows));
  }

  /**
   * Remove all occurrences of an object in the rows
   * @method removeRow
   * @param  {Object}  row
   */
  removeRow(row) {
    if (row instanceof Row) {
      this.rows.removeObject(row);
    } else {
      this.rows.removeObject(this.rows.findBy('data', row));
    }
  }

  /**
   * Removes each object in the passed enumerable from the rows.
   * @method removeRows
   * @param  {Array}    rows
   */
  removeRows(rows = []) {
    rows.forEach(r => this.removeRow(r));
  }

  // Columns

  /**
   * Replace all the column's content with content of the argument. If argument is an empty array receiver will be cleared.
   * @method setColumns
   * @param  {Array} columns
   */
  setColumns(columns = []) {
    return this.columns.setObjects(Table.createColumns(columns));
  }

  /**
   * Push the object onto the end of the column array if it is not already present.
   * @method addColumn
   * @param  {Object} column
   */
  addColumn(column) {
    return this.columns.addObject(Table.createColumn(column));
  }

  /**
   * Push the objects onto the end of the column array if it is not already present.
   * @method addColumns
   * @param  {Array} columns
   */
  addColumns(columns = []) {
    return this.columns.addObjects(Table.createColumns(columns));
  }

  /**
   * Push the object onto the end of the column array.
   * @method pushColumn
   * @param  {Object} column
   */
  pushColumn(column) {
    return this.columns.pushObject(Table.createColumn(column));
  }

  /**
   * Push the object onto the end of the column array.
   * @method pushColumns
   * @param  {Array}  columns
   */
  pushColumns(columns = []) {
    return this.columns.pushObjects(Table.createColumns(columns));
  }

  /**
   * Remove all occurrences of an object in the columns
   * @method removeColumn
   * @param  {Object}  column
   */
  removeColumn(column) {
    return this.columns.removeObject(column);
  }

  /**
   * Removes each object in the passed enumerable from the columns.
   * @method removeColumns
   * @param  {Array}    columns
   */
  removeColumns(columns = []) {
    return this.columns.removeObjects(columns);
  }

  /**
   * Create a Row object with the given data
   * @method createRow
   * @static
   * @param  {Object}  data
   * @return {Row}
   */
  static createRow(data) {
    return new Row(data);
  }

  /**
   * Create a collection of Row objects with the given datum
   * @method createRows
   * @static
   * @param  {Array}  datum
   * @return {Array}
   */
  static createRows(datum = []) {
    return makeArray(datum).map(d => new Row(d));
  }

  /**
   * Create a Column object with the given options
   * @method createColumn
   * @static
   * @param  {Object}  column
   * @return {Column}
   */
  static createColumn(column) {
    return new Column(column);
  }

  /**
   * Create a collection of Column objects with the given options
   * @method createColumns
   * @static
   * @param  {Array}  columns
   * @return {Array}
   */
  static createColumns(columns = []) {
    return makeArray(columns).map(c => new Column(c));
  }
}
