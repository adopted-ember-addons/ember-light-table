import callAction from 'ember-light-table/utils/call-action';
import { test, module } from 'qunit';

module('Unit | Utility | call action');

test('it works', function(assert) {
  let done = assert.async();
  let obj = {
    attrs: {
      myAction(foo) {
        assert.ok(true);
        assert.equal(foo, 'foo');
        return done();
      }
    }
  };
  callAction(obj, 'myAction', 'foo');
});
