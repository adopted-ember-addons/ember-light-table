import { find } from 'ember-native-dom-helpers';
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Row, Column } from 'ember-light-table';

moduleForComponent(
  'light-table/cells/base',
  'Integration | Component | Cells | base',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  this.set('column', new Column());
  this.render(hbs`{{light-table/cells/base column=column}}`);

  assert.equal(find('*').textContent.trim(), '');
});

test('cell with column format', function(assert) {
  this.set(
    'column',
    new Column({
      valuePath: 'num',
      format(value) {
        return value * 2;
      }
    })
  );

  this.set('row', new Row());

  this.render(hbs`{{light-table/cells/base column row rawValue=2}}`);

  assert.equal(find('*').textContent.trim(), '4');
});

test('cell format with no valuePath', function(assert) {
  this.set(
    'column',
    new Column({
      format() {
        return this.get('row.num') * 2;
      }
    })
  );

  this.set(
    'row',
    new Row({
      num: 2
    })
  );

  this.render(hbs`{{light-table/cells/base column row}}`);

  assert.equal(find('*').textContent.trim(), '4');
});

test('cell with nested valuePath', function(assert) {
  this.set(
    'column',
    new Column({
      valuePath: 'foo.bar.baz',
      format(value) {
        return value * 2;
      }
    })
  );

  this.set(
    'row',
    new Row({
      foo: {
        bar: {
          baz: 2
        }
      }
    })
  );

  this.render(
    hbs`{{light-table/cells/base column row rawValue=(get row column.valuePath)}}`
  );

  assert.equal(find('*').textContent.trim(), '4');

  Ember.run(() => this.get('row').set(this.get('column.valuePath'), 4));

  assert.equal(find('*').textContent.trim(), '8');
});
