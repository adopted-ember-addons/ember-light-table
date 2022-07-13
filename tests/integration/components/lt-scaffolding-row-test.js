import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | lt-scaffolding-row', function (hooks) {
  setupRenderingTest(hooks);

  test('it has lt-scaffolding-row class', async function (assert) {
    await render(hbs`{{lt-scaffolding-row}}`);
    assert.dom('.lt-scaffolding-row').exists();
  });

  test('it renders <tr>', async function (assert) {
    await render(hbs`{{lt-scaffolding-row}}`);
    assert.dom('tr').exists();
  });

  test('it renders <td> for each column', async function (assert) {
    const columns = [
      {
        label: 'Avatar',
        valuePath: 'avatar',
        width: '60px',
        sortable: false,
        cellComponent: 'user-avatar',
      },
      {
        label: 'First Name',
        valuePath: 'firstName',
        width: '150px',
      },
      {
        label: 'Last Name',
        valuePath: 'lastName',
        width: '150px',
      },
      {
        label: 'Address',
        valuePath: 'address',
      },
      {
        label: 'State',
        valuePath: 'state',
      },
      {
        label: 'Country',
        valuePath: 'country',
      },
    ];
    this.set('columns', columns);
    await render(hbs`{{lt-scaffolding-row columns=this.columns}}`);
    assert.equal(findAll('td').length, columns.length);
  });
});
