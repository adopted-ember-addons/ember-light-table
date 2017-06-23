import Ember from 'ember';
import fixProto from 'ember-light-table/utils/fix-proto';
import { module, test } from 'qunit';

const {
  Object: EmberObject
} = Ember;

module('Unit | Utility | fix proto');

/*
 * Running this test in an environment that does not need the polyfill doesn't
 * make any sense. The only relevent environments are IE <= 10.
 */

test('ES6 classes that extend `Ember.Object` can be reopened after `fixProto` was used on them', function(assert) {
  class DerivedClass extends EmberObject.extend() {}

  fixProto(DerivedClass);

  DerivedClass.reopenClass({
    someStaticMethod() {
      return true;
    }
  });
  assert.ok(DerivedClass.someStaticMethod(), 'reopenClass works');

  DerivedClass.reopen({
    someMethod() {
      return true;
    }
  });
  let instance = new DerivedClass();
  assert.ok(instance.someMethod(), 'reopen works');
});
