import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Table from 'ember-light-table';

moduleForComponent('lt-row', 'Integration | Component | lt row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{lt-row}}`);

  assert.equal(find('*').textContent.trim(), '');
});

test('it accepts a string as `valuePath`', function(assert) {
  this.set('columns', Table.createColumns([
    {
      valuePath: 'foo',
      format(value) {
        return `${typeof value} "${value}"`;
      }
    }
  ]));
  this.set('row', { foo: 'hello' });

  this.render(hbs`{{lt-row row columns}}`);

  assert.equal(find('*').textContent.trim(), 'string "hello"');
});

test('it accepts an array as `valuePath`', function(assert) {
  this.set('columns', Table.createColumns([
    {
      valuePath: ['foo', 'bar'],
      format(values) {
        return values.join(' ');
      }
    }
  ]));
  this.set('row', { foo: 'hello', bar: 'world' });

  this.render(hbs`{{lt-row row columns}}`);

  assert.equal(find('*').textContent.trim(), 'hello world');
});
