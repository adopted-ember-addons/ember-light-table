import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lt spanned row', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{lt-spanned-row}}`);
    assert.dom(this.element).hasText('');

    await render(hbs`
      {{#lt-spanned-row}}
        template block text
      {{/lt-spanned-row}}
    `);

    assert.dom(this.element).hasText('template block text');
  });

  test('visiblity', async function (assert) {
    this.set('visible', true);

    await render(hbs`
      {{#lt-spanned-row visible=this.visible}}
        template block text
      {{/lt-spanned-row}}
    `);
    assert.dom(this.element).hasText('template block text');

    this.set('visible', false);
    assert.dom(this.element).hasText('');
  });

  test('colspan', async function (assert) {
    await render(hbs`
      {{#lt-spanned-row colspan=4}}
        template block text
      {{/lt-spanned-row}}
    `);
    assert.dom(this.element).hasText('template block text');
    assert.dom('td').hasAttribute('colspan', '4');
  });

  test('yield', async function (assert) {
    await render(hbs`
      {{#lt-spanned-row yield=(hash name="Offir") as |row|}}
        {{row.name}}
      {{/lt-spanned-row}}
    `);
    assert.dom(this.element).hasText('Offir');
  });
});
