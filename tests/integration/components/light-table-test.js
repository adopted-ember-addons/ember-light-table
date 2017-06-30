import { findAll, find, scrollTo } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage, { createUsers } from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';
import Columns from '../../helpers/table-columns';
import hasClass from '../../helpers/has-class';
import RowComponent from 'ember-light-table/components/lt-row';
import { register } from 'ember-owner-test-utils/test-support/register';
import Ember from 'ember';

moduleForComponent('light-table', 'Integration | Component | light table', {
  integration: true,
  setup() {
    startMirage(this.container);
  }
});

test('it renders', function(assert) {
  this.set('table', new Table());
  this.render(hbs `{{light-table table}}`);

  assert.equal(find('*').textContent.trim(), '');
});

// TODO: Figure out why tests is failing in Phantom.js
skip('scrolled to bottom', async function(assert) {
  assert.expect(4);

  this.set('table', new Table(Columns, createUsers(50)));

  this.on('onScrolledToBottom', () => {
    assert.ok(true);
  });

  this.render(hbs `
    {{#light-table table height='40vh' as |t|}}
      {{t.head}}
      {{t.body onScrolledToBottom=(action 'onScrolledToBottom')}}
    {{/light-table}}
  `);

  assert.equal(findAll('tbody > tr').length, 50, '50 rows are rendered');

  let scrollContainer = '.tse-scroll-content';
  let { scrollHeight } = find(scrollContainer);

  assert.ok(findAll(scrollContainer).length > 0, 'scroll container was rendered');
  assert.equal(scrollHeight, 2500, 'scroll height is 2500');

  await scrollTo(scrollContainer, 0, scrollHeight);
});

test('fixed header', function(assert) {
  assert.expect(2);
  this.set('table', new Table(Columns, createUsers(5)));
  this.set('fixed', true);

  this.render(hbs `
    {{#light-table table height='500px' id='lightTable' as |t|}}
      {{t.head fixed=fixed}}
      {{t.body}}
    {{/light-table}}
  `);

  assert.equal(findAll('#lightTable_inline_head thead').length, 0);

  this.set('fixed', false);

  assert.equal(findAll('#lightTable_inline_head thead').length, 1);
});

test('fixed footer', function(assert) {
  assert.expect(2);
  this.set('table', new Table(Columns, createUsers(5)));
  this.set('fixed', true);

  this.render(hbs `
    {{#light-table table height='500px' id='lightTable' as |t|}}
      {{t.body}}
      {{t.foot fixed=fixed}}
    {{/light-table}}
  `);

  assert.equal(findAll('#lightTable_inline_foot tfoot').length, 0);

  this.set('fixed', false);

  assert.equal(findAll('#lightTable_inline_foot tfoot').length, 1);
});

// TODO: Passes in Chrome but not in Phantom
skip('table assumes height of container', function(assert) {

  assert.expect(1);
  this.set('table', new Table(Columns, createUsers(5)));
  this.set('fixed', true);

  this.render(hbs `
    <div style="height: 500px">
      {{#light-table table id='lightTable' as |t|}}
        {{t.body}}
        {{t.foot fixed=fixed}}
      {{/light-table}}
    </div>
  `);

  assert.equal(find('#lightTable').offsetHeight, 500, 'table is 500px height');

});

// TODO: figure out why this test doesn't work properly in Phantomjs
skip('table body should consume all available space when not enough content to fill it', function(assert) {
  assert.expect(3);

  this.set('table', new Table(Columns, createUsers(1)));
  this.set('fixed', true);

  this.render(hbs `
    <div style="height: 500px">
      {{#light-table table id='lightTable' as |t|}}
        {{t.head fixed=true}}
        {{t.body}}
        {{#t.foot fixed=true}}
          Hello World
        {{/t.foot}}
      {{/light-table}}
    </div>
  `);
  assert.equal(find('.lt-head-wrap').offsetHeight, 42, 'header is 42px tall');
  assert.equal(find('.lt-body-wrap').offsetHeight, 438, 'body is 438px tall');
  assert.equal(find('.lt-foot-wrap').offsetHeight, 20, 'header is 20px tall');

});

test('accepts components that are used in the body', function(assert) {

  register(this, 'component:custom-row', RowComponent);

  this.set('table', new Table(Columns, createUsers(1)));

  this.render(hbs `
    {{#light-table table as |t|}}
      {{t.body rowComponent=(component "custom-row" classNames="custom-row")}}
    {{/light-table}}
  `);

  assert.equal(findAll('.lt-row.custom-row').length, 1, 'row has custom-row class');
});

test('passed in components can have computed properties', function(assert) {

  register(this, 'component:custom-row', RowComponent.extend({
    classNameBindings: ['isActive'],
    current: null,
    isActive: Ember.computed('row.content', 'current', function() {
      return this.get('row.content') === this.get('current');
    })
  }));

  let users = createUsers(3);
  this.set('table', new Table(Columns, users));

  this.render(hbs `
    {{#light-table table as |t|}}
      {{t.body
        rowComponent=(component "custom-row" classNames="custom-row" current=current)
      }}
    {{/light-table}}
  `);

  assert.equal(findAll('.custom-row').length, 3, 'three custom rows were rendered');
  assert.notOk(find('.custom-row.is-active'), 'none of the items are active');

  this.set('current', users[0]);
  let [firstRow] = findAll('.custom-row');
  assert.ok(hasClass(firstRow, 'is-active'), 'first custom row is active');

  this.set('current', users[2]);
  let [,, thirdRow] = findAll('.custom-row');
  assert.ok(hasClass(thirdRow, 'is-active'), 'third custom row is active');

  this.set('current', null);

  assert.notOk(find('.custom-row.is-active'), 'none of the items are active');
});

test('onScroll', async function(assert) {
  let table = new Table(Columns, createUsers(10));
  let expectedScroll = 50;

  this.setProperties({
    table,
    onScroll(actualScroll) {
      assert.ok(true, 'onScroll worked');
      assert.equal(actualScroll, expectedScroll, 'scroll position is correct');
    }
  });

  this.render(hbs `
    {{#light-table table height='40vh' as |t|}}
      {{t.head fixed=true}}
      {{t.body
        useVirtualScrollbar=true
        onScroll=onScroll
      }}
    {{/light-table}}
  `);

  await scrollTo('.tse-scroll-content', 0, expectedScroll);
});
