import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import { Row, Column } from 'ember-light-table';

module('Integration | Component | Cells | base', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('column', new Column());
    await render(hbs`{{light-table/cells/base column=column}}`);

    assert.equal(find('*').textContent.trim(), '');
  });

  test('cell with column format', async function(assert) {
    this.set('column', new Column({
      valuePath: 'num',
      format(value) {
        return value * 2;
      }
    }));

    this.set('row', new Row());

    await render(hbs`{{light-table/cells/base column row rawValue=2}}`);

    assert.equal(find('*').textContent.trim(), '4');
  });

  test('cell format with no valuePath', async function(assert) {
    this.set('column', new Column({
      format() {
        return this.get('row.num') * 2;
      }
    }));

    this.set('row', new Row({
      num: 2
    }));

    await render(hbs`{{light-table/cells/base column row}}`);

    assert.equal(find('*').textContent.trim(), '4');
  });

  test('cell with nested valuePath', async function(assert) {
    this.set('column', new Column({
      valuePath: 'foo.bar.baz',
      format(value) {
        return value * 2;
      }
    }));

    this.set('row', new Row({
      foo: {
        bar: {
          baz: 2
        }
      }
    }));

    await render(hbs`{{light-table/cells/base column row rawValue=(get row column.valuePath)}}`);

    assert.equal(find('*').textContent.trim(), '4');

    run(() => this.get('row').set(this.get('column.valuePath'), 4));

    assert.equal(find('*').textContent.trim(), '8');
  });
});