import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lt infinity', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.inViewport = () => {};
    this.exitViewport = () => {};
    await render(hbs`{{lt-infinity inViewport=inViewport exitViewport=exitViewport}}`);
    assert.equal(find('*').textContent.trim(), '');
  });
});
