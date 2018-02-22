import EmberObject from '@ember/object';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';
import { module, test } from 'qunit';

module('Unit | Mixin | table header', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let TableHeaderObject = EmberObject.extend(TableHeaderMixin);
    let subject = TableHeaderObject.create();
    assert.ok(subject);
  });
});
