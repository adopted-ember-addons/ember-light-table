import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage, { createUsers } from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';
import createClickEvent from '../../helpers/create-click-event';
import Columns from '../../helpers/table-columns';

const {
  run
} = Ember;

moduleForComponent('lt-body', 'Integration | Component | lt body', {
  integration: true,
  beforeEach() {
    this.set('sharedOptions', {
      fixedHeader: false,
      fixedFooter: false
    });

    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  this.render(hbs `{{lt-body sharedOptions=sharedOptions}}`);
  assert.equal(this.$().text().trim(), '');
});

test('row selection - enable or disable', function(assert) {
  this.set('table', new Table(Columns, createUsers(1)));
  this.set('canSelect', false);

  this.render(hbs `{{lt-body table=table sharedOptions=sharedOptions canSelect=canSelect}}`);

  let row = this.$('tr:first');

  assert.ok(!row.hasClass('is-selectable'));
  assert.ok(!row.hasClass('is-selected'));
  row.click();
  assert.ok(!row.hasClass('is-selected'));

  this.set('canSelect', true);

  assert.ok(row.hasClass('is-selectable'));
  assert.ok(!row.hasClass('is-selected'));
  row.click();
  assert.ok(row.hasClass('is-selected'));
});

test('row selection - ctrl-click to modify selection', function(assert) {
  this.set('table', new Table(Columns, createUsers(5)));

  this.render(hbs `{{lt-body table=table sharedOptions=sharedOptions canSelect=true multiSelect=true}}`);

  let firstRow = this.$('tr:first');
  let middleRow = this.$('tr:nth-of-type(3)');
  let lastRow = this.$('tr:last');

  assert.equal(this.$('tbody > tr').length, 5);

  firstRow.click();
  assert.equal(this.$('tr.is-selected').length, 1, 'clicking a row selects it');

  lastRow.trigger(createClickEvent({
    shiftKey: true
  }));
  assert.equal(this.$('tr.is-selected').length, 5, 'shift-clicking another row selects it and all rows between');

  middleRow.trigger(createClickEvent({
    ctrlKey: true
  }));
  assert.equal(this.$('tr.is-selected').length, 4, 'ctrl-clicking a selected row deselects it');

  firstRow.click();
  assert.equal(this.$('tr.is-selected').length, 0, 'clicking a selected row deselects all rows');
});

test('row selection - click to modify selection', function(assert) {
  this.set('table', new Table(Columns, createUsers(5)));

  this.render(hbs `{{lt-body table=table sharedOptions=sharedOptions canSelect=true multiSelect=true multiSelectRequiresKeyboard=false}}`);

  let firstRow = this.$('tr:first');
  let middleRow = this.$('tr:nth-of-type(3)');
  let lastRow = this.$('tr:last');

  assert.equal(this.$('tbody > tr').length, 5);

  firstRow.click();
  assert.equal(this.$('tr.is-selected').length, 1, 'clicking a row selects it');

  lastRow.trigger(createClickEvent({
    shiftKey: true
  }));
  assert.equal(this.$('tr.is-selected').length, 5, 'shift-clicking another row selects it and all rows between');

  middleRow.click();
  assert.equal(this.$('tr.is-selected').length, 4, 'clicking a selected row deselects it without affecting other selected rows');

  middleRow.click();
  assert.equal(this.$('tr.is-selected').length, 5, 'clicking a deselected row selects it without affecting other selected rows');
});

test('row expansion', function(assert) {
  this.set('table', new Table(Columns, createUsers(2)));
  this.set('canExpand', false);

  this.render(hbs `
    {{#lt-body table=table sharedOptions=sharedOptions canSelect=false canExpand=canExpand multiRowExpansion=false as |b|}}
      {{#b.expanded-row}} Hello {{/b.expanded-row}}
    {{/lt-body}}
  `);

  let row = this.$('tr:first');

  assert.ok(!row.hasClass('is-expandable'));
  row.click();
  assert.equal(this.$('tr.lt-expanded-row').length, 0);
  assert.equal(this.$('tbody > tr').length, 2);
  assert.equal(this.$('tr.lt-expanded-row').text().trim(), '');

  this.set('canExpand', true);

  assert.ok(row.hasClass('is-expandable'));
  row.click();
  assert.equal(this.$('tr.lt-expanded-row').length, 1);
  assert.equal(this.$('tbody > tr').length, 3);
  assert.equal(row.next().text().trim(), 'Hello');

  row = this.$('tr:last');
  assert.ok(row.hasClass('is-expandable'));
  row.click();
  assert.equal(this.$('tr.lt-expanded-row').length, 1);
  assert.equal(this.$('tbody > tr').length, 3);
  assert.equal(row.next().text().trim(), 'Hello');
});

test('row expansion - multiple', function(assert) {
  this.set('table', new Table(Columns, createUsers(2)));
  this.render(hbs `
    {{#lt-body table=table sharedOptions=sharedOptions canExpand=true as |b|}}
      {{#b.expanded-row}} Hello {{/b.expanded-row}}
    {{/lt-body}}
  `);

  let rows = this.$('tr');
  assert.equal(rows.length, 2);

  rows.each((i, r) => {
    let row = $(r);
    assert.ok(row.hasClass('is-expandable'));
    row.click();
    assert.equal(row.next().text().trim(), 'Hello');
  });

  assert.equal(this.$('tr.lt-expanded-row').length, 2);
});

test('row actions', function(assert) {
  assert.expect(2);

  this.set('table', new Table(Columns, createUsers(1)));
  this.on('onRowClick', (row) => assert.ok(row));
  this.on('onRowDoubleClick', (row) => assert.ok(row));
  this.render(hbs `{{lt-body table=table sharedOptions=sharedOptions onRowClick=(action 'onRowClick') onRowDoubleClick=(action 'onRowDoubleClick')}}`);

  let row = this.$('tr:first');
  row.click();
  row.dblclick();
});

test('hidden rows', function(assert) {
  this.set('table', new Table(Columns, createUsers(5)));

  this.render(hbs `{{lt-body table=table sharedOptions=sharedOptions}}`);

  assert.equal(this.$('tbody > tr').length, 5);

  run(() => {
    this.get('table.rows').objectAt(0).set('hidden', true);
    this.get('table.rows').objectAt(1).set('hidden', true);
  });

  assert.equal(this.$('tbody > tr').length, 3);

  run(() => {
    this.get('table.rows').objectAt(0).set('hidden', false);
  });

  assert.equal(this.$('tbody > tr').length, 4);
});

test('overwrite', function(assert) {
  this.set('table', new Table(Columns, createUsers(5)));

  this.render(hbs `
    {{#lt-body table=table sharedOptions=sharedOptions overwrite=true as |columns rows|}}
      {{columns.length}}, {{rows.length}}
    {{/lt-body}}
  `);

  assert.equal(this.$().text().trim(), '6, 5');
});
