import { table } from 'dummy/helpers/table';
import { module, test } from 'qunit';
import Table from 'ember-light-table/classes/Table';

module('Unit | Helper | table');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = table([ [], [] ]);
  assert.ok(result);
  assert.ok(result instanceof Table);
});
