import { triggerEvent, click, find, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Table from 'ember-light-table';
import Columns, { GroupedColumns } from '../../helpers/table-columns';
import hasClass from '../../helpers/has-class';
import Component from '@ember/component';
import { isPresent } from '@ember/utils';

module('Integration | Component | lt head', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('render columns', async function(assert) {
    this.set('table', new Table(Columns));

    await render(hbs`{{lt-head table=table renderInPlace=true}}`);

    assert.equal(findAll('tr > th').length, 6);
  });

  test('render grouped columns', async function(assert) {
    this.set('table', new Table(GroupedColumns));

    await render(hbs`{{lt-head table=table renderInPlace=true}}`);

    assert.equal(find('tr:nth-child(2) > th').getAttribute('colspan'), 3);
    assert.ok(find('tr:nth-child(2) > th').classList.contains('lt-group-column'));
    assert.equal(findAll('tr').length, 3);
    assert.equal(findAll('tr > th').length, 8);
  });

  test('click - non-sortable column', async function(assert) {
    this.set('table', new Table(Columns));
    this.set('onColumnClick', (column) => {
      assert.ok(column);
      assert.notOk(column.sortable);
      assert.equal(column.label, 'Avatar');
    });

    await render(hbs`{{lt-head table=table renderInPlace=true onColumnClick=(action onColumnClick)}}`);

    assert.equal(findAll('tr > th').length, 6);
    let nonSortableHeader = find('tr > th');
    click(nonSortableHeader);
  });

  test('click - sortable column', async function(assert) {
    this.set('table', new Table(Columns));
    let asc = true;
    this.set('onColumnClick', (column) => {
      assert.ok(column);
      assert.ok(column.sortable);
      assert.ok(column.sorted);
      assert.equal(column.label, 'Country');
      assert.equal(column.ascending, asc);
    });

    await render(hbs`{{lt-head table=table renderInPlace=true onColumnClick=(action onColumnClick)}}`);
    let allHeaders = findAll('tr > th');
    let sortableHeader = allHeaders[allHeaders.length - 1];
    assert.equal(findAll('tr > th').length, 6);
    await click(sortableHeader);
    asc = false;
    await click(sortableHeader);
  });

  test('render sort icons', async function(assert) {
    this.set('table', new Table(Columns));

    await render(
      hbs`{{lt-head table=table renderInPlace=true iconSortable='fa-sort' iconAscending='fa-sort-asc' iconDescending='fa-sort-desc'}}`
    );

    const allHeaders = findAll('tr > th');
    const sortableHeader = allHeaders[allHeaders.length - 1];
    const sortIcon = sortableHeader.querySelector('.lt-sort-icon');

    // Sortable case
    assert.ok(hasClass(sortIcon, 'fa-sort'), 'Sortable icon renders');
    assert.notOk(hasClass(sortIcon, 'fa-sort-asc'));
    assert.notOk(hasClass(sortIcon, 'fa-sort-desc'));

    await click(sortableHeader);

    // Ascending case
    assert.ok(hasClass(sortIcon, 'fa-sort-asc'), 'Ascending icon renders');
    assert.notOk(hasClass(sortIcon, 'fa-sort'));
    assert.notOk(hasClass(sortIcon, 'fa-sort-desc'));

    await click(sortableHeader);

    // Descending case
    assert.ok(hasClass(sortIcon, 'fa-sort-desc'), 'Descending icon renders');
    assert.notOk(hasClass(sortIcon, 'fa-sort'));
    assert.notOk(hasClass(sortIcon, 'fa-sort-asc'));
  });

  test('custom iconComponent has arguments', function(assert) {
    const sortableColumns = Columns.filter((column) => {
      return column.sortable !== false;
    });

    assert.expect(6 * sortableColumns.length);
    const iconSortable = 'unfold_more';
    const iconAscending = 'fa-sort-asc';
    const iconDescending = 'fa-sort-desc';
    const iconComponent = 'custom-icon-component';

    this.setProperties({
      iconSortable,
      iconAscending,
      iconDescending,
      iconComponent,
      table: new Table(Columns)
    });
    this.owner.register(`component:${iconComponent}`, Component.extend({
      init() {
        this._super(...arguments);
        assert.ok(isPresent(this.get('sortIconProperty')));
        assert.ok(isPresent(this.get('sortIcons')));
        assert.equal(this.get('sortIcons.iconSortable'), iconSortable);
        assert.equal(this.get('sortIcons.iconAscending'), iconAscending);
        assert.equal(this.get('sortIcons.iconDescending'), iconDescending);
        assert.equal(this.get('sortIcons.iconComponent'), iconComponent);
      }
    }));

    this.render(hbs`{{lt-head table=table renderInPlace=true iconSortable=iconSortable iconAscending=iconAscending iconDescending=iconDescending iconComponent=iconComponent}}`);
  }),

  test('double click', async function(assert) {
    assert.expect(4);

    this.set('table', new Table(Columns));
    this.set('onColumnDoubleClick', (column) => {
      assert.ok(column);
      assert.notOk(column.sortable);
      assert.equal(column.label, 'Avatar');
    });

    await render(hbs`{{lt-head table=table renderInPlace=true onColumnDoubleClick=(action  onColumnDoubleClick)}}`);

    const allHeaders = findAll('tr > th');
    const [avatarHeader] = allHeaders;

    assert.equal(allHeaders.length, 6);

    await triggerEvent(avatarHeader, 'dblclick');
  });
});
