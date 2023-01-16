import { Column } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Column', function () {
  test('create column - default options', function (assert) {
    let col = Column.create();
    assert.ok(col);
    assert.false(col.hidden);
    assert.true(col.ascending);
    assert.true(col.sortable);
    assert.false(col.sorted);
    assert.false(col.sorted);
    assert.strictEqual(col.label, '');
    assert.deepEqual(col.subColumns, []);
    assert.strictEqual(col.component, null);
    assert.strictEqual(col.cellComponent, null);
    assert.strictEqual(col.valuePath, null);
    assert.strictEqual(col.width, null);
  });

  test('CP - isGroupColumn', function (assert) {
    let col = Column.create();
    assert.ok(col);
    assert.deepEqual(col.subColumns, []);
    assert.false(col.get('isGroupColumn'));

    col.set('subColumns', [Column.create()]);
    assert.strictEqual(col.subColumns.length, 1);
    assert.true(col.get('isGroupColumn'));
  });

  test('CP - isVisibleGroupColumn', function (assert) {
    let col = Column.create({
      subColumns: [{}, {}],
    });
    assert.ok(col);
    assert.strictEqual(col.subColumns.length, 2);
    assert.true(col.get('isVisibleGroupColumn'));

    col.set('hidden', true);
    assert.false(col.get('isVisibleGroupColumn'));

    col.set('hidden', false);
    assert.true(col.get('isVisibleGroupColumn'));

    col.subColumns.setEach('hidden', true);
    assert.false(col.get('isVisibleGroupColumn'));
  });

  test('CP - visibleSubColumns', function (assert) {
    let col = Column.create({
      subColumns: [{}, {}],
    });
    assert.ok(col);
    assert.strictEqual(col.subColumns.length, 2);
    assert.strictEqual(col.get('visibleSubColumns.length'), 2);

    col.subColumns[0].set('hidden', true);
    assert.strictEqual(col.get('visibleSubColumns.length'), 1);

    col.set('hidden', true);
    assert.strictEqual(col.get('visibleSubColumns.length'), 0);
  });

  test('subColumns / parent', function (assert) {
    let col = Column.create({
      subColumns: [{}],
    });
    assert.ok(col);
    assert.strictEqual(col.subColumns.length, 1);

    assert.strictEqual(col.subColumns[0].get('parent'), col);
  });
});
