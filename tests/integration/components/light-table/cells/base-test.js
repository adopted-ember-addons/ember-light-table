import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import { Row, Column } from 'ember-light-table';

module('Integration | Component | Cells | base', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('column', Column.create());
    await render(hbs`{{light-table/cells/base column=column}}`);

    assert.dom('*').hasText('');
  });

  test('cell with column format', async function (assert) {
    this.set(
      'column',
      Column.create({
        valuePath: 'num',
        format(value) {
          return value * 2;
        },
      })
    );

    this.set('row', Row.create());

    await render(hbs`{{light-table/cells/base column row rawValue=2}}`);

    assert.dom('*').hasText('4');
  });

  test('cell format with no valuePath', async function (assert) {
    this.set(
      'column',
      Column.create({
        format() {
          return this.row.get('num') * 2;
        },
      })
    );

    this.set('row', Row.create({ content: { num: 2 } }));

    await render(hbs`{{light-table/cells/base column row}}`);

    assert.dom('*').hasText('4');
  });

  test('cell with nested valuePath', async function (assert) {
    this.set(
      'column',
      Column.create({
        valuePath: 'foo.bar.baz',
        format(value) {
          return value * 2;
        },
      })
    );

    this.set(
      'row',
      Row.create({
        content: {
          foo: {
            bar: {
              baz: 2,
            },
          },
        },
      })
    );

    await render(
      hbs`{{light-table/cells/base column row rawValue=(get row column.valuePath)}}`
    );

    assert.dom('*').hasText('4');

    run(() => this.row.set(this.column.get('valuePath'), 4));

    assert.dom('*').hasText('8');
  });
});
