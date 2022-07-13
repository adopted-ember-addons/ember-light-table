import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lt scrollable', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{lt-scrollable}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#lt-scrollable}}
        template block text
      {{/lt-scrollable}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
