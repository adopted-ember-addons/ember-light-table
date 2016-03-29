import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Row, Column} from 'ember-light-table';

moduleForComponent('lt-cell', 'Integration | Component | lt cell', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{lt-cell}}`);

  assert.equal(this.$().text().trim(), '');
});


test('cell with column format', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.set('column', new Column({
    valuePath: 'num',
    format(value) {
      return value * 2;
    }
  }));

  this.set('row', new Row({
    num: 2
  }));

  this.render(hbs`{{lt-cell column=column row=row}}`);

  assert.equal(this.$().text().trim(), '4');
});

test('cell format with no valuePath', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
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
