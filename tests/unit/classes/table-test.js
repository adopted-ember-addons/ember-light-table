import { A as emberArray } from '@ember/array';
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

test('create table - invalid constructor', function(assert) {
  assert.expect(2);

  assert.throws(() => {
    new Table([{}, {}], null);
  }, /\[ember-light-table] rows must be an array if defined/, 'rows is not an array');
  assert.throws(() => {
    new Table(null, [{}]);
  }, /\[ember-light-table] columns must be an array if defined/, 'columns is not an array');
});

test('reopen table', function(assert) {
  assert.equal(typeof Table.reopen, 'function', 'reopen is a function');
  assert.equal(typeof Table.reopenClass, 'function', 'reopenClass is a function');
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

test('CP - allColumns', function(assert) {
  let table = new Table();
  let col = new Column();
  let group = new Column({
    subColumns: [{}, {}]
  });
  let group2 = new Column({
    subColumns: [{}, {}]
  });

  table.setColumns([col, group, group2]);
  assert.equal(table.get('allColumns.length'), 5);
});

test('CP - isEmpty', function(assert) {
  let table = new Table([{}, {}], []);

  assert.ok(table, 'table is set up correctly');
  assert.ok(table.get('isEmpty'), 'table is initially empty');
  table.pushRow({});
  assert.notOk(table.get('isEmpty'), 'table is not empty after a row was pushed');
  table.setRows([]);
  assert.ok(table.get('isEmpty'), 'table is empty again after the rows were cleared');
});

test('CP - isEmpty (enableSync = true)', function(assert) {
  let rowsArray = emberArray();
  let table = new Table([{}, {}], rowsArray, { enableSync: true });

  assert.ok(table, 'table is set up correctly');
  assert.ok(table.get('isEmpty'), 'table is initially empty');
  rowsArray.pushObject({});
  assert.notOk(table.get('isEmpty'), 'table is not empty after a row was pushed');
  rowsArray.clear();
  assert.ok(table.get('isEmpty'), 'table is empty again after the rows were cleared');
});

test('table method - setRows', function(assert) {
  let table = new Table();

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.setRows([{}, {}], { selected: true });
  assert.equal(table.get('rows.length'), 2);
  assert.ok(table.get('rows').isEvery('selected', true));

  table.setRows();
  assert.equal(table.get('rows.length'), 0);
});

test('table method - addRow', function(assert) {
  let table = new Table();
  let content = { name: 'Offir' };
  let row = new Row(content);

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.addRow({}, { selected: true });
  assert.equal(table.get('rows.length'), 1);
  assert.ok(table.get('rows.firstObject.selected'));

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

  table.addRows([{}, {}], { selected: true });
  assert.equal(table.get('rows.length'), 2);
  assert.ok(table.get('rows').isEvery('selected', true));

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

  table.addRow({}, { selected: true });
  assert.equal(table.get('rows.length'), 1);
  assert.ok(table.get('rows.firstObject.selected'));

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

  table.pushRows([{}, {}], { selected: true });
  assert.equal(table.get('rows.length'), 2);
  assert.ok(table.get('rows').isEvery('selected', true));

  table.pushRows([row]);
  assert.equal(table.get('rows.length'), 3);

  table.pushRows([row]);
  assert.equal(table.get('rows.length'), 4);

  table.pushRows([content]);
  assert.equal(table.get('rows.length'), 5);

  assert.equal(table.get('rows.lastObject.name'), 'Offir');
});

test('table method - insertRowAt', function(assert) {
  let table = new Table();

  assert.ok(table);
  assert.equal(table.get('rows.length'), 0);

  table.setRows([{}, {}, {}]);
  assert.equal(table.get('rows.length'), 3);

  table.insertRowAt(1, { name: 'Offir' }, { selected: true });

  assert.equal(table.get('rows.length'), 4);
  assert.equal(table.get('rows.1.name'), 'Offir');
  assert.ok(table.get('rows.1.selected'));
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

test('table method - insertColumnAt', function(assert) {
  let table = new Table();

  assert.ok(table);
  assert.equal(table.get('columns.length'), 0);

  table.setColumns([{}, {}, {}]);
  assert.equal(table.get('columns.length'), 3);

  table.insertColumnAt(1, { label: 'Offir' });

  assert.equal(table.get('columns.length'), 4);
  assert.equal(table.get('columns.1.label'), 'Offir');
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
  let row = Table.createRow({ name: 'Offir' }, { selected: true });
  assert.ok(row instanceof Row);
  assert.equal(row.get('name'), 'Offir');
  assert.ok(row.get('selected'));
});

test('static table method - createRows', function(assert) {
  let rows = Table.createRows([{}, {}], { selected: true });
  assert.equal(rows.length, 2);
  assert.ok(rows[0] instanceof Row);
  assert.ok(rows[1].get('selected'));
});

test('static table method - createColumn', function(assert) {
  let col = Table.createColumn({ label: 'Name' });
  assert.ok(col instanceof Column);
  assert.equal(col.get('label'), 'Name');
});

test('static table method - createColumns', function(assert) {
  let cols = Table.createColumns([{}, {}]);
  assert.equal(cols.length, 2);
  assert.ok(cols[0] instanceof Column);
});

test('table modifications with sync enabled - simple', function(assert) {
  let rows = emberArray([]);
  let table = new Table([], rows, { enableSync: true });

  table.addRow({ firstName: 'Offir' });

  assert.equal(table.get('rows.length'), 1);
  assert.equal(table.get('rows.length'), rows.get('length'));

  rows.pushObject({ firstName: 'Taras' });

  assert.equal(rows.get('length'), 2);
  assert.equal(table.get('rows.length'), rows.get('length'));

  assert.deepEqual(table.get('rows').getEach('firstName'), rows.getEach('firstName'));

  table.get('rows').clear();

  assert.equal(table.get('rows.length'), 0);
  assert.equal(table.get('rows.length'), rows.get('length'));
});

test('table modifications with sync enabled - stress', function(assert) {
  let rows = emberArray([]);
  let table = new Table([], rows, { enableSync: true });

  for (let i = 0; i < 100; i++) {
    table.addRow({ position: i });
  }

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));

  for (let i = 100; i < 200; i++) {
    rows.pushObject({ position: i });
  }

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));

  table.removeRowAt(5);
  table.removeRowAt(10);
  table.removeRowAt(125);

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));

  rows.removeAt(10);
  rows.removeAt(20);
  rows.removeAt(150);

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));

  table.get('rows').clear();

  assert.equal(table.get('rows.length'), 0);
  assert.equal(table.get('rows.length'), rows.get('length'));
});

