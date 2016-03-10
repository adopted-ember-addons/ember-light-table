import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Table from 'ember-light-table';
import Columns, { GroupedColumns } from '../../helpers/table-columns';

moduleForComponent('lt-head', 'Integration | Component | lt head', {
  integration: true
});

test('render columns', function(assert) {
  this.set('table', new Table(Columns));

  this.render(hbs`{{lt-head table=table}}`);

  assert.equal(this.$('tr > th').length, 6);
});

test('render grouped columns', function(assert) {
  this.set('table', new Table(GroupedColumns));

  this.render(hbs`{{lt-head table=table}}`);

  assert.equal(this.$('tr:first > th').attr('colspan'), 3);
  assert.ok(this.$('tr:first > th').hasClass('lt-group-column'));
  assert.equal(this.$('tr').length, 2);
  assert.equal(this.$('tr > th').length, 8);
});


test('click - non-sortable column', function(assert) {
  this.set('table', new Table(Columns));
  this.on('onColumnClick', column => {
    assert.ok(column);
    assert.ok(!column.sortable);
    assert.equal(column.label, 'Avatar');
  });

  this.render(hbs`{{lt-head table=table onColumnClick=(action 'onColumnClick')}}`);

  assert.equal(this.$('tr > th').length, 6);
  this.$('tr > th:first').click();
});

test('click - sortable column', function(assert) {
  this.set('table', new Table(Columns));
  let asc = true;
  this.on('onColumnClick', column => {
    assert.ok(column);
    assert.ok(column.sortable);
    assert.ok(column.sorted);
    assert.equal(column.label, 'Country');
    assert.equal(column.ascending, asc);
  });

  this.render(hbs`{{lt-head table=table onColumnClick=(action 'onColumnClick')}}`);

  assert.equal(this.$('tr > th').length, 6);
  this.$('tr > th:last').click();
  asc = false;
  this.$('tr > th:last').click();
});

test('double click', function(assert) {
  this.set('table', new Table(Columns));
  this.on('onColumnDoubleClick', column => {
    assert.ok(column);
    assert.ok(!column.sortable);
    assert.equal(column.label, 'Avatar');
  });

  this.render(hbs`{{lt-head table=table onColumnDoubleClick=(action 'onColumnDoubleClick')}}`);

  assert.equal(this.$('tr > th').length, 6);
  this.$('tr > th:last').click();
});
