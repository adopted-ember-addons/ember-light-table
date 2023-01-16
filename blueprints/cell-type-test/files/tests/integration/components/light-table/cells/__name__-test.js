import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Row, Column } from 'ember-light-table';

module('Integration | Component | Cells | <%= dasherizedModuleName %>', (hooks) => {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{light-table/cells/<%= dasherizedModuleName %>}}`);
    assert.strictEqual(this.element.textContent.trim(), '');
  });

  test('it renders value', async function (assert) {
    this.set('column', Column.create({ valuePath: 'foo' }));
    this.set('row', Row.create({ content: { foo: 'bar' } }));

    await render(hbs`{{light-table/cells/<%= dasherizedModuleName %> column row rawValue=(get row column.valuePath)}}`);

    assert.strictEqual(this.element.textContent.trim(), 'bar');
  });
});

