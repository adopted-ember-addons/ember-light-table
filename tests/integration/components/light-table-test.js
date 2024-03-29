import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  findAll,
  find,
  click,
  triggerEvent,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import Table from 'ember-light-table';
import Columns, { ResizableColumns } from '../../helpers/table-columns';
import hasClass from '../../helpers/has-class';
import RowComponent from 'ember-light-table/components/lt-row';
import Component from '@ember/component';
import { computed } from '@ember/object';

module('Integration | Component | light table', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('it renders', async function (assert) {
    this.set('table', Table.create());
    await render(hbs`{{light-table table=this.table}}`);

    assert.dom('*').hasText('');
  });

  test('scrolled to bottom', async function (assert) {
    assert.expect(4);

    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 50),
      })
    );

    this.set('onScrolledToBottom', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#light-table table=this.table height='40vh' as |t|}}
        {{t.head fixed=true}}
        {{t.body onScrolledToBottom=this.onScrolledToBottom}}
      {{/light-table}}
    `);

    assert.dom('tbody > tr').exists({ count: 50 }, '50 rows are rendered');

    let scrollContainer = find('.tse-scroll-content');
    assert.ok(scrollContainer, 'scroll container was rendered');
    let expectedScroll = 2501;
    assert.strictEqual(
      scrollContainer.scrollHeight,
      expectedScroll,
      'scroll height is 2500 + 1px for height of lt-infinity'
    );

    scrollContainer.scrollTop = expectedScroll;
    await triggerEvent(scrollContainer, 'scroll');
  });

  test('scrolled to bottom (multiple tables)', async function (assert) {
    assert.expect(4);

    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 50),
      })
    );

    this.set('onScrolledToBottomTable1', () => {
      assert.ok(false);
    });

    this.set('onScrolledToBottomTable2', () => {
      assert.ok(true);
    });

    await render(hbs`
      {{#light-table table=this.table height='40vh' id='table-1' as |t|}}
        {{t.head fixed=true}}
        {{t.body onScrolledToBottom=this.onScrolledToBottomTable1}}
      {{/light-table}}

      {{#light-table table=this.table height='40vh' id='table-2' as |t|}}
        {{t.head fixed=true}}
        {{t.body onScrolledToBottom=this.onScrolledToBottomTable2}}
      {{/light-table}}
    `);

    assert
      .dom('#table-2 tbody > tr')
      .exists({ count: 50 }, '50 rows are rendered');

    let scrollContainer = find('#table-2 .tse-scroll-content');
    assert.ok(scrollContainer, 'scroll container was rendered');
    let expectedScroll = 2501;
    assert.strictEqual(
      scrollContainer.scrollHeight,
      expectedScroll,
      'scroll height is 2500 + 1px for height of lt-infinity'
    );

    scrollContainer.scrollTop = expectedScroll;
    await triggerEvent(scrollContainer, 'scroll');
  });

  test('fixed header', async function (assert) {
    assert.expect(2);
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );

    await render(hbs`
      {{#light-table table=this.table height='500px' id='lightTable' as |t|}}
        {{t.head fixed=true}}
        {{t.body}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_head thead').doesNotExist();

    await render(hbs`
      {{#light-table table=this.table height='500px' id='lightTable' as |t|}}
        {{t.head fixed=false}}
        {{t.body}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_head thead').exists({ count: 1 });
  });

  test('fixed footer', async function (assert) {
    assert.expect(2);
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );

    await render(hbs`
      {{#light-table table=this.table height='500px' id='lightTable' as |t|}}
        {{t.body}}
        {{t.foot fixed=true}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_foot tfoot').doesNotExist();

    await render(hbs`
      {{#light-table table=this.table height='500px' id='lightTable' as |t|}}
        {{t.body}}
        {{t.foot fixed=false}}
      {{/light-table}}
    `);

    assert.dom('#lightTable_inline_foot tfoot').exists({ count: 1 });
  });

  test('table assumes height of container', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 5),
      })
    );
    this.set('fixed', true);

    await render(hbs`
      <div style="height: 500px">
        {{#light-table table=this.table id='lightTable' as |t|}}
          {{t.body}}
          {{t.foot fixed=this.fixed}}
        {{/light-table}}
      </div>
    `);

    assert.strictEqual(
      find('#lightTable').offsetHeight,
      500,
      'table is 500px height'
    );
  });

  test('table body should consume all available space when not enough content to fill it', async function (assert) {
    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 1),
      })
    );
    this.set('fixed', true);

    await render(hbs`
      <div style="height: 500px">
        {{#light-table table=this.table id='lightTable' as |t|}}
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

    assert.strictEqual(
      bodyHeight + headHeight + footHeight,
      500,
      'combined table content is 500px tall'
    );
    assert.ok(bodyHeight > headHeight + footHeight, 'body is tallest element');
  });

  test('accepts components that are used in the body', async function (assert) {
    this.owner.register('component:custom-row', RowComponent);

    this.set(
      'table',
      Table.create({
        columns: Columns,
        rows: this.server.createList('user', 1),
      })
    );

    await render(hbs`
      {{#light-table table=this.table as |t|}}
        {{t.body rowComponent=(component "custom-row" classNames="custom-row")}}
      {{/light-table}}
    `);

    assert
      .dom('.lt-row.custom-row')
      .exists({ count: 1 }, 'row has custom-row class');
  });

  test('passed in components can have computed properties', async function (assert) {
    this.owner.register(
      'component:custom-row',
      RowComponent.extend({
        classNameBindings: ['isActive'],
        current: null,
        isActive: computed('row.content', 'current', function () {
          return this.row?.content === this.current;
        }),
      })
    );

    let users = this.server.createList('user', 3);
    this.set('table', Table.create({ columns: Columns, rows: users }));

    await render(hbs`
      {{#light-table table=this.table as |t|}}
        {{t.body
          rowComponent=(component "custom-row" classNames="custom-row" current=this.current)
        }}
      {{/light-table}}
    `);

    assert
      .dom('.custom-row')
      .exists({ count: 3 }, 'three custom rows were rendered');
    assert
      .dom('.custom-row.is-active')
      .doesNotExist('none of the items are active');

    this.set('current', users[0]);
    let [firstRow] = findAll('.custom-row');
    assert.ok(hasClass(firstRow, 'is-active'), 'first custom row is active');

    this.set('current', users[2]);
    let thirdRow = find('.custom-row:nth-child(3)');
    assert.ok(hasClass(thirdRow, 'is-active'), 'third custom row is active');

    this.set('current', null);

    assert
      .dom('.custom-row.is-active')
      .doesNotExist('none of the items are active');
  });

  test('onScroll', async function (assert) {
    let table = Table.create({
      columns: Columns,
      rows: this.server.createList('user', 10),
    });
    let expectedScroll = 50;

    this.setProperties({
      table,
      onScroll(actualScroll) {
        assert.ok(true, 'onScroll worked');
        assert.strictEqual(
          actualScroll,
          expectedScroll,
          'scroll position is correct'
        );
      },
    });

    await render(hbs`
      {{#light-table table=this.table height='40vh' as |t|}}
        {{t.head fixed=true}}
        {{t.body
          useVirtualScrollbar=true
          onScroll=this.onScroll
        }}
      {{/light-table}}
    `);

    let scrollContainer = find('.tse-scroll-content');
    scrollContainer.scrollTop = expectedScroll;
    await triggerEvent(scrollContainer, 'scroll');
  });

  test('extra data and tableActions', async function (assert) {
    assert.expect(4);

    this.owner.register(
      'component:some-component',
      Component.extend({
        classNames: 'some-component',

        didReceiveAttrs() {
          this._super();
          assert.strictEqual(
            this.extra.someData,
            'someValue',
            'extra data is passed'
          );
        },

        click() {
          this.tableActions.someAction();
        },
      })
    );

    const columns = [
      {
        component: 'some-component',
        cellComponent: 'some-component',
      },
    ];

    this.set('table', Table.create({ columns, rows: [{}] }));

    this.actions.someAction = () => {
      assert.ok(true, 'table action is passed');
    };

    await render(hbs`
      {{#light-table table=this.table
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

  test('dragging resizes columns', async function (assert) {
    let table = Table.create({
      columns: ResizableColumns,
      rows: this.server.createList('user', 10),
    });
    this.setProperties({ table });
    await render(hbs`
      {{#light-table table=this.table height='40vh' as |t|}}
        {{t.head fixed=true}}
        {{t.body}}
      {{/light-table}}
    `);
    let ths = this.element.querySelectorAll('th.is-resizable');
    assert.strictEqual(ths.length, 5);
  });
});
