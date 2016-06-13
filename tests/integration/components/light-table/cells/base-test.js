import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { renderCell } from '../../../../helpers/ember-light-table';
import { Row, Column} from 'ember-light-table';

moduleForComponent('light-table/cells/base', 'Integration | Component | Cells | base', {
  integration: true
});

test('it renders', function(assert) {
  renderCell(this, 'base');

  assert.equal(this.$().text().trim(), '');
});


test('cell with column format', function(assert) {
  this.set('column', new Column({
    valuePath: 'num',
    format(value) {
      return value * 2;
    }
  }));

  this.set('row', new Row({
    num: 2
  }));

  renderCell(this, 'base');

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

  renderCell(this, 'base');

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

  renderCell(this, 'base');

  assert.equal(this.$().text().trim(), '4');

  Ember.run(() => this.get('row').set(this.get('column.valuePath'), 4));

  assert.equal(this.$().text().trim(), '8');
});
