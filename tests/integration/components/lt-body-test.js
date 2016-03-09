import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';

function createUsers(numUsers = 20) {
  server.createList('user', numUsers);
  return server.db.users;
}

const Columns = [{
  label: 'Avatar',
  valuePath: 'avatar',
  width: '60px',
  sortable: false,
  cellComponent: 'user-avatar'
}, {
  label: 'First Name',
  valuePath: 'firstName',
  width: '150px'
}, {
  label: 'Last Name',
  valuePath: 'lastName',
  width: '150px'
}, {
  label: 'Address',
  valuePath: 'address'
}, {
  label: 'State',
  valuePath: 'state'
}, {
  label: 'Country',
  valuePath: 'country'
}];

moduleForComponent('lt-body', 'Integration | Component | lt body', {
  integration: true,
  setup: function() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

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

test('row expansion', function(assert) {
  this.set('table', new Table(Columns, createUsers(1)));
  this.set('canExpand', false);

  this.render(hbs `
    {{#lt-body table=table canExpand=canExpand as |b|}}
      {{#b.expanded-row}} Hello {{/b.expanded-row}}
    {{/lt-body}}
  `);

  let row = this.$('tr:first');

  assert.ok(!row.hasClass('is-expandable'));
  row.click();
  assert.equal(this.$('tr.lt-expanded-row').length, 0);
  assert.equal(this.$('tbody > tr').length, 1);

  this.set('canExpand', true);

  assert.ok(row.hasClass('is-expandable'));
  row.click();
  assert.equal(this.$('tr.lt-expanded-row').length, 1);
  assert.equal(this.$('tbody > tr').length, 2);
  assert.equal(this.$('tr.lt-expanded-row').text().trim(), 'Hello');
});


