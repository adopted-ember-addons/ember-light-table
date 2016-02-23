import { Column } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Column');

test('create column - no options', function(assert) {
  let col = new Column();
  assert.ok(col);
  assert.equal(col.hidden, false);
  assert.equal(col.ascending, true);
  assert.equal(col.sortable, true);
  assert.equal(col.sorted, false);
  assert.equal(col.sorted, false);
  assert.equal(col.label, '');
  assert.equal(col.align, 'left');
});

test('create column - column instance', function(assert) {
  let col = new Column({ label: 'Name' });
  let col2 = new Column(col);
  assert.ok(col);
  assert.ok(col2);
  assert.equal(col, col2);
  assert.equal(col.label, 'Name');
  assert.equal(col2.label, 'Name');
});

test('computed properties - isGroupColumn', function(assert) {
  let col = new Column();
  assert.ok(col);
  assert.equal(col.subColumns, null);
  assert.equal(col.get('isGroupColumn'), false);

  col.set('subColumns', [new Column()]);
  assert.equal(col.subColumns.length, 1);
  assert.equal(col.get('isGroupColumn'), true);
});

