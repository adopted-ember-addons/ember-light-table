import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage, { createUsers } from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';
import createClickEvent from '../../helpers/create-click-event';
import Columns from '../../helpers/table-columns';

moduleForComponent('lt-body', 'Integration | Component | lt body', {
  integration: true,
  setup: function() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  this.render(hbs `{{lt-body}}`);
  assert.equal(this.$().text().trim(), '');
});

test('row selection', function(assert) {
  this.set('table', new Table(Columns, createUsers(1)));
  this.set('canSelect', false);

  this.render(hbs `{{lt-body table=table canSelect=canSelect}}`);

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

test('row selection', function(assert) {
  this.set('table', new Table(Columns, createUsers(5)));

  this.render(hbs `{{lt-body table=table canSelect=true multiSelect=true}}`);

  let firstRow = this.$('tr:first');
  let middleRow = this.$('tr:nth-of-type(3)');
  let lastRow = this.$('tr:last');

  assert.equal(this.$('tbody > tr').length, 5);

  firstRow.click();
  assert.equal(this.$('tr.is-selected').length, 1);

  lastRow.trigger(createClickEvent({shiftKey: true}));
  assert.equal(this.$('tr.is-selected').length, 5);

  middleRow.trigger(createClickEvent({ctrlKey: true}));
  assert.equal(this.$('tr.is-selected').length, 4);

  firstRow.click();
  assert.equal(this.$('tr.is-selected').length, 0);
});

test('row expansion', function(assert) {
  this.set('table', new Table(Columns, createUsers(2)));
  this.set('canExpand', false);

  this.render(hbs `
    {{#lt-body table=table canSelect=false canExpand=canExpand multiRowExpansion=false as |b|}}
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
    {{#lt-body table=table canExpand=true as |b|}}
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
  this.set('table', new Table(Columns, createUsers(1)));
  this.on('onRowClick', row => assert.ok(row));
  this.on('onRowDoubleClick', row => assert.ok(row));
  this.render(hbs `{{lt-body table=table onRowClick=(action 'onRowClick') onRowDoubleClick=(action 'onRowDoubleClick')}}`);

  let row = this.$('tr:first');
  row.click();
  row.dblclick();
});