test('table modifications with sync enabled - sort', function(assert) {
  let rows = emberArray([]);
  let table = new Table([], rows, { enableSync: true });
  let length = 5;

  for (let i = 0; i < length; i++) {
    rows.pushObject({ position: i });
  }

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));

  rows.sort((a, b) => {
    return a.position > b.position ? -1 : 1;
  });

  rows.arrayContentDidChange(0, length, length);

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));

  rows.reverseObjects();

  assert.equal(table.get('rows.length'), rows.get('length'));
  assert.deepEqual(table.get('rows').getEach('position'), rows.getEach('position'));
});

test('setRowsSynced', function(assert) {
  let initialRows = emberArray([]);
  let otherRows = emberArray([]);
  let table = new Table([], initialRows, { enableSync: true });
  let initialLength = 5;
  let otherLength = 13;

  for (let i = 0; i < initialLength; i++) {
    initialRows.pushObject({ position: i });
  }
  assert.deepEqual(table.get('rows').getEach('position'), initialRows.getEach('position'), 'the table is initialized with a synced array');

  table.setRowsSynced(otherRows);
  assert.deepEqual(table.get('rows').getEach('position'), otherRows.getEach('position'), 'the synced array may be replaced');

  for (let i = 0; i < otherLength; i++) {
    otherRows.pushObject({ position: i });
  }
  assert.deepEqual(table.get('rows').getEach('position'), otherRows.getEach('position'), 'the replacement array is correctly synced');

  initialRows.popObject();
  assert.deepEqual(table.get('rows').getEach('position'), otherRows.getEach('position'), 'mutating the replaced array has no effect');
});
