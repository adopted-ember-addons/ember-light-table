import { click, findAll, find, triggerEvent } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import startMirage, { createUsers } from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';
import hasClass from '../../helpers/has-class';
import Columns from '../../helpers/table-columns';
import { run } from '@ember/runloop';

module('Integration | Component | lt body', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    this.set('sharedOptions', {
      fixedHeader: false,
      fixedFooter: false
    });

    startMirage(this.container);
  });

  test('it renders', async function(assert) {
    await render(hbs `{{lt-body sharedOptions=sharedOptions}}`);
    assert.equal(find('*').textContent.trim(), '');
  });

  test('row selection - enable or disable', async function(assert) {
    this.set('table', new Table(Columns, createUsers(1)));
    this.set('canSelect', false);

    await render(hbs `{{lt-body table=table sharedOptions=sharedOptions canSelect=canSelect}}`);

    let row = find('tr');

    assert.notOk(hasClass(row, 'is-selectable'));
    assert.notOk(hasClass(row, 'is-selected'));
    click(row);
    assert.notOk(hasClass(row, 'is-selected'));

    this.set('canSelect', true);

    assert.ok(hasClass(row, 'is-selectable'));
    assert.notOk(hasClass(row, 'is-selected'));
    click(row);
    assert.ok(hasClass(row, 'is-selected'));
  });

  test('row selection - ctrl-click to modify selection', async function(assert) {
    this.set('table', new Table(Columns, createUsers(5)));

    await render(hbs `{{lt-body table=table sharedOptions=sharedOptions canSelect=true multiSelect=true}}`);
    let firstRow = find('tr:first-child');
    let middleRow = find('tr:nth-child(4)');
    let lastRow = find('tr:last-child');

    assert.equal(findAll('tbody > tr').length, 5);

    click(firstRow);
    assert.equal(findAll('tr.is-selected').length, 1, 'clicking a row selects it');

    click(lastRow, { shiftKey: true });
    assert.equal(findAll('tr.is-selected').length, 5, 'shift-clicking another row selects it and all rows between');

    click(middleRow, { ctrlKey: true });
    assert.equal(findAll('tr.is-selected').length, 4, 'ctrl-clicking a selected row deselects it');

    click(firstRow);
    assert.equal(findAll('tr.is-selected').length, 0, 'clicking a selected row deselects all rows');
  });

  test('row selection - click to modify selection', async function(assert) {
    this.set('table', new Table(Columns, createUsers(5)));

    await render(
      hbs `{{lt-body table=table sharedOptions=sharedOptions canSelect=true multiSelect=true multiSelectRequiresKeyboard=false}}`
    );

    let firstRow = find('tr:first-child');
    let middleRow = find('tr:nth-child(4)');
    let lastRow = find('tr:last-child');

    assert.equal(findAll('tbody > tr').length, 5);

    click(firstRow);
    assert.equal(findAll('tr.is-selected').length, 1, 'clicking a row selects it');

    click(lastRow, { shiftKey: true });
    assert.equal(findAll('tr.is-selected').length, 5, 'shift-clicking another row selects it and all rows between');

    click(middleRow);
    assert.equal(findAll('tr.is-selected').length, 4, 'clicking a selected row deselects it without affecting other selected rows');

    click(middleRow);
    assert.equal(findAll('tr.is-selected').length, 5, 'clicking a deselected row selects it without affecting other selected rows');
  });

  test('row expansion', async function(assert) {
    this.set('table', new Table(Columns, createUsers(2)));
    this.set('canExpand', false);

    await render(hbs `
      {{#lt-body table=table sharedOptions=sharedOptions canSelect=false canExpand=canExpand multiRowExpansion=false as |b|}}
        {{#b.expanded-row}} Hello {{/b.expanded-row}}
      {{/lt-body}}
    `);

    let row = find('tr');

    assert.notOk(hasClass(row, 'is-expandable'));
    click(row);
    assert.equal(findAll('tr.lt-expanded-row').length, 0);
    assert.equal(findAll('tbody > tr').length, 2);
    assert.notOk(find('tr.lt-expanded-row'));

    this.set('canExpand', true);

    assert.ok(hasClass(row, 'is-expandable'));
    click(row);
    assert.equal(findAll('tr.lt-expanded-row').length, 1);
    assert.equal(findAll('tbody > tr').length, 3);
    assert.equal(row.nextElementSibling.textContent.trim(), 'Hello');

    let allRows = findAll('tr');
    row = allRows[allRows.length - 1];
    assert.ok(hasClass(row, 'is-expandable'));
    click(row);
    assert.equal(findAll('tr.lt-expanded-row').length, 1);
    assert.equal(findAll('tbody > tr').length, 3);
    assert.equal(row.nextElementSibling.textContent.trim(), 'Hello');
  });

  test('row expansion - multiple', async function(assert) {
    this.set('table', new Table(Columns, createUsers(2)));
    await render(hbs `
      {{#lt-body table=table sharedOptions=sharedOptions canExpand=true as |b|}}
        {{#b.expanded-row}} Hello {{/b.expanded-row}}
      {{/lt-body}}
    `);

    let rows = findAll('tr');
    assert.equal(rows.length, 2);

    rows.forEach((row) => {
      assert.ok(hasClass(row, 'is-expandable'));
      click(row);
      assert.equal(row.nextElementSibling.textContent.trim(), 'Hello');
    });

    assert.equal(findAll('tr.lt-expanded-row').length, 2);
  });

  test('row actions', async function(assert) {
    assert.expect(2);

    this.set('table', new Table(Columns, createUsers(1)));
    this.actions.onRowClick = (row) => assert.ok(row);
    this.actions.onRowDoubleClick = (row) => assert.ok(row);
    await render(
      hbs `{{lt-body table=table sharedOptions=sharedOptions onRowClick=(action 'onRowClick') onRowDoubleClick=(action 'onRowDoubleClick')}}`
    );

    let row = find('tr');
    click(row);
    triggerEvent(row, 'dblclick');
  });

  test('hidden rows', async function(assert) {
    this.set('table', new Table(Columns, createUsers(5)));

    await render(hbs `{{lt-body table=table sharedOptions=sharedOptions}}`);

    assert.equal(findAll('tbody > tr').length, 5);

    run(() => {
      this.get('table.rows').objectAt(0).set('hidden', true);
      this.get('table.rows').objectAt(1).set('hidden', true);
    });

    assert.equal(findAll('tbody > tr').length, 3);

    run(() => {
      this.get('table.rows').objectAt(0).set('hidden', false);
    });

    assert.equal(findAll('tbody > tr').length, 4);
  });

  test('scaffolding', async function(assert) {
    const users = createUsers(1);
    this.set('table', new Table(Columns, users));

    await render(hbs `{{lt-body table=table sharedOptions=sharedOptions enableScaffolding=true}}`);

    const [scaffoldingRow, userRow] = findAll('tr');
    const userCells = findAll('.lt-cell', userRow);

    assert.ok(hasClass(scaffoldingRow, 'lt-scaffolding-row'), 'the first row of the <tbody> is a scaffolding row');
    assert.notOk(hasClass(userRow, 'lt-scaffolding-row'), 'the second row of the <tbody> is not a scaffolding row');

    assert.notOk(userRow.hasAttribute('style'), 'the second row of the <tbody> has no `style` attribute');

    assert.ok(
      Columns.map((c, i) => {
        const configuredWidth = Number.parseInt(c.width, 10);
        const actualWidth = Number.parseInt(userCells[i].style.width);
        return configuredWidth ? configuredWidth === actualWidth : true;
      }).every(Boolean),
      'the first actual data row has the correct widths assigned'
    );
  });

  test('overwrite', async function(assert) {
    this.set('table', new Table(Columns, createUsers(5)));

    await render(hbs `
      {{#lt-body table=table sharedOptions=sharedOptions overwrite=true as |columns rows|}}
        {{columns.length}}, {{rows.length}}
      {{/lt-body}}
    `);

    assert.equal(find('*').textContent.trim(), '6, 5');
  });
});
