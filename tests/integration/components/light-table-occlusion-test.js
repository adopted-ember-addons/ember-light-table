import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, click, triggerEvent } from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import setupMirageTest from 'ember-cli-mirage/test-support/setup-mirage';
import Table from 'ember-light-table';
import Columns from '../../helpers/table-columns';
import hasClass from '../../helpers/has-class';
import RowComponent from 'ember-light-table/components/lt-row';
import Component from '@ember/component';
import { computed } from '@ember/object';
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
    this.set('table', Table.create());
    await render(hbs `{{light-table table height="40vh" occlusion=true estimatedRowHeight=30}}`);

    assert.dom('*').hasText('');
  });

  test('scrolled to bottom', async function(assert) {
    assert.expect(4);

    this.set('table', Table.create({ columns: Columns, rows: this.server.createList('user', 50) }));

    this.set('onScrolledToBottom', () => {
      assert.ok(true);
    });

    await render(hbs `
      {{#light-table table height='40vh' occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.head fixed=true}}
        {{t.body onScrolledToBottom=(action onScrolledToBottom)}}
      {{/light-table}}
    `);

    assert.ok(findAll('.vertical-collection tbody.lt-body tr.lt-row').length < 30, 'only some rows are rendered');

    let scrollContainer = find('.lt-scrollable.tse-scrollable.vertical-collection');
    assert.ok(scrollContainer, 'scroll container was rendered');
    let { scrollHeight } = scrollContainer;
    assert.ok(scrollHeight > 1500, 'scroll height is 50 rows * 30 px per row + header size');
    scrollContainer.scrollTop = scrollHeight;

    await triggerEvent(scrollContainer, 'scroll');
  });

  test('fixed header', async function(assert) {
    assert.expect(2);
    this.set('table', Table.create({ columns: Columns, rows: this.server.createList('user', 5) }));

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.head fixed=true}}
        {{t.body}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_head thead').doesNotExist();

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.head fixed=false}}
        {{t.body}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_head thead').exists({ count: 1 });
  });

  test('fixed footer', async function(assert) {
    assert.expect(2);
    this.set('table', Table.create({ columns: Columns, rows: this.server.createList('user', 5) }));

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.body}}
        {{t.foot fixed=true}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_foot tfoot').doesNotExist();

    await render(hbs `
      {{#light-table table height='500px' id='lightTable' occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.body}}
        {{t.foot fixed=false}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_foot tfoot').exists({ count: 1 });
  });

  test('table assumes height of container', async function(assert) {

    this.set('table', Table.create({ columns: Columns, rows: this.server.createList('user', 5) }));
    this.set('fixed', true);

    await render(hbs `
      <div style="height: 500px">
        {{#light-table table id='lightTable' occlusion=true estimatedRowHeight=30 as |t|}}
          {{t.body}}
          {{t.foot fixed=fixed}}
        {{/light-table}}
      </div>
    `);

    assert.equal(find('#lightTable').offsetHeight, 500, 'table is 500px height');

  });

  test('table body should consume all available space when not enough content to fill it', async function(assert) {
    this.set('table', Table.create({ columns: Columns, rows: this.server.createList('user', 1) }));
    this.set('fixed', true);

    await render(hbs `
      <div style="height: 500px">
        {{#light-table table id='lightTable' occlusion=true estimatedRowHeight=30 as |t|}}
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

    this.set('table', Table.create({ columns: Columns, rows: this.server.createList('user', 1) }));

    await render(hbs `
      {{#light-table table occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.body rowComponent=(component "custom-row" classNames="custom-row")}}
      {{/light-table}}
    `);

    assert.dom('.lt-row.custom-row').exists({ count: 1 }, 'row has custom-row class');
  });

  test('passed in components can have computed properties', async function(assert) {

    this.owner.register('component:custom-row', RowComponent.extend({
      classNameBindings: ['isActive'],
      current: null,
      isActive: computed('row.content', 'current', function() {
        return this.row.content === this.current;
      })
    }));

    let users = this.server.createList('user', 3);
    this.set('table', Table.create({ columns: Columns, rows: users }));

    await render(hbs `
      {{#light-table table height='500px' occlusion=true estimatedRowHeight=30 as |t|}}
        {{t.body
          rowComponent=(component "custom-row" classNames="custom-row" current=current)
        }}
      {{/light-table}}
    `);

    assert.dom('.custom-row').exists({ count: 3 }, 'three custom rows were rendered');
    assert.dom('.custom-row.is-active').doesNotExist('none of the items are active');

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

    assert.dom('.custom-row.is-active').doesNotExist('none of the items are active');
  });

  test('extra data and tableActions', async function(assert) {
    assert.expect(4);

    this.owner.register('component:some-component', Component.extend({
      classNames: 'some-component',

      didReceiveAttrs() {
        assert.equal(this.extra.someData, 'someValue', 'extra data is passed');
      },

      click() {
        this.tableActions.someAction();
      }
    }));

    const columns = [{
      component: 'some-component',
      cellComponent: 'some-component'
    }];

    this.set('table', Table.create({ columns, rows: [{}] }));

    this.actions.someAction = () => {
      assert.ok(true, 'table action is passed');
    };

    await render(hbs `
      {{#light-table table
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
      {{/light-table}}
    `);

    /* eslint-disable no-unused-vars */
    for (const element of findAll('.some-component')) {
      await click(element);
    }
  });
});
