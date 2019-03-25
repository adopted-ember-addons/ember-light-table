import { scrollTo } from 'ember-native-dom-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';
import Table from 'ember-light-table';
import Columns from '../../helpers/table-columns';
import hasClass from '../../helpers/has-class';
import RowComponent from 'ember-light-table/components/lt-row';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { run } from '@ember/runloop';
import registerWaiter from 'ember-raf-scheduler/test-support/register-waiter';

module('Integration | Component | light table | occlusion', function(hooks) {
  setupRenderingTest(hooks);
  setupMirageTest(hooks);

  hooks.beforeEach(function() {
    registerWaiter();
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    this.set('table', new Table());
    await render(hbs `
      {{#lt-frame height="40vh" as |frame|}}
        {{frame.table table occlusion=true estimatedRowHeight=30}}
      {{/lt-frame}}
    `);
    assert.equal(find('*').textContent.trim(), '');
  });

  test('scrolled to bottom', async function(assert) {
    assert.expect(4);

    this.set('table', new Table(Columns, this.server.createList('user', 50)));

    this.set('onScrolledToBottom', () => {
      assert.ok(true);
    });

    await render(hbs `
      {{#lt-frame height='300px' scrollbar='virtual' as |frame|}}
        {{frame.fixed-head-here}}
        {{#frame.scrollable-zone}}
          {{#frame.table table occlusion=true estimatedRowHeight=30 as |t|}}
            {{t.head fixed=true}}
            {{t.body onScrolledToBottom=(action onScrolledToBottom)}}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
      {{/lt-frame}}
    `);

    assert.ok(findAll('.vertical-collection tbody.lt-body tr.lt-row').length < 30, 'only some rows are rendered');

    let scrollContainer = '.lt-scrollable .tse-scroll-content';
    let { scrollHeight } = find(scrollContainer);

    assert.ok(findAll(scrollContainer).length > 0, 'scroll container was rendered');
    assert.ok(scrollHeight > 1500, 'scroll height is 50 rows * 30 px per row + header size');

    await scrollTo(scrollContainer, 0, scrollHeight);
  });

  async function renderWithHeader() {
    await render(hbs `
      {{#lt-frame height='500px' scrollbar='virtual' as |frame|}}
        {{frame.fixed-head-here}}
        {{#frame.scrollable-zone}}
          {{#frame.table table occlusion=true estimatedRowHeight=30 as |t|}}
            {{t.head fixed=fixed}}
            {{t.body}}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
      {{/lt-frame}}
    `);
  }

  test('fixed header', async function(assert) {
    assert.expect(4);
    this.set('table', new Table(Columns, this.server.createList('user', 5)));
    this.set('fixed', true);
    await renderWithHeader();
    assert.equal(findAll('.lt-frame thead').length, 1, 'fixed - thead is rendered');
    assert.equal(findAll('.lt-scrollable thead').length, 0, 'fixed - not rendered inside scrollable zone');
    this.set('fixed', false);
    await renderWithHeader();
    assert.equal(findAll('.lt-frame thead').length, 1, 'inline - thead is rendered');
    assert.equal(findAll('.lt-scrollable thead ').length, 1, 'inline - rendered inside scrollable zone');
  });

  async function renderWithFooter() {
    await render(hbs `
      {{#lt-frame height='500px' as |frame|}}
        {{#frame.scrollable-zone}}
          {{#frame.table table occlusion=true estimatedRowHeight=30 as |t|}}
            {{t.body}}
            {{t.foot fixed=fixed}}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
        {{frame.fixed-foot-here}}
      {{/lt-frame}}
    `);
  }

  test('fixed footer', async function(assert) {
    assert.expect(4);
    this.set('table', new Table(Columns, this.server.createList('user', 5)));
    this.set('fixed', true);
    await renderWithFooter();
    assert.equal(findAll('.lt-frame tfoot').length, 1, 'fixed - tfoot is rendered');
    assert.equal(findAll('.lt-scrollable tfoot').length, 0, 'fixed - not rendered inside scrollable zone');
    this.set('fixed', false);
    await renderWithFooter();
    assert.equal(findAll('.lt-frame tfoot').length, 1, 'inline - tfoot is rendered');
    assert.equal(findAll('.lt-scrollable tfoot ').length, 1, 'inline - rendered inside scrollable zone');
  });

  test('accepts components that are used in the body', async function(assert) {

    this.owner.register('component:custom-row', RowComponent);

    this.set('table', new Table(Columns, this.server.createList('user', 1)));

    await render(hbs `
      {{#lt-frame height='500px' as |frame|}}
        {{#frame.scrollable-zone}}
          {{#frame.table table occlusion=true estimatedRowHeight=30 as |t|}}
            {{t.body rowComponent=(component "custom-row" classNames="custom-row")}}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
      {{/lt-frame}}
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
      {{#lt-frame height='500px' as |frame|}}
        {{#frame.scrollable-zone}}
          {{#frame.table table occlusion=true estimatedRowHeight=30 as |t|}}
          {{t.body
            rowComponent=(component "custom-row" classNames="custom-row" current=current)
          }}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
      {{/lt-frame}}
    `);

    assert.equal(findAll('.custom-row').length, 3, 'three custom rows were rendered');
    assert.notOk(find('.custom-row.is-active'), 'none of the items are active');

    run(() => {
      this.set('current', users[0]);
    });
    let firstRow = find('.custom-row:nth-child(2)');
    assert.ok(hasClass(firstRow, 'is-active'), 'first custom row is active');

    run(() => {
      this.set('current', users[2]);
    });
    let thirdRow = find('.custom-row:nth-child(4)');
    assert.ok(hasClass(thirdRow, 'is-active'), 'third custom row is active');

    run(() => {
      this.set('current', null);
    });

    assert.notOk(find('.custom-row.is-active'), 'none of the items are active');
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
      {{#lt-frame height='500px' as |frame|}}
        {{#frame.scrollable-zone}}
          {{#frame.table table
            occlusion=true
            estimatedRowHeight=30
            extra=(hash someData="someValue")
            tableActions=(hash
              someAction=(action "someAction")
            )
            as |t|
          }}
            {{t.head}}
            {{t.body}}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
      {{/lt-frame}}
    `);

    for (const element of findAll('.some-component')) {
      await click(element);
    }
  });
});
