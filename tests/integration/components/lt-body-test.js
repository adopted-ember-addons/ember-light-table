import {
  click,
  findAll,
  find,
  triggerEvent,
  render,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import Table from 'ember-light-table';
import hasClass from '../../helpers/has-class';
import Columns from '../../helpers/table-columns';
import { run } from '@ember/runloop';
import { all } from 'rsvp';

module('Integration | Component | lt body', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function () {
    this.set('sharedOptions', {
      fixedHeader: false,
      fixedFooter: false,
    });
  });

  test('it renders', async function (assert) {
    await render(
      hbs`{{lt-body sharedOptions=this.sharedOptions tableId="light-table"}}`
    );
    assert.dom('*').hasText('');
  });

  test('row selection - enable or disable', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 1),
      })
    );
    this.set('canSelect', false);

    await render(
      hbs`
      {{lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        canSelect=this.canSelect 
        tableId="light-table"
      }}`
    );

    let row = find('tr');

    assert.notOk(hasClass(row, 'is-selectable'));
    assert.notOk(hasClass(row, 'is-selected'));
    await click(row);
    assert.notOk(hasClass(row, 'is-selected'));

    this.set('canSelect', true);

    assert.ok(hasClass(row, 'is-selectable'));
    assert.notOk(hasClass(row, 'is-selected'));
    await click(row);
    assert.ok(hasClass(row, 'is-selected'));
  });

  test('row selection - ctrl-click to modify selection', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );

    await render(
      hbs`
      {{lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        canSelect=true 
        multiSelect=true 
        tableId="light-table"
      }}`
    );
    let firstRow = find('tr:first-child');
    let middleRow = find('tr:nth-child(4)');
    let lastRow = find('tr:last-child');

    assert.dom('tbody > tr').exists({ count: 5 });

    await click(firstRow);
    assert
      .dom('tr.is-selected')
      .exists({ count: 1 }, 'clicking a row selects it');

    await click(lastRow, { shiftKey: true });
    assert
      .dom('tr.is-selected')
      .exists(
        { count: 5 },
        'shift-clicking another row selects it and all rows between'
      );

    await click(middleRow, { ctrlKey: true });
    assert
      .dom('tr.is-selected')
      .exists({ count: 4 }, 'ctrl-clicking a selected row deselects it');

    await click(firstRow);
    assert
      .dom('tr.is-selected')
      .doesNotExist('clicking a selected row deselects all rows');
  });

  test('row selection - click to modify selection', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );

    await render(
      hbs`
      {{lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        canSelect=true 
        multiSelect=true 
        multiSelectRequiresKeyboard=false 
        tableId="light-table"
      }}`
    );

    let firstRow = find('tr:first-child');
    let middleRow = find('tr:nth-child(4)');
    let lastRow = find('tr:last-child');

    assert.dom('tbody > tr').exists({ count: 5 });

    await click(firstRow);
    assert
      .dom('tr.is-selected')
      .exists({ count: 1 }, 'clicking a row selects it');

    await click(lastRow, { shiftKey: true });
    assert
      .dom('tr.is-selected')
      .exists(
        { count: 5 },
        'shift-clicking another row selects it and all rows between'
      );

    await click(middleRow);
    assert
      .dom('tr.is-selected')
      .exists(
        { count: 4 },
        'clicking a selected row deselects it without affecting other selected rows'
      );

    await click(middleRow);
    assert
      .dom('tr.is-selected')
      .exists(
        { count: 5 },
        'clicking a deselected row selects it without affecting other selected rows'
      );
  });

  test('row expansion', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 2),
      })
    );
    this.set('canExpand', false);

    await render(hbs`
      {{#lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        canSelect=false 
        canExpand=this.canExpand 
        multiRowExpansion=false 
        tableId="light-table" as |b|
      }}
        {{#b.expanded-row}} Hello {{/b.expanded-row}}
      {{/lt-body}}
    `);

    let row = find('tr');

    assert.notOk(hasClass(row, 'is-expandable'));
    await click(row);
    assert.dom('tr.lt-expanded-row').doesNotExist();
    assert.dom('tbody > tr').exists({ count: 2 });
    assert.dom('tr.lt-expanded-row').doesNotExist();

    this.set('canExpand', true);

    assert.ok(hasClass(row, 'is-expandable'));
    await click(row);
    assert.dom('tr.lt-expanded-row').exists({ count: 1 });
    assert.dom('tbody > tr').exists({ count: 3 });
    assert.dom(row.nextElementSibling).hasText('Hello');

    let allRows = findAll('tr');
    row = allRows[allRows.length - 1];
    assert.ok(hasClass(row, 'is-expandable'));
    await click(row);
    assert.dom('tr.lt-expanded-row').exists({ count: 1 });
    assert.dom('tbody > tr').exists({ count: 3 });
    assert.dom(row.nextElementSibling).hasText('Hello');
  });

  test('row expansion - multiple', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 2),
      })
    );
    await render(hbs`
      {{#lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        canExpand=true 
        tableId="light-table" as |b|
      }}
        {{#b.expanded-row}} Hello {{/b.expanded-row}}
      {{/lt-body}}
    `);

    let rows = findAll('tr');
    assert.strictEqual(rows.length, 2);

    await all(
      rows.map(async (row) => {
        assert.ok(hasClass(row, 'is-expandable'));
        await click(row);
        assert.dom(row.nextElementSibling).hasText('Hello');
      })
    );

    assert.dom('tr.lt-expanded-row').exists({ count: 2 });
  });

  test('row actions', async function (assert) {
    assert.expect(2);

    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 1),
      })
    );
    this.actions.onRowClick = (row) => assert.ok(row);
    this.actions.onRowDoubleClick = (row) => assert.ok(row);
    await render(
      hbs`
      {{lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        onRowClick=(action 'onRowClick') 
        onRowDoubleClick=(action 'onRowDoubleClick') 
        tableId="light-table"
      }}`
    );

    let row = find('tr');
    await click(row);
    await triggerEvent(row, 'dblclick');
  });

  test('hidden rows', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );

    await render(
      hbs`
      {{lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        tableId="light-table"
      }}`
    );

    assert.dom('tbody > tr').exists({ count: 5 });

    run(() => {
      this.table.rows.objectAt(0).set('hidden', true);
      this.table.rows.objectAt(1).set('hidden', true);
    });

    assert.dom('tbody > tr').exists({ count: 3 });

    run(() => {
      this.table.rows.objectAt(0).set('hidden', false);
    });

    assert.dom('tbody > tr').exists({ count: 4 });
  });

  test('scaffolding', async function (assert) {
    const users = this.server.createList('user', 1);
    this.set('table', Table.create({ columns: Columns, rows: users }));

    await render(
      hbs`
      {{lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        enableScaffolding=true 
        tableId="light-table"
      }}`
    );

    const [scaffoldingRow, userRow] = findAll('tr');
    const userCells = userRow.querySelectorAll('.lt-cell');

    assert.ok(
      hasClass(scaffoldingRow, 'lt-scaffolding-row'),
      'the first row of the <tbody> is a scaffolding row'
    );
    assert.notOk(
      hasClass(userRow, 'lt-scaffolding-row'),
      'the second row of the <tbody> is not a scaffolding row'
    );

    assert.notOk(
      userRow.hasAttribute('style'),
      'the second row of the <tbody> has no `style` attribute'
    );

    assert.ok(
      Columns.map((c, i) => {
        const configuredWidth = Number.parseInt(c.width, 10);
        const actualWidth = Number.parseInt(userCells[i].style.width);
        return configuredWidth ? configuredWidth === actualWidth : true;
      }).every(Boolean),
      'the first actual data row has the correct widths assigned'
    );
  });

  test('overwrite', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );

    await render(hbs`
      {{#lt-body 
        table=this.table 
        sharedOptions=this.sharedOptions 
        overwrite=true 
        tableId="light-table" as |columns rows|
      }}
        {{columns.length}}, {{rows.length}}
      {{/lt-body}}
    `);

    assert.dom('*').hasText('6, 5');
  });
});
