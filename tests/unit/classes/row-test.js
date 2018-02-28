import { Row } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Row', function() {
  test('create row - default options', function(assert) {
    let row = new Row();
    assert.ok(row);
    assert.equal(row.expanded, false);
    assert.equal(row.selected, false);
  });

  test('create row - row instance', function(assert) {
    let row = new Row({ foo: 'bar' });
    let row2 = new Row(row);
    assert.ok(row);
    assert.ok(row2);
    assert.equal(row, row2);
    assert.equal(row.get('foo'), 'bar');
    assert.equal(row2.get('foo'), 'bar');
  });

  test('reopen row', function(assert) {
    assert.equal(typeof Row.reopen, 'function', 'reopen is a function');
    assert.equal(typeof Row.reopenClass, 'function', 'reopenClass is a function');
  });
});
