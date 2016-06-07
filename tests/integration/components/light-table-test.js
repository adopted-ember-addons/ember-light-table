import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage, { createUsers } from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';
import Columns from '../../helpers/table-columns';

moduleForComponent('light-table', 'Integration | Component | light table', {
  integration: true,
  setup: function() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  this.set('table', new Table());
  this.render(hbs`{{light-table table}}`);

  assert.equal(this.$().text().trim(), '');
});

// TODO: Figure out why this test fails in Phantomjs
// test('scrolled to bottom', function(assert) {
//   assert.expect(4);
//   let done = assert.async();

//   this.set('table', new Table(Columns, createUsers(50)));

//   this.on('onScrolledToBottom', () => { assert.ok(true); });

//   this.render(hbs`
//     {{#light-table table height='40vh' as |t|}}
//       {{t.head}}
//       {{t.body onScrolledToBottom=(action 'onScrolledToBottom')}}
//     {{/light-table}}
//   `);

//   assert.equal(this.$('tbody > tr').length, 50, '50 rows are rendered');

//   let scrollContainer = '.tse-scroll-content';
//   let scrollHeight = this.$(scrollContainer).prop('scrollHeight');

//   assert.ok(this.$(scrollContainer).length > 0, 'scroll container was rendered');
//   assert.equal(scrollHeight, 2500, 'scroll height is 2500');

//   this.$(scrollContainer).animate({
//     scrollTop: scrollHeight
//   }, 0);

//   Ember.run.later(done, 1500);
// });


test('fixed header', function(assert) {
  assert.expect(2);
  this.set('table', new Table(Columns, createUsers(5)));
  this.set('fixed', true);

  this.render(hbs`
    {{#light-table table id='lightTable' as |t|}}
      {{t.head fixed=fixed}}
      {{t.body}}
    {{/light-table}}
  `);

  assert.equal(this.$('#lightTable_inline_head thead').length, 0);

  this.set('fixed', false);

  assert.equal(this.$('#lightTable_inline_head thead').length, 1);
});

test('fixed footer', function(assert) {
  assert.expect(2);
  this.set('table', new Table(Columns, createUsers(5)));
  this.set('fixed', true);

  this.render(hbs`
    {{#light-table table id='lightTable' as |t|}}
      {{t.body}}
      {{t.foot fixed=fixed}}
    {{/light-table}}
  `);

  assert.equal(this.$('#lightTable_inline_foot tfoot').length, 0);

  this.set('fixed', false);

  assert.equal(this.$('#lightTable_inline_foot tfoot').length, 1);
});
