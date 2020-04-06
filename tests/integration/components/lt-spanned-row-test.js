import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lt spanned row', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{lt-spanned-row}}`);
    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      {{#lt-spanned-row}}
        template block text
      {{/lt-spanned-row}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('visiblity', async function(assert) {
    this.set('visible', true);

    await render(hbs`
      {{#lt-spanned-row visible=visible}}
        template block text
      {{/lt-spanned-row}}
    `);
    assert.equal(this.element.textContent.trim(), 'template block text');

    this.set('visible', false);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('colspan', async function(assert) {
    await render(hbs`
      {{#lt-spanned-row colspan=4}}
        template block text
      {{/lt-spanned-row}}
    `);
    assert.equal(this.element.textContent.trim(), 'template block text');
    assert.equal(find('td').getAttribute('colspan'), 4);
  });

  test('yield', async function(assert) {

    await render(hbs`
      {{#lt-spanned-row yield=(hash name="Offir") as |row|}}
        {{row.name}}
      {{/lt-spanned-row}}
    `);
    assert.equal(this.element.textContent.trim(), 'Offir');
  });
});
