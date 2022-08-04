import { Row } from 'ember-light-table';
import { module, test } from 'qunit';

module('Unit | Classes | Row', function () {
  test('create row - default options', function (assert) {
    let row = Row.create();
    assert.ok(row);
    assert.false(row.expanded);
    assert.false(row.selected);
  });
});
