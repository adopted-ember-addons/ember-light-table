/* eslint-disable ember/use-ember-data-rfc-395-imports */
import { A as emberArray } from '@ember/array';
import { Table, Column, Row } from 'ember-light-table';
import { module, test } from 'qunit';
import DS from 'ember-data';
import EmberObject from '@ember/object';

module('Unit | Classes | Table', function () {
  test('create table - default options', function (assert) {
    let table = Table.create();

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);
    assert.strictEqual(table.get('columns.length'), 0);
  });

  test('create table - with options', function (assert) {
    let table = Table.create({ columns: [{}, {}], rows: [{}] });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 1);
    assert.strictEqual(table.get('columns.length'), 2);

    assert.ok(table.rows[0] instanceof Row);
    assert.ok(table.columns[0] instanceof Column);
  });

  test('create table - invalid constructor', function (assert) {
    assert.expect(2);

    assert.throws(
      () => {
        Table.create({ columns: [{}, {}], rows: null });
      },
      /\[ember-light-table] rows must be an array if defined/,
      'rows is not an array'
    );
    assert.throws(
      () => {
        Table.create({ columns: null, rows: [{}] });
      },
      /\[ember-light-table] columns must be an array if defined/,
      'columns is not an array'
    );
  });

  test('create table - with RecordArray instance as rows', function (assert) {
    assert.expect(3);

    let models = ['Tom', 'Yehuda', 'Tomster'].map((name) => {
      return EmberObject.create({ name });
    });

    let rows = DS.RecordArray.create({
      content: emberArray(models),
      objectAtContent(index) {
        return this.content[index];
      },
    });

    let columns = [{ label: 'Name', valuePath: 'name' }];
    let table = Table.create({ columns, rows });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 3);
    assert.strictEqual(table.get('columns.length'), 1);
  });

  test('CP - visibleColumnGroups', function (assert) {
    let table = Table.create();
    let col = Column.create();
    let group = Column.create({
      subColumns: [{}, {}],
    });

    table.setColumns([col, group]);
    assert.strictEqual(table.get('visibleColumnGroups.length'), 2);

    col.set('hidden', true);
    assert.strictEqual(table.get('visibleColumnGroups.length'), 1);

    group.subColumns.setEach('hidden', true);
    assert.strictEqual(table.get('visibleColumnGroups.length'), 0);
  });

  test('CP - visibleSubColumns', function (assert) {
    let table = Table.create();
    let group = Column.create({
      subColumns: [{}, {}],
    });
    let group2 = Column.create({
      subColumns: [{}, {}],
    });

    table.setColumns([group, group2]);
    assert.strictEqual(table.get('visibleSubColumns.length'), 4);

    group.subColumns.setEach('hidden', true);
    assert.strictEqual(table.get('visibleSubColumns.length'), 2);
  });

  test('CP - allColumns', function (assert) {
    let table = Table.create();
    let col = Column.create();
    let group = Column.create({
      subColumns: [{}, {}],
    });
    let group2 = Column.create({
      subColumns: [{}, {}],
    });

    table.setColumns([col, group, group2]);
    assert.strictEqual(table.get('allColumns.length'), 5);
  });

  test('CP - isEmpty', function (assert) {
    let table = Table.create({ columns: [{}, {}], rows: [] });

    assert.ok(table, 'table is set up correctly');
    assert.ok(table.get('isEmpty'), 'table is initially empty');
    table.pushRow({});
    assert.notOk(
      table.get('isEmpty'),
      'table is not empty after a row was pushed'
    );
    table.setRows([]);
    assert.ok(
      table.get('isEmpty'),
      'table is empty again after the rows were cleared'
    );
  });

  test('table method - setRows', function (assert) {
    let table = Table.create();

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.setRows([{}, {}], { selected: true });
    assert.strictEqual(table.get('rows.length'), 2);
    assert.ok(table.get('rows').isEvery('selected', true));

    table.setRows();
    assert.strictEqual(table.get('rows.length'), 0);
  });

  test('table method - addRow', function (assert) {
    let table = Table.create();
    let content = { name: 'Offir' };
    let row = Row.create({ content });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.addRow({}, { selected: true });
    assert.strictEqual(table.get('rows.length'), 1);
    assert.ok(table.get('rows.firstObject.selected'));

    table.addRow(row);
    assert.strictEqual(table.get('rows.length'), 2);

    table.addRow(row);
    assert.strictEqual(table.get('rows.length'), 2);

    table.addRow(content);
    assert.strictEqual(table.get('rows.length'), 2);

    assert.strictEqual(table.get('rows.lastObject.name'), 'Offir');
  });

  test('table method - addRows', function (assert) {
    let table = Table.create();
    let content = { name: 'Offir' };
    let row = Row.create({ content });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.addRows([{}, {}], { selected: true });
    assert.strictEqual(table.get('rows.length'), 2);
    assert.ok(table.get('rows').isEvery('selected', true));

    table.addRows([row]);
    assert.strictEqual(table.get('rows.length'), 3);

    table.addRows([row]);
    assert.strictEqual(table.get('rows.length'), 3);

    table.addRows([content]);
    assert.strictEqual(table.get('rows.length'), 3);

    assert.strictEqual(table.get('rows.lastObject.name'), 'Offir');
  });

  test('table method - pushRow', function (assert) {
    let table = Table.create();
    let content = { name: 'Offir' };
    let row = Row.create({ content });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.addRow({}, { selected: true });
    assert.strictEqual(table.get('rows.length'), 1);
    assert.ok(table.get('rows.firstObject.selected'));

    table.pushRow(row);
    assert.strictEqual(table.get('rows.length'), 2);

    table.pushRow(row);
    assert.strictEqual(table.get('rows.length'), 3);

    table.pushRow(content);
    assert.strictEqual(table.get('rows.length'), 4);

    assert.strictEqual(table.get('rows.lastObject.name'), 'Offir');
  });

  test('table method - pushRows', function (assert) {
    let table = Table.create();
    let content = { name: 'Offir' };
    let row = Row.create({ content });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.pushRows([{}, {}], { selected: true });
    assert.strictEqual(table.get('rows.length'), 2);
    assert.ok(table.get('rows').isEvery('selected', true));

    table.pushRows([row]);
    assert.strictEqual(table.get('rows.length'), 3);

    table.pushRows([row]);
    assert.strictEqual(table.get('rows.length'), 4);

    table.pushRows([content]);
    assert.strictEqual(table.get('rows.length'), 5);

    assert.strictEqual(table.get('rows.lastObject.name'), 'Offir');
  });

  test('table method - insertRowAt', function (assert) {
    let table = Table.create();

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.setRows([{}, {}, {}]);
    assert.strictEqual(table.get('rows.length'), 3);

    table.insertRowAt(1, { name: 'Offir' }, { selected: true });

    assert.strictEqual(table.get('rows.length'), 4);
    assert.strictEqual(table.get('rows.1.name'), 'Offir');
    assert.ok(table.get('rows.1.selected'));
  });

  test('table method - removeRow', function (assert) {
    let table = Table.create();
    let content = { name: 'Offir' };
    let row = Row.create({ content });

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.addRow(row);
    assert.strictEqual(table.get('rows.length'), 1);

    table.removeRow(row);
    assert.strictEqual(table.get('rows.length'), 0);

    table.pushRows([row, row, row]);
    assert.strictEqual(table.get('rows.length'), 3);

    table.removeRow(row);
    assert.strictEqual(table.get('rows.length'), 0);

    table.pushRows([content, content, content]);
    assert.strictEqual(table.get('rows.length'), 3);

    table.removeRow(content);
    // I believe this fails because our content object is duplicated at some point during the set process
    // if this is an issue we'll need to find a different way to reliably identify duplicates
    assert.strictEqual(table.get('rows.length'), 0);
  });

  test('table method - removeRows', function (assert) {
    let table = Table.create();
    let row = Row.create();
    let row2 = Row.create();

    assert.ok(table);
    assert.strictEqual(table.get('rows.length'), 0);

    table.addRows([row, row2]);
    assert.strictEqual(table.get('rows.length'), 2);

    table.removeRows([row, row2]);
    assert.strictEqual(table.get('rows.length'), 0);
  });

  test('table method - setColumns', function (assert) {
    let table = Table.create();

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.setColumns([{}, {}]);
    assert.strictEqual(table.get('columns.length'), 2);

    table.setColumns();
    assert.strictEqual(table.get('columns.length'), 0);
  });

  test('table method - addColumn', function (assert) {
    let table = Table.create();
    let col = Column.create({ label: 'Name' });

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.addColumn({});
    assert.strictEqual(table.get('columns.length'), 1);

    table.addColumn(col);
    assert.strictEqual(table.get('columns.length'), 2);

    table.addColumn(col);
    assert.strictEqual(table.get('columns.length'), 2);

    assert.strictEqual(table.get('columns.lastObject.label'), 'Name');
  });

  test('table method - addColumns', function (assert) {
    let table = Table.create();
    let col = Column.create({ label: 'Name' });

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.addColumns([{}, {}]);
    assert.strictEqual(table.get('columns.length'), 2);

    table.addColumns([col]);
    assert.strictEqual(table.get('columns.length'), 3);

    table.addColumns([col]);
    assert.strictEqual(table.get('columns.length'), 3);

    assert.strictEqual(table.get('columns.lastObject.label'), 'Name');
  });

  test('table method - pushColumn', function (assert) {
    let table = Table.create();
    let content = { label: 'Name' };
    let col = Column.create(content);

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.addColumn({});
    assert.strictEqual(table.get('columns.length'), 1);

    table.pushColumn(col);
    assert.strictEqual(table.get('columns.length'), 2);

    table.pushColumn(col);
    assert.strictEqual(table.get('columns.length'), 3);

    table.pushColumn(content);
    assert.strictEqual(table.get('columns.length'), 4);

    assert.strictEqual(table.get('columns.lastObject.label'), 'Name');
  });

  test('table method - pushColumns', function (assert) {
    let table = Table.create();
    let col = Column.create({ label: 'Name' });

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.pushColumns([{}, {}]);
    assert.strictEqual(table.get('columns.length'), 2);

    table.pushColumns([col]);
    assert.strictEqual(table.get('columns.length'), 3);

    table.pushColumns([col]);
    assert.strictEqual(table.get('columns.length'), 4);

    assert.strictEqual(table.get('columns.lastObject.label'), 'Name');
  });

  test('table method - insertColumnAt', function (assert) {
    let table = Table.create();

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.setColumns([{}, {}, {}]);
    assert.strictEqual(table.get('columns.length'), 3);

    table.insertColumnAt(1, { label: 'Offir' });

    assert.strictEqual(table.get('columns.length'), 4);
    assert.strictEqual(table.get('columns.1.label'), 'Offir');
  });

  test('table method - removeColumn', function (assert) {
    let table = Table.create();
    let col = Column.create({ label: 'Name' });

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.addColumn(col);
    assert.strictEqual(table.get('columns.length'), 1);

    table.removeColumn(col);
    assert.strictEqual(table.get('columns.length'), 0);

    table.pushColumns([col, col, col]);
    assert.strictEqual(table.get('columns.length'), 3);

    table.removeColumn(col);
    assert.strictEqual(table.get('columns.length'), 0);
  });

  test('table method - removeColumns', function (assert) {
    let table = Table.create();
    let col = Column.create();
    let col2 = Column.create();

    assert.ok(table);
    assert.strictEqual(table.get('columns.length'), 0);

    table.addColumns([col, col2]);
    assert.strictEqual(table.get('columns.length'), 2);

    table.removeColumns([col, col2]);
    assert.strictEqual(table.get('columns.length'), 0);
  });

  test('static table method - createRow', function (assert) {
    let row = Table.createRow({ name: 'Offir' }, { selected: true });
    assert.ok(row instanceof Row);
    assert.strictEqual(row.get('name'), 'Offir');
    assert.ok(row.get('selected'));
  });

  test('static table method - createRows', function (assert) {
    let rows = Table.createRows([{}, {}], { selected: true });
    assert.strictEqual(rows.length, 2);
    assert.ok(rows[0] instanceof Row);
    assert.ok(rows[1].get('selected'));
  });

  test('static table method - createColumn', function (assert) {
    let col = Table.createColumn({ label: 'Name' });
    assert.ok(col instanceof Column);
    assert.strictEqual(col.get('label'), 'Name');
  });

  test('static table method - createColumns', function (assert) {
    let cols = Table.createColumns([{}, {}]);
    assert.strictEqual(cols.length, 2);
    assert.ok(cols[0] instanceof Column);
  });

  test('table modifications - simple', function (assert) {
    let rows = emberArray([]);
    let table = Table.create({ columns: [], rows });

    table.addRow({ firstName: 'Offir' });

    assert.strictEqual(table.get('rows.length'), 1);

    table.addRow({ firstName: 'Taras' });

    assert.strictEqual(table.get('rows.length'), 2);

    table.get('rows').clear();

    assert.strictEqual(table.get('rows.length'), 0);
  });

  test('table modifications - stress', function (assert) {
    let rows = emberArray([]);
    let table = Table.create({ columns: [], rows });

    for (let i = 0; i < 100; i++) {
      table.addRow({ position: i });
    }

    assert.strictEqual(table.get('rows.length'), 100);

    for (let i = 100; i < 200; i++) {
      table.addRow({ position: i });
    }

    assert.strictEqual(table.get('rows.length'), 200);

    table.removeRowAt(5);
    table.removeRowAt(10);
    table.removeRowAt(125);

    assert.strictEqual(table.get('rows.length'), 197);

    table.removeRowAt(10);
    table.removeRowAt(20);
    table.removeRowAt(150);

    assert.strictEqual(table.get('rows.length'), 194);

    table.get('rows').clear();

    assert.strictEqual(table.get('rows.length'), 0);
  });

  test('table modifications - sort', function (assert) {
    let rows = emberArray([]);
    let table = Table.create({ columns: [], rows, enableSync: true });
    let length = 5;

    for (let i = 0; i < length; i++) {
      table.addRow({ position: i });
    }

    assert.strictEqual(table.get('rows.length'), 5);

    table.rows.sort((a, b) => {
      return a.get('position') > b.get('position') ? -1 : 1;
    });

    assert.strictEqual(table.get('rows.length'), 5);

    table.rows.reverseObjects();

    assert.strictEqual(table.get('rows.length'), 5);
  });
});
