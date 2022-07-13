import { A as emberArray, isArray } from '@ember/array';
import { assert } from '@ember/debug';
import EmberObject, { computed } from '@ember/object';
import { empty, filterBy } from '@ember/object/computed';
import Row from 'ember-light-table/classes/Row';
import Column from 'ember-light-table/classes/Column';
import SyncArrayProxy from 'ember-light-table/-private/sync-array-proxy';
import { mergeOptionsWithGlobals } from 'ember-light-table/-private/global-options';
import { isNone } from '@ember/utils';

const RowSyncArrayProxy = SyncArrayProxy.extend({
  serializeContentObjects(objects) {
    return Table.createRows(objects);
  },

  serializeSyncArrayObjects(objects) {
    return objects.map((o) => o.content);
  },
});

/**
 * @module Table
 * @private
 */

/**
 * @module Table
 * @class Table
 */
export default class Table extends EmberObject.extend({
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
  isEmpty: empty('rows').readOnly(),

  /**
   * @property expandedRows
   * @type {Ember.Array}
   */
  expandedRows: filterBy('rows', 'expanded', true).readOnly(),

  /**
   * @property selectedRows
   * @type {Ember.Array}
   */
  selectedRows: filterBy('rows', 'selected', true).readOnly(),

  /**
   * @property visibleRows
   * @type {Ember.Array}
   */
  visibleRows: filterBy('rows', 'hidden', false).readOnly(),

  /**
   * @property sortableColumns
   * @type {Ember.Array}
   */
  sortableColumns: filterBy('visibleColumns', 'sortable', true).readOnly(),

  /**
   * @property sortedColumns
   * @type {Ember.Array}
   */
  sortedColumns: filterBy('visibleColumns', 'sorted', true).readOnly(),

  /**
   * @property hideableColumns
   * @type {Ember.Array}
   */
  hideableColumns: filterBy('allColumns', 'hideable', true).readOnly(),

  /**
   * @property hiddenColumns
   * @type {Ember.Array}
   */
  hiddenColumns: filterBy('allColumns', 'hidden', true).readOnly(),

  /**
   * @property responsiveHiddenColumns
   * @type {Ember.Array}
   */
  responsiveHiddenColumns: filterBy(
    'allColumns',
    'responsiveHidden',
    true
  ).readOnly(),

  /**
   * @property visibleColumns
   * @type {Ember.Array}
   */
  visibleColumns: filterBy('allColumns', 'isHidden', false).readOnly(),

  /**
   * @property visibleColumnGroups
   * @type {Ember.Array}
   */
  visibleColumnGroups: computed(
    'columns.[]',
    'columns.@each.{isHidden,isVisibleGroupColumn}',
    function () {
      return this.columns.reduce((arr, c) => {
        if (
          c.get('isVisibleGroupColumn') ||
          (!c.get('isGroupColumn') && !c.get('isHidden'))
        ) {
          arr.pushObject(c);
        }

        return arr;
      }, emberArray([]));
    }
  ).readOnly(),

  /**
   * @property visibleSubColumns
   * @type {Ember.Array}
   */
  visibleSubColumns: computed('columns.@each.visibleSubColumns', function () {
    return emberArray([].concat(...this.columns.getEach('visibleSubColumns')));
  }).readOnly(),

  /**
   * @property allColumns
   * @type {Ember.Array}
   */
  allColumns: computed('columns.@each.subColumns', function () {
    return this.columns.reduce((arr, c) => {
      arr.pushObjects(c.get('isGroupColumn') ? c.get('subColumns') : [c]);
      return arr;
    }, emberArray([]));
  }).readOnly(),

  /**
   * @class Table
   * @constructor
   * @param  {Object} options
   * @param  {Array} options.columns
   * @param  {Array} options.rows
   * @param  {Boolean} options.enableSync If `true`, creates a two way sync
   *           between the table's rows and the passed rows collection. Also see
   *           `setRowsSynced(rows)`.
   * @param  {Object}  options.rowOptions Options hash passed through to
   *           `createRow(content, options)`.
   */
  init(options = {}) {
    let { columns = [], rows = [] } = options;
    assert(
      '[ember-light-table] columns must be an array if defined',
      isArray(columns)
    );
    assert(
      '[ember-light-table] rows must be an array if defined',
      isArray(rows)
    );

    this.setProperties(mergeOptionsWithGlobals(options));

    this.set('columns', emberArray(Table.createColumns(columns)));

    let _rows = emberArray(Table.createRows(rows, this.rowOptions));

    if (this.enableSync) {
      _rows = RowSyncArrayProxy.create({
        syncArray: rows,
        content: _rows,
      });
    }

    this.set('rows', _rows);
  },
}) {
  destroy() {
    super.destroy(...arguments);

    let rows = this.rows;

    if (rows instanceof RowSyncArrayProxy) {
      rows.destroy();
    }
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
    return this.rows.setObjects(Table.createRows(rows, options));
  }

  /**
   * The same as `setRows`, however the given array is synced, meaning that
   * mutating the array also updates the table and vice-versa.
   *
   * Also see `enableSync` in the constructor options.
   *
   * @method setRowsSynced
   * @param  {Array} rows
   * @param  {Object} options
   * @return {Array} rows
   */
  setRowsSynced(rows = [], options = {}) {
    let _rows = RowSyncArrayProxy.create({
      syncArray: rows,
      content: emberArray(Table.createRows(rows, options)),
    });

    return this.set('rows', _rows);
  }

  /**
   * Push the object onto the end of the row array if it is not already present.
   * @method addRow
   * @param  {Object} row
   * @param  {Object} options
   */
  addRow(row, options = {}) {
    if (row instanceof Row) {
      this.rows.addObject(row);
    } else if (isNone(this.rows.findBy('content', row))) {
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
    rows.forEach((r) => this.addRow(r, options));
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
    this.rows.pushObject(_row);
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
    this.rows.pushObjects(_rows);
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
    this.rows.insertAt(index, _row);
    return _row;
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
      this.rows.removeObjects(this.rows.filterBy('content', row));
    }
  }

  /**
   * Removes each object in the passed enumerable from the rows.
   * @method removeRows
   * @param  {Array}    rows
   */
  removeRows(rows = []) {
    rows.forEach((r) => this.removeRow(r));
  }

  /**
   * Remove a row at the specified index
   * @method removeRowAt
   * @param  {Number}  index
   */
  removeRowAt(index) {
    this.rows.removeAt(index);
  }

  // Columns

  /**
   * Replace all the column's content with content of the argument. If argument is an empty array columns will be cleared.
   * @method setColumns
   * @param  {Array} columns
   * @return {Array} columns
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
    this.columns.addObject(Table.createColumn(column));
  }

  /**
   * Push the objects onto the end of the column array if it is not already present.
   * @method addColumns
   * @param  {Array} columns
   */
  addColumns(columns = []) {
    this.columns.addObjects(Table.createColumns(columns));
  }

  /**
   * Push the object onto the end of the column array.
   * @method pushColumn
   * @param  {Object} column
   * @return {Column} pushed column
   */
  pushColumn(column) {
    let _column = Table.createColumn(column);
    this.columns.pushObject(_column);
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
    this.columns.pushObjects(_columns);
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
    this.columns.insertAt(index, _column);
    return _column;
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
   * Remove a column at the specified index
   * @method removeColumnAt
   * @param  {Number}  index
   */
  removeColumnAt(index) {
    this.columns.removeAt(index);
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
    if (content instanceof Row) {
      return content;
    } else {
      return Row.create(Object.assign({}, options, { content }));
    }
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
    return rows.map((r) => Table.createRow(r, options));
  }

  /**
   * Create a Column object with the given options
   * @method createColumn
   * @static
   * @param  {Object}  column
   * @return {Column}
   */
  static createColumn(column) {
    if (column instanceof Column) {
      return column;
    } else {
      return Column.create(column);
    }
  }

  /**
   * Create a collection of Column objects with the given collection
   * @method createColumns
   * @static
   * @param  {Array}  columns
   * @return {Array}
   */
  static createColumns(columns = []) {
    return columns.map((c) => Table.createColumn(c));
  }
}
