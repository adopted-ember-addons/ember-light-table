// https://github.com/DockYard/ember-composable-helpers/blob/master/tests/integration/helpers/compute-test.js

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{compute}}', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test("It calls an action and returns it's value", async function(assert) {
    this.actions.square = (x) => x * x;
    await render(hbs`{{compute (action "square") 4}}`);

    assert.equal(this.element.textContent.trim(), '16', '4 squared is 16');
  });
});
