import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lt infinity', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.enterViewport = () => {};
    this.exitViewport = () => {};
    await render(hbs`{{lt-infinity enterViewport=enterViewport exitViewport=exitViewport}}`);
    assert.dom('*').hasText('');
  });
});
