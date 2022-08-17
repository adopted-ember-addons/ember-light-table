import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { Column } from 'ember-light-table';

module('Integration | Component | Columns | base', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"
    this.set('column', Column.create());
    await render(hbs`<LightTable::Columns::Base @column={{this.column}} />`);
    assert.dom('*').hasText('');
  });

  test('column alignment', async function (assert) {
    this.set(
      'column',
      Column.create({
        label: 'First Name',
        valuePath: 'firstName',
        align: 'left',
        width: '150px',
      })
    );

    await render(hbs`<LightTable::Columns::Base @column={{this.column}} />`);
    assert.dom('th').hasClass('align-left');

    this.set(
      'column',
      Column.create({
        label: 'Middle Name',
        valuePath: 'lastName',
        align: 'center',
        width: '150px',
      })
    );
    await render(hbs`<LightTable::Columns::Base @column={{this.column}} />`);
    assert.dom('th').hasClass('align-center');

    this.set(
      'column',
      Column.create({
        label: 'Last Name',
        valuePath: 'lastName',
        align: 'right',
        width: '150px',
      })
    );
    await render(hbs`<LightTable::Columns::Base @column={{this.column}} />`);
    assert.dom('th').hasClass('align-right');
  });
});
