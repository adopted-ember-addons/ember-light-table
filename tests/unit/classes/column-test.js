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
    assert.equal(col.label, '');
    assert.deepEqual(col.subColumns, []);
    assert.equal(col.component, null);
    assert.equal(col.cellComponent, null);
    assert.equal(col.valuePath, null);
    assert.equal(col.width, null);
  });

  test('reopen colum', function (assert) {
    assert.equal(typeof Column.reopen, 'function', 'reopen is a function');
    assert.equal(
      typeof Column.reopenClass,
      'function',
      'reopenClass is a function'
    );
  });

  test('CP - isGroupColumn', function (assert) {
    let col = Column.create();
    assert.ok(col);
    assert.deepEqual(col.subColumns, []);
    assert.false(col.get('isGroupColumn'));

    col.set('subColumns', [Column.create()]);
    assert.equal(col.subColumns.length, 1);
    assert.true(col.get('isGroupColumn'));
  });

  test('CP - isVisibleGroupColumn', function (assert) {
    let col = Column.create({
      subColumns: [{}, {}],
    });
    assert.ok(col);
    assert.equal(col.subColumns.length, 2);
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
    assert.equal(col.subColumns.length, 2);
    assert.equal(col.get('visibleSubColumns.length'), 2);

    col.subColumns[0].set('hidden', true);
    assert.equal(col.get('visibleSubColumns.length'), 1);

    col.set('hidden', true);
    assert.equal(col.get('visibleSubColumns.length'), 0);
  });

  test('subColumns / parent', function (assert) {
    let col = Column.create({
      subColumns: [{}],
    });
    assert.ok(col);
    assert.equal(col.subColumns.length, 1);

    assert.equal(col.subColumns[0].get('parent'), col);
  });
});
