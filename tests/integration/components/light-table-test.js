import { moduleForComponent, test } from 'ember-qunit';
import { skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage, { createUsers } from '../../helpers/setup-mirage-for-integration';
import Table from 'ember-light-table';
import Columns from '../../helpers/table-columns';
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

  assert.equal(this.$().text().trim(), '');
});

// TODO: Figure out why tests is failing in Phantom.js
skip('scrolled to bottom', function(assert) {
  assert.expect(4);
  let done = assert.async();

  this.set('table', new Table(Columns, createUsers(50)));

  this.on('onScrolledToBottom', () => {
    assert.ok(true);
    done();
  });

  this.render(hbs `
    {{#light-table table height='40vh' as |t|}}
      {{t.head}}
      {{t.body onScrolledToBottom=(action 'onScrolledToBottom')}}
    {{/light-table}}
  `);

  assert.equal(this.$('tbody > tr').length, 50, '50 rows are rendered');

  let scrollContainer = '.tse-scroll-content';
  let scrollHeight = this.$(scrollContainer).prop('scrollHeight');

  assert.ok(this.$(scrollContainer).length > 0, 'scroll container was rendered');
  assert.equal(scrollHeight, 2500, 'scroll height is 2500');

  this.$(scrollContainer).animate({
    scrollTop: scrollHeight
  }, 0);

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

  assert.equal(this.$('#lightTable_inline_head thead').length, 0);

  this.set('fixed', false);

  assert.equal(this.$('#lightTable_inline_head thead').length, 1);
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

  assert.equal(this.$('#lightTable_inline_foot tfoot').length, 0);

  this.set('fixed', false);

  assert.equal(this.$('#lightTable_inline_foot tfoot').length, 1);
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

  assert.equal(this.$('#lightTable').height(), 500, 'table is 500px height');

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

  assert.equal(this.$('.lt-head-wrap').height(), 42, 'header is 42px tall');
  assert.equal(this.$('.lt-body-wrap').height(), 438, 'body is 438px tall');
  assert.equal(this.$('.lt-foot-wrap').height(), 20, 'header is 20px tall');

});

test('accepts components that are used in the body', function(assert) {

  register(this, 'component:custom-row', RowComponent);

  this.set('table', new Table(Columns, createUsers(1)));

  this.render(hbs `
    {{#light-table table as |t|}}
      {{t.body rowComponent=(component "custom-row" classNames="custom-row")}}
    {{/light-table}}
  `);

  assert.equal(this.$('.lt-row.custom-row').length, 1, 'row has custom-row class');
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

  assert.equal(this.$('.custom-row').length, 3, 'three custom rows were rendered');
  assert.equal(this.$('.custom-row.is-active').length, 0, 'none of the items are active');

  this.set('current', users[0]);

  assert.ok(this.$('.custom-row:eq(0)').hasClass('is-active'), 'first custom row is active');

  this.set('current', users[2]);

  assert.ok(this.$('.custom-row:eq(2)').hasClass('is-active'), 'third custom row is active');

  this.set('current', null);

  assert.equal(this.$('.custom-row.is-active').length, 0, 'none of the items are active');
});

test('onScroll', function(assert) {
  let done = assert.async();
  let table = new Table(Columns, createUsers(10));
  let expectedScroll = 50;

  this.setProperties({
    table,
    onScroll(actualScroll) {
      assert.ok(true, 'onScroll worked');
      assert.equal(actualScroll, expectedScroll, 'scroll position is correct');
      done();
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

  this.$('.tse-scroll-content').scrollTop(expectedScroll).scroll();
});
