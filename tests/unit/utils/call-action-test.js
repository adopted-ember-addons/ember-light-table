import callAction from 'ember-light-table/utils/call-action';
import { module, test } from 'qunit';

module('Unit | Utility | call action');

test('it works', function(assert) {
  let obj = {
    attrs: {
      myAction(foo) {
        assert.ok(true);
        assert.equal(foo, 'foo');
      }
    }
  };
  callAction.call(obj, 'myAction', 'foo');
});
