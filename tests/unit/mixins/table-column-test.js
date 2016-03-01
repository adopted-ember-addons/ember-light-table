import Ember from 'ember';
import TableColumnMixin from '../../../mixins/table-column';
import { module, test } from 'qunit';

module('Unit | Mixin | table column');

// Replace this with your real tests.
test('it works', function(assert) {
  let TableColumnObject = Ember.Object.extend(TableColumnMixin);
  let subject = TableColumnObject.create();
  assert.ok(subject);
});
