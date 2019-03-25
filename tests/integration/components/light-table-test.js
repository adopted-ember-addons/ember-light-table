import { scrollTo } from 'ember-native-dom-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, click } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';
import Table from 'ember-light-table';
import Columns, { ResizableColumns } from '../../helpers/table-columns';
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

  test('scrolled to bottom', async function(assert) {
    assert.expect(4);

    this.set('table', new Table(Columns, this.server.createList('user', 50)));

    this.set('onScrolledToBottom', () => {
      assert.ok(true);
    });

    await render(hbs `
      {{#lt-frame height='40vh' as |frame|}}
        {{frame.fixed-head-here}}
        {{#frame.scrollable-zone}}
          {{#frame.table table as |t|}}
            {{t.head fixed=true}}
            {{t.body onScrolledToBottom=(action onScrolledToBottom)
            }}
          {{/frame.table}}
        {{/frame.scrollable-zone}}
      {{/lt-frame}}
    `);

    assert.equal(findAll('tbody > tr').length, 50, '50 rows are rendered');

    let scrollContainer = '.lt-scrollable';
    let { scrollHeight } = find(scrollContainer);

    assert.ok(findAll(scrollContainer).length > 0, 'scroll container was rendered');
    assert.equal(scrollHeight, 2501, 'scroll height is 2500 + 1px for height of lt-infinity');

    await scrollTo(scrollContainer, 0, scrollHeight);
  });

  test('scrolled to bottom (multiple tables)', async function(assert) {
    assert.expect(4);

    this.set('table', new Table(Columns, this.server.createList('user', 50)));

    this.set('onScrolledToBottomTable1', () => {
      assert.ok(false);
    });

    this.set('onScrolledToBottomTable2', () => {
      assert.ok(true);
    });

    await render(hbs `
      <div id='table-1'>
        {{#lt-frame height='20vh' scrollbar='virtual' as |frame|}}
          {{frame.fixed-head-here}}
          {{#frame.scrollable-zone}}
            {{#frame.table table as |t|}}
              {{t.head fixed=true}}
              {{t.body onScrolledToBottom=(action onScrolledToBottomTable1)}}
            {{/frame.table}}
          {{/frame.scrollable-zone}}
        {{/lt-frame}}
      </div>

      <div id='table-2'>
        {{#lt-frame height='20vh' scrollbar='virtual' as |frame|}}
          {{frame.fixed-head-here}}
          {{#frame.scrollable-zone}}
            {{#frame.table table as |t|}}
              {{t.head fixed=true}}
              {{t.body onScrolledToBottom=(action onScrolledToBottomTable2)}}
            {{/frame.table}}
          {{/frame.scrollable-zone}}
        {{/lt-frame}}
      </div>
    `);

    assert.equal(findAll('#table-2 tbody > tr').length, 50, '50 rows are rendered');

    let scrollContainer = '#table-2 .lt-scrollable .tse-scroll-content';
    let { scrollHeight } = find(scrollContainer);

    assert.ok(findAll(scrollContainer).length > 0, 'scroll container was rendered');
    assert.equal(scrollHeight, 2501, 'scroll height is 2500 + 1px for height of lt-infinity');

    await scrollTo(scrollContainer, 0, scrollHeight);
  });

  async function renderWithHeader() {
    await render(hbs `
      {{#lt-frame height='500px' scrollbar='virtual' as |frame|}}
        {{frame.fixed-head-here}}
        {{#frame.scrollable-zone}}
          {{#frame.table table as |t|}}
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
          {{#frame.table table as |t|}}
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

  test('dragging resizes columns', async function(assert) {
    let table = new Table(ResizableColumns, this.server.createList('user', 10));
    this.setProperties({ table });
    await render(hbs `
      {{#lt-frame height='40vh' as |frame|}}
        {{frame.fixed-head-here}}
        {{#frame.table table as |t|}}
          {{t.head fixed=true}}
          {{t.body}}
        {{/frame.table}}
      {{/lt-frame}}
    `);
    let ths = this.element.querySelectorAll('th.is-resizable');
    assert.equal(ths.length, 5);
  });
});
