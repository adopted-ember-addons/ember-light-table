import Ember from 'ember';
import Row from './Row';
import Column from './Column';

const {
  computed,
  makeArray,
  A: emberArray
} = Ember;

export default class Table extends Ember.Object {
  constructor(rows = [], columns = []) {
    super();

    this.rows = emberArray(Table.createRows(rows));
    this.columns = emberArray(Table.createColumns(columns));

    this.visibleColumnGroups = computed.filterBy('columns', 'hidden', false);

    this.visibleSubColumns = computed('columns.@each.visibleSubColumns', function() {
      return [].concat(...this.columns.getEach('visibleSubColumns'));
    });

    this.visibleColumns = computed('columns.@each.visibleColumns', function() {
      return [].concat(...this.columns.getEach('visibleColumns'));
    });

    this.expandedRows = computed.filterBy('rows', 'expanded', true);
    this.selectedRows = computed.filterBy('rows', 'selected', true);
  }

  // Rows
  setRows(rows = []) {
    return this.rows.setObjects(Table.createRows(rows));
  }

  addRow(row) {
    return this.rows.addObject(Table.createRow(row));
  }

  addRows(rows = []) {
    return this.rows.addObjects(Table.createRows(rows));
  }

  pushRow(row)  {
    return this.rows.pushObject(Table.createRow(row));
  }

  pushRows(rows = []) {
    return this.rows.pushObjects(Table.createRows(rows));
  }

  removeRow(row) {
    return this.rows.removeObject(row);
  }

  removeRows(rows = []) {
    return this.rows.removeObjects(rows);
  }

  // Columns
  setColumns(columns = []) {
    return this.columns.setObjects(Table.createColumns(columns));
  }

  addColumn(column) {
    return this.columns.addObject(Table.createColumn(column));
  }

  addColumns(columns = []) {
    return this.columns.addObjects(Table.createColumns(columns));
  }

  pushColumn(column)  {
    return this.columns.pushObject(Table.createColumn(column));
  }

  pushColumns(columns = []) {
    return this.columns.pushObjects(Table.createColumns(columns));
  }

  removeColumn(column) {
    return this.columns.removeObject(column);
  }

  removeColumns(columns = []) {
    return this.columns.removeObjects(columns);
  }


  static createRow(data) {
    return new Row(data);
  }

  static createColumn(column) {
    return new Column(column);
  }

  static createColumns(columns = []) {
    return makeArray(columns).map(c => new Column(c));
  }

  static createRows(datum = []) {
    return makeArray(datum).map(d => new Row(d));
  }
}
