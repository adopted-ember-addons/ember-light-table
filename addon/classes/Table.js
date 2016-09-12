import Ember from 'ember';
import Row from 'ember-light-table/classes/Row';
import Column from 'ember-light-table/classes/Column';
import SyncArrayProxy from 'ember-light-table/-private/sync-array-proxy';
import { mergeOptionsWithGlobals } from 'ember-light-table/-private/global-options';

const {
  get,
  computed,
  isNone,
  isEmpty,
  A: emberArray
} = Ember;

const RowSyncArrayProxy = SyncArrayProxy.extend({
  serializeContentObjects(objects) {
    return Table.createRows(objects);
  },

  serializeSyncArrayObjects(objects) {
    return objects.map(o => get(o, 'content'));
  }
});

/**
 * @module Table
 * @private
 */

 /**
  * @module Table
  * @class Table
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
   * @property isEmpty
   * @type {Boolean}
   */
  isEmpty: computed.empty('rows').readOnly(),

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
   * @property visibleRows
   * @type {Ember.Array}
   */
  visibleRows: computed.filterBy('rows', 'hidden', false).readOnly(),

  /**
   * @property sortableColumns
   * @type {Ember.Array}
   */
  sortableColumns: computed.filterBy('visibleColumns', 'sortable', true).readOnly(),

  /**
   * @property sortedColumns
   * @type {Ember.Array}
   */
  sortedColumns: computed.filterBy('visibleColumns', 'sorted', true).readOnly(),

  /**
   * @property hideableColumns
   * @type {Ember.Array}
   */
  hideableColumns: computed.filterBy('allColumns', 'hideable', true).readOnly(),

  /**
   * @property hiddenColumns
   * @type {Ember.Array}
   */
  hiddenColumns: computed.filterBy('allColumns', 'hidden', true).readOnly(),

  /**
   * @property visibleColumns
   * @type {Ember.Array}
   */
  visibleColumns: computed.filterBy('allColumns', 'hidden', false).readOnly(),

  /**
   * @property visibleColumnGroups
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
   * @property allColumns
   * @type {Ember.Array}
   */
  allColumns: computed('columns.[]', 'columns.@each.subColumns', function() {
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
   * @param  {Object} options
   *
   */
  constructor(columns = [], rows = [], options = {}) {
    super();

    let _columns = emberArray(Table.createColumns(columns));
    let _rows = emberArray(Table.createRows(rows));
    let _options = mergeOptionsWithGlobals(options);

    if(_options.enableSync) {
      _rows = RowSyncArrayProxy.create({ syncArray: rows, content: _rows });
    }

    this.setProperties({ columns: _columns, rows: _rows });
  }

  // Rows

  /**
   * Replace all the row's content with content of the argument. If argument is an empty array rows will be cleared.
   * @method setRows
   * @param  {Array} rows
   * @param  {Object} options
   * @return {Array} rows
   */
  setRows(rows = [], options = {}) {
    return this.get('rows').setObjects(Table.createRows(rows, options));
  }

  /**
   * Push the object onto the end of the row array if it is not already present.
   * @method addRow
   * @param  {Object} row
   * @param  {Object} options
   */
  addRow(row, options = {}) {
    if (row instanceof Row) {
      this.get('rows').addObject(row);
    } else if (isNone(this.get('rows').findBy('content', row))) {
      this.pushRow(row, options);
    }
  }

  /**
   * Push the objects onto the end of the row array if it is not already present.
   * @method addRows
   * @param  {Array} rows
   * @param  {Object} options
   */
  addRows(rows = [], options = {}) {
    rows.forEach(r => this.addRow(r, options));
  }

  /**
   * Push the object onto the end of the row array.
   * @method pushRow
   * @param  {Object} row
   * @param  {Object} options
   * @return {Row} pushed row
   */
  pushRow(row, options = {}) {
    let _row = Table.createRow(row, options);
    this.get('rows').pushObject(_row);
    return _row;
  }

  /**
   * Push the object onto the end of the row array.
   * @method pushRows
   * @param  {Array}  rows
   * @param  {Object} options
   * @return {Array} pushed rows
   */
  pushRows(rows = [], options = {}) {
    let _rows = Table.createRows(rows, options);
    this.get('rows').pushObjects(_rows);
    return _rows;
  }

  /**
   * Insert a row at the specified index.
   * @method insertRowAt
   * @param  {Number}  index
   * @param  {Object}  row
   * @param  {Object} options
   * @return {Row} inserted row
   */
  insertRowAt(index, row, options = {}) {
    let _row = Table.createRow(row, options);
    this.get('rows').insertAt(index, _row);
    return _row;
  }

  /**
   * Remove all occurrences of an object in the rows
   * @method removeRow
   * @param  {Object}  row
   */
  removeRow(row) {
    if (row instanceof Row) {
      this.get('rows').removeObject(row);
    } else {
      this.get('rows').removeObjects(this.get('rows').filterBy('content', row));
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


  /**
   * Remove a row at the specified index
   * @method removeRowAt
   * @param  {Number}  index
   */
  removeRowAt(index) {
    this.get('rows').removeAt(index);
  }

  // Columns

  /**
   * Replace all the column's content with content of the argument. If argument is an empty array columns will be cleared.
   * @method setColumns
   * @param  {Array} columns
   * @return {Array} columns
   */
  setColumns(columns = []) {
    return this.get('columns').setObjects(Table.createColumns(columns));
  }

  /**
   * Push the object onto the end of the column array if it is not already present.
   * @method addColumn
   * @param  {Object} column
   */
  addColumn(column) {
    this.get('columns').addObject(Table.createColumn(column));
  }

  /**
   * Push the objects onto the end of the column array if it is not already present.
   * @method addColumns
   * @param  {Array} columns
   */
  addColumns(columns = []) {
    this.get('columns').addObjects(Table.createColumns(columns));
  }

  /**
   * Push the object onto the end of the column array.
   * @method pushColumn
   * @param  {Object} column
   * @return {Column} pushed column
   */
  pushColumn(column) {
    let _column = Table.createColumn(column);
    this.get('columns').pushObject(_column);
    return _column;
  }

  /**
   * Push the object onto the end of the column array.
   * @method pushColumns
   * @param  {Array}  columns
   * @return {Array} pushed columns
   */
  pushColumns(columns = []) {
    let _columns = Table.createColumns(columns);
    this.get('columns').pushObjects(_columns);
    return _columns;
  }

  /**
   * Insert a column at the specified index.
   * @method insertColumnAt
   * @param  {Number}  index
   * @param  {Object}  column
   * @return {Column} inserted column
   */
  insertColumnAt(index, column) {
    let _column = Table.createColumn(column);
    this.get('columns').insertAt(index, _column);
    return _column;
  }

  /**
   * Remove all occurrences of an object in the columns
   * @method removeColumn
   * @param  {Object}  column
   */
  removeColumn(column) {
    return this.get('columns').removeObject(column);
  }

  /**
   * Removes each object in the passed enumerable from the columns.
   * @method removeColumns
   * @param  {Array}    columns
   */
  removeColumns(columns = []) {
    return this.get('columns').removeObjects(columns);
  }

  /**
   * Remove a column at the specified index
   * @method removeColumnAt
   * @param  {Number}  index
   */
  removeColumnAt(index) {
    this.get('columns').removeAt(index);
  }

  /**
   * Create a Row object with the given content
   * @method createRow
   * @static
   * @param  {Object}  content
   * @param  {Object}  options
   * @return {Row}
   */
  static createRow(content, options = {}) {
    return new Row(content, options);
  }

  /**
   * Create a collection of Row objects with the given collection
   * @method createRows
   * @static
   * @param  {Array}  rows
   * @param  {Object} options
   * @return {Array}
   */
  static createRows(rows = [], options = {}) {
    return rows.map(r => Table.createRow(r, options));
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
   * Create a collection of Column objects with the given collection
   * @method createColumns
   * @static
   * @param  {Array}  columns
   * @return {Array}
   */
  static createColumns(columns = []) {
    return columns.map(c => Table.createColumn(c));
  }
}
