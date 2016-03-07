import { Table, Column, Row } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Table');

test('create table - default options', function(assert) {
  let table = new Table();

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);
  assert.equal(table.get('columns.length'), 0);
});

test('create table - with options', function(assert) {
  let table = new Table([{}, {}], [{}]);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 1);
  assert.equal(table.get('columns.length'), 2);

  assert.ok(table.rows[0] instanceof Row);
  assert.ok(table.columns[0] instanceof Column);
});

test('CP - visibleColumnGroups', function(assert) {
  let table = new Table();
  let col = new Column();
  let group = new Column({
    subColumns: [{}, {}]
  });

  table.setColumns([col, group]);
  assert.equal(table.get('visibleColumnGroups.length'), 2);

  col.set('hidden', true);
  assert.equal(table.get('visibleColumnGroups.length'), 1);

  group.subColumns.setEach('hidden', true);
  assert.equal(table.get('visibleColumnGroups.length'), 0);
});

test('CP - visibleSubColumns', function(assert) {
  let table = new Table();
  let group = new Column({
    subColumns: [{}, {}]
  });
  let group2 = new Column({
    subColumns: [{}, {}]
  });

  table.setColumns([group, group2]);
  assert.equal(table.get('visibleSubColumns.length'), 4);

  group.subColumns.setEach('hidden', true);
  assert.equal(table.get('visibleSubColumns.length'), 2);
});

test('CP - flattenedColumns', function(assert) {
  let table = new Table();
  let col = new Column();
  let group = new Column({
    subColumns: [{}, {}]
  });
  let group2 = new Column({
    subColumns: [{}, {}]
  });

  table.setColumns([col, group, group2]);
  assert.equal(table.get('flattenedColumns.length'), 5);
});


test('table method - setRows', function(assert) {
  let table = new Table();

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.setRows([{}, {}]);
  assert.equal(table.get('rows.length'), 2);

  table.setRows();
  assert.equal(table.get('rows.length'), 0);
});

test('table method - addRow', function(assert) {
  let table = new Table();
  let content = { name: 'Offir' };
  let row = new Row(content);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.addRow({});
  assert.equal(table.get('rows.length'), 1);

  table.addRow(row);
  assert.equal(table.get('rows.length'), 2);

  table.addRow(row);
  assert.equal(table.get('rows.length'), 2);

  table.addRow(content);
  assert.equal(table.get('rows.length'), 2);

  assert.equal(table.get('rows.lastObject.name'), 'Offir');
});

test('table method - addRows', function(assert) {
  let table = new Table();
  let content = { name: 'Offir' };
  let row = new Row(content);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.addRows([{}, {}]);
  assert.equal(table.get('rows.length'), 2);

  table.addRows([row]);
  assert.equal(table.get('rows.length'), 3);

  table.addRows([row]);
  assert.equal(table.get('rows.length'), 3);

  table.addRows([content]);
  assert.equal(table.get('rows.length'), 3);

  assert.equal(table.get('rows.lastObject.name'), 'Offir');
});


test('table method - pushRow', function(assert) {
  let table = new Table();
  let content = { name: 'Offir' };
  let row = new Row(content);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.addRow({});
  assert.equal(table.get('rows.length'), 1);

  table.pushRow(row);
  assert.equal(table.get('rows.length'), 2);

  table.pushRow(row);
  assert.equal(table.get('rows.length'), 3);

  table.pushRow(content);
  assert.equal(table.get('rows.length'), 4);

  assert.equal(table.get('rows.lastObject.name'), 'Offir');
});

test('table method - pushRows', function(assert) {
  let table = new Table();
  let content = { name: 'Offir' };
  let row = new Row(content);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.pushRows([{}, {}]);
  assert.equal(table.get('rows.length'), 2);

  table.pushRows([row]);
  assert.equal(table.get('rows.length'), 3);

  table.pushRows([row]);
  assert.equal(table.get('rows.length'), 4);

  table.pushRows([content]);
  assert.equal(table.get('rows.length'), 5);

  assert.equal(table.get('rows.lastObject.name'), 'Offir');
});

