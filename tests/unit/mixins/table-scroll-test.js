import Ember from 'ember';
import TableScrollMixin from 'ember-light-table/mixins/table-scroll';
import { module, test } from 'qunit';

module('Unit | Mixin | table scroll');

// Replace this with your real tests.
test('it works', function(assert) {
  let TableScrollObject = Ember.Object.extend(TableScrollMixin);
  let subject = TableScrollObject.create();
  assert.ok(subject);
});
