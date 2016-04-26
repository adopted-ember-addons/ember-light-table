import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Row, Column} from 'ember-light-table';

moduleForComponent('lt-cell', 'Integration | Component | lt cell', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{lt-cell}}`);

  assert.equal(this.$().text().trim(), '');
});


test('cell with column format', function(assert) {
  this.set('column', new Column({
    valuePath: 'num',
    format(value) {
      return value * 2;
    }
  }));

  this.set('row', new Row());

  this.render(hbs`{{lt-cell column=column rawValue=2 row=row}}`);

  assert.equal(this.$().text().trim(), '4');
});

test('cell format with no valuePath', function(assert) {
  this.set('column', new Column({
    format() {
      return this.get('row.num') * 2;
    }
  }));

  this.set('row', new Row({
    num: 2
  }));

  this.render(hbs`{{lt-cell column=column row=row}}`);

  assert.equal(this.$().text().trim(), '4');
});


test('cell with nested valuePath', function(assert) {
  this.set('column', new Column({
    valuePath: 'foo.bar.baz',
    format(value) {
      return value * 2;
    }
  }));

  this.set('row', new Row({
    foo: {
      bar: {
        baz: 2
      }
    }
  }));

  this.render(hbs`{{lt-cell column=column rawValue=(get row column.valuePath) row=row}}`);

  assert.equal(this.$().text().trim(), '4');

  Ember.run(() => this.get('row').set(this.get('column.valuePath'), 4));

  assert.equal(this.$().text().trim(), '8');
});
