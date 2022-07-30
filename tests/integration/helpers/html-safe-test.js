import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | html-safe', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders styles', async function (assert) {
    this.set('inputValue', 21);

    await render(hbs`{{html-safe (concat "width: " this.inputValue)}}`);

    assert.dom(this.element).hasText('width: 21');
  });

  test('it renders classes', async function (assert) {
    this.set('inputValue', 'red-outline');

    await render(
      hbs`<button class="btn {{html-safe this.inputValue}}" type="button">Push me</button>`
    );

    assert.dom('button').hasClass('red-outline');
  });
});
