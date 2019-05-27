import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Column } from 'ember-light-table';

module('Integration | Component | Columns | base', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"
    this.set('column', Column.create());
    await render(hbs`{{light-table/columns/base column=column}}`);
    assert.equal(find('*').textContent.trim(), '');
  });
});
