import { scrollTo } from 'ember-native-dom-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, click } from '@ember/test-helpers';
import { module, test, skip } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';
import Table from 'ember-light-table';
import Columns from '../../helpers/table-columns';
import hasClass from '../../helpers/has-class';
import RowComponent from 'ember-light-table/components/lt-row';
import Component from '@ember/component';
import { get, computed } from '@ember/object';

module('Integration | Component | light table', function(hooks) {
  setupRenderingTest(hooks);
  setupMirageTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    this.set('table', new Table());
    await render(hbs `{{light-table table}}`);

    assert.equal(find('*').textContent.trim(), '');
  });

  skip('scrolled to bottom', async function(assert) {
    assert.expect(4);

    this.set('table', new Table(Columns, this.server.createList('user', 50)));

    this.set('onScrolledToBottom', () => {
      assert.ok(true);
    });

    await render(hbs `
      {{#light-table table height='40vh' as |t|}}
        {{t.head fixed=true}}
        {{t.body onScrolledToBottom=(action onScrolledToBottom)}}
      {{/light-table}}
    `);

    assert.equal(findAll('tbody > tr').length, 50, '50 rows are rendered');

    let scrollContainer = '.tse-scroll-content';
    let { scrollHeight } = find(scrollContainer);

    assert.ok(findAll(scrollContainer).length > 0, 'scroll container was rendered');
    assert.equal(scrollHeight, 2501, 'scroll height is 2500 + 1px for height of lt-infinity');

    await scrollTo(scrollContainer, 0, scrollHeight);
  });

  test('fixed header', async function(assert) {
    assert.expect(2);
    this.set('table', new Table(Columns, this.server.createList('user', 5)));

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' as |t|}}
        {{t.head fixed=true}}
        {{t.body}}
      {{/light-table}}
    `);

    assert.equal(findAll('#lightTable_inline_head thead').length, 0);

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' as |t|}}
        {{t.head fixed=false}}
        {{t.body}}
      {{/light-table}}
    `);

    assert.equal(findAll('#lightTable_inline_head thead').length, 1);
  });

  test('fixed footer', async function(assert) {
    assert.expect(2);
    this.set('table', new Table(Columns, this.server.createList('user', 5)));

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' as |t|}}
        {{t.body}}
        {{t.foot fixed=true}}
      {{/light-table}}
    `);

    assert.equal(findAll('#lightTable_inline_foot tfoot').length, 0);

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' as |t|}}
        {{t.body}}
        {{t.foot fixed=false}}
      {{/light-table}}
    `);

    assert.equal(findAll('#lightTable_inline_foot tfoot').length, 1);
  });

  test('table assumes height of container', async function(assert) {

    this.set('table', new Table(Columns, this.server.createList('user', 5)));
    this.set('fixed', true);

    await render(hbs `
      <div style="height: 500px">
        {{#light-table table id='lightTable' as |t|}}
          {{t.body}}
          {{t.foot fixed=fixed}}
        {{/light-table}}
      </div>
    `);

    assert.equal(find('#lightTable').offsetHeight, 500, 'table is 500px height');

  });

  test('table body should consume all available space when not enough content to fill it', async function(assert) {
    this.set('table', new Table(Columns, this.server.createList('user', 1)));
    this.set('fixed', true);

    await render(hbs `
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

    const bodyHeight = find('.lt-body-wrap').offsetHeight;
    const headHeight = find('.lt-head-wrap').offsetHeight;
    const footHeight = find('.lt-foot-wrap').offsetHeight;

    assert.equal(bodyHeight + headHeight + footHeight, 500, 'combined table content is 500px tall');
    assert.ok(bodyHeight > (headHeight + footHeight), 'body is tallest element');
  });

  test('accepts components that are used in the body', async function(assert) {

    this.owner.register('component:custom-row', RowComponent);

    this.set('table', new Table(Columns, this.server.createList('user', 1)));

    await render(hbs `
      {{#light-table table as |t|}}
        {{t.body rowComponent=(component "custom-row" classNames="custom-row")}}
      {{/light-table}}
    `);

    assert.equal(findAll('.lt-row.custom-row').length, 1, 'row has custom-row class');
  });

  test('passed in components can have computed properties', async function(assert) {

    this.owner.register('component:custom-row', RowComponent.extend({
      classNameBindings: ['isActive'],
      current: null,
      isActive: computed('row.content', 'current', function() {
        return this.get('row.content') === this.get('current');
      })
    }));

    let users = this.server.createList('user', 3);
    this.set('table', new Table(Columns, users));

    await render(hbs `
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
    let thirdRow = find('.custom-row:nth-child(3)');
    assert.ok(hasClass(thirdRow, 'is-active'), 'third custom row is active');

    this.set('current', null);

    assert.notOk(find('.custom-row.is-active'), 'none of the items are active');
  });

  test('onScroll', async function(assert) {
    let table = new Table(Columns, this.server.createList('user', 10));
    let expectedScroll = 50;

    this.setProperties({
      table,
      onScroll(actualScroll) {
        assert.ok(true, 'onScroll worked');
        assert.equal(actualScroll, expectedScroll, 'scroll position is correct');
      }
    });

    await render(hbs `
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

  test('extra data and tableActions', async function(assert) {
    assert.expect(4);

    this.owner.register('component:some-component', Component.extend({
      classNames: 'some-component',
      didReceiveAttrs() {
        assert.equal(get(this, 'extra.someData'), 'someValue', 'extra data is passed');
      },
      click() {
        get(this, 'tableActions.someAction')();
      }
    }));

    const columns = [{
      component: 'some-component',
      cellComponent: 'some-component'
    }];

    this.set('table', new Table(columns, [{}]));

    this.actions.someAction = () => {
      assert.ok(true, 'table action is passed');
    };

    await render(hbs `
      {{#light-table table
        extra=(hash someData="someValue")
        tableActions=(hash
          someAction=(action "someAction")
        )
        as |t|
      }}
        {{t.head}}
        {{t.body}}
      {{/light-table}}
    `);

    for (const element of findAll('.some-component')) {
      await click(element);
    }
  });
});