test('table method - removeRow', function(assert) {
  let table = new Table();
  let content = { name: 'Offir' };
  let row = new Row(content);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.addRow(row);
  assert.equal(table.get('rows.length'), 1);

  table.removeRow(row);
  assert.equal(table.get('rows.length'), 0);

  table.pushRows([row, row, row]);
  assert.equal(table.get('rows.length'), 3);

  table.removeRow(row);
  assert.equal(table.get('rows.length'), 0);

  table.pushRows([content, content, content]);
  assert.equal(table.get('rows.length'), 3);

  table.removeRow(content);
  assert.equal(table.get('rows.length'), 0);
});

test('table method - removeRows', function(assert) {
  let table = new Table();
  let row = new Row();
  let row2 = new Row();

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.addRows([row, row2]);
  assert.equal(table.get('rows.length'), 2);

  table.removeRows([row, row2]);
  assert.equal(table.get('rows.length'), 0);
});

test('table method - setColumns', function(assert) {
  let table = new Table();

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.setColumns([{}, {}]);
  assert.equal(table.get('columns.length'), 2);

  table.setColumns();
  assert.equal(table.get('columns.length'), 0);
});

test('table method - addColumn', function(assert) {
  let table = new Table();
  let col = new Column({ label: 'Name' });

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.addColumn({});
  assert.equal(table.get('columns.length'), 1);

  table.addColumn(col);
  assert.equal(table.get('columns.length'), 2);

  table.addColumn(col);
  assert.equal(table.get('columns.length'), 2);

  assert.equal(table.get('columns.lastObject.label'), 'Name');
});

test('table method - addColumns', function(assert) {
  let table = new Table();
  let col = new Column({ label: 'Name' });

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.addColumns([{}, {}]);
  assert.equal(table.get('columns.length'), 2);

  table.addColumns([col]);
  assert.equal(table.get('columns.length'), 3);

  table.addColumns([col]);
  assert.equal(table.get('columns.length'), 3);

  assert.equal(table.get('columns.lastObject.label'), 'Name');
});


test('table method - pushColumn', function(assert) {
  let table = new Table();
  let content = { label: 'Name' };
  let col = new Column(content);

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.addColumn({});
  assert.equal(table.get('columns.length'), 1);

  table.pushColumn(col);
  assert.equal(table.get('columns.length'), 2);

  table.pushColumn(col);
  assert.equal(table.get('columns.length'), 3);

  table.pushColumn(content);
  assert.equal(table.get('columns.length'), 4);

  assert.equal(table.get('columns.lastObject.label'), 'Name');
});

test('table method - pushColumns', function(assert) {
  let table = new Table();
  let col = new Column({ label: 'Name' });

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.pushColumns([{}, {}]);
  assert.equal(table.get('columns.length'), 2);

  table.pushColumns([col]);
  assert.equal(table.get('columns.length'), 3);

  table.pushColumns([col]);
  assert.equal(table.get('columns.length'), 4);

  assert.equal(table.get('columns.lastObject.label'), 'Name');
});

test('table method - removeColumn', function(assert) {
  let table = new Table();
  let col = new Column({ label: 'Name' });

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.addColumn(col);
  assert.equal(table.get('columns.length'), 1);

  table.removeColumn(col);
  assert.equal(table.get('columns.length'), 0);

  table.pushColumns([col, col, col]);
  assert.equal(table.get('columns.length'), 3);

  table.removeColumn(col);
  assert.equal(table.get('columns.length'), 0);
});

test('table method - removeColumns', function(assert) {
  let table = new Table();
  let col = new Column();
  let col2 = new Column();

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.addColumns([col, col2]);
  assert.equal(table.get('columns.length'), 2);

  table.removeColumns([col, col2]);
  assert.equal(table.get('columns.length'), 0);
});

test('static table method - createRow', function(assert) {
  let row = Table.createRow({ name: 'Offir'});
  assert.ok(row instanceof Row);
  assert.equal(row.get('name'), 'Offir');
});

test('static table method - createRows', function(assert) {
  let rows = Table.createRows([{}, {}]);
  assert.equal(rows.length, 2);
  assert.ok(rows[0] instanceof Row);
});

test('static table method - createColumn', function(assert) {
  let col = Table.createColumn({ label: 'Name'});
  assert.ok(col instanceof Column);
  assert.equal(col.get('label'), 'Name');
});

test('static table method - createColumns', function(assert) {
  let cols = Table.createColumns([{}, {}]);
  assert.equal(cols.length, 2);
  assert.ok(cols[0] instanceof Column);
});
