import { click, find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Table from 'ember-light-table';
import Columns, { GroupedColumns } from '../../helpers/table-columns';

moduleForComponent('lt-head', 'Integration | Component | lt head', {
  integration: true
});

test('render columns', function(assert) {
  this.set('table', new Table(Columns));

  this.render(hbs`{{lt-head table=table renderInPlace=true}}`);

  assert.equal(findAll('tr > th').length, 6);
});

test('render grouped columns', function(assert) {
  this.set('table', new Table(GroupedColumns));

  this.render(hbs`{{lt-head table=table renderInPlace=true}}`);

  assert.equal(find('tr:nth-child(2) > th').getAttribute('colspan'), 3);
  assert.ok(find('tr:nth-child(2) > th').classList.contains('lt-group-column'));
  assert.equal(findAll('tr').length, 3);
  assert.equal(findAll('tr > th').length, 8);
});

test('click - non-sortable column', function(assert) {
  this.set('table', new Table(Columns));
  this.on('onColumnClick', (column) => {
    assert.ok(column);
    assert.notOk(column.sortable);
    assert.equal(column.label, 'Avatar');
  });

  this.render(hbs`{{lt-head table=table renderInPlace=true onColumnClick=(action 'onColumnClick')}}`);

  assert.equal(findAll('tr > th').length, 6);
  let nonSortableHeader = find('tr > th');
  click(nonSortableHeader);
});

test('click - sortable column', function(assert) {
  this.set('table', new Table(Columns));
  let asc = true;
  this.on('onColumnClick', (column) => {
    assert.ok(column);
    assert.ok(column.sortable);
    assert.ok(column.sorted);
    assert.equal(column.label, 'Country');
    assert.equal(column.ascending, asc);
  });

  this.render(hbs`{{lt-head table=table renderInPlace=true onColumnClick=(action 'onColumnClick')}}`);
  let allHeaders = findAll('tr > th');
  let sortableHeader = allHeaders[allHeaders.length - 1];
  assert.equal(findAll('tr > th').length, 6);
  click(sortableHeader);
  asc = false;
  click(sortableHeader);
});

test('double click', function(assert) {
  this.set('table', new Table(Columns));
  this.on('onColumnDoubleClick', (column) => {
    assert.ok(column);
    assert.notOk(column.sortable);
    assert.equal(column.label, 'Avatar');
  });

  this.render(hbs`{{lt-head table=table renderInPlace=true onColumnDoubleClick=(action 'onColumnDoubleClick')}}`);
  let allHeaders = findAll('tr > th');
  let sortableHeader = allHeaders[allHeaders.length - 1];

  assert.equal(allHeaders.length, 6);
  click(sortableHeader);
});
