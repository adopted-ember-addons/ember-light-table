import Ember from 'ember';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';
import { module, test } from 'qunit';

module('Unit | Mixin | table header');

// Replace this with your real tests.
test('it works', function(assert) {
  let TableHeaderObject = Ember.Object.extend(TableHeaderMixin);
  let subject = TableHeaderObject.create();
  assert.ok(subject);
});
