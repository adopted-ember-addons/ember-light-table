import { Row } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Row', function() {
  test('create row - default options', function(assert) {
    let row = Row.create();
    assert.ok(row);
    assert.equal(row.expanded, false);
    assert.equal(row.selected, false);
  });

  test('reopen row', function(assert) {
    assert.equal(typeof Row.reopen, 'function', 'reopen is a function');
    assert.equal(typeof Row.reopenClass, 'function', 'reopenClass is a function');
  });
});
