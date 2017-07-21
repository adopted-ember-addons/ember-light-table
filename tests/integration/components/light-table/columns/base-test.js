import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Column } from 'ember-light-table';

moduleForComponent(
  'light-table/columns/base',
  'Integration | Component | Columns | base',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.set('column', new Column());
  this.render(hbs`{{light-table/columns/base column=column}}`);
  assert.equal(find('*').textContent.trim(), '');
});
