import { Column } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Column', function() {
  test('create column - default options', function(assert) {
    let col = Column.create();
    assert.ok(col);
    assert.equal(col.hidden, false);
    assert.equal(col.ascending, true);
    assert.equal(col.sortable, true);
    assert.equal(col.sorted, false);
    assert.equal(col.sorted, false);
    assert.equal(col.label, '');
    assert.deepEqual(col.subColumns, []);
    assert.equal(col.component, null);
    assert.equal(col.cellComponent, null);
    assert.equal(col.valuePath, null);
    assert.equal(col.width, null);
  });

  test('reopen colum', function(assert) {
    assert.equal(typeof Column.reopen, 'function', 'reopen is a function');
    assert.equal(typeof Column.reopenClass, 'function', 'reopenClass is a function');
  });

  test('CP - isGroupColumn', function(assert) {
    let col = Column.create();
    assert.ok(col);
    assert.deepEqual(col.subColumns, []);
    assert.equal(col.get('isGroupColumn'), false);

    col.set('subColumns', [Column.create()]);
    assert.equal(col.subColumns.length, 1);
    assert.equal(col.get('isGroupColumn'), true);
  });

  test('CP - isVisibleGroupColumn', function(assert) {
    let col = Column.create({
      subColumns: [{}, {}]
    });
    assert.ok(col);
    assert.equal(col.subColumns.length, 2);
    assert.equal(col.get('isVisibleGroupColumn'), true);

    col.set('hidden', true);
    assert.equal(col.get('isVisibleGroupColumn'), false);

    col.set('hidden', false);
    assert.equal(col.get('isVisibleGroupColumn'), true);

    col.subColumns.setEach('hidden', true);
    assert.equal(col.get('isVisibleGroupColumn'), false);
  });

  test('CP - visibleSubColumns', function(assert) {
    let col = Column.create({
      subColumns: [{}, {}]
    });
    assert.ok(col);
    assert.equal(col.subColumns.length, 2);
    assert.equal(col.get('visibleSubColumns.length'), 2);

    col.subColumns[0].set('hidden', true);
    assert.equal(col.get('visibleSubColumns.length'), 1);

    col.set('hidden', true);
    assert.equal(col.get('visibleSubColumns.length'), 0);
  });

  test('subColumns / parent', function(assert) {
    let col = Column.create({
      subColumns: [{}]
    });
    assert.ok(col);
    assert.equal(col.subColumns.length, 1);

    assert.equal(col.subColumns[0].get('parent'), col);

  });
});
