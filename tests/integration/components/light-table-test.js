import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Table from 'ember-light-table';


moduleForComponent('light-table', 'Integration | Component | light table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.set('table', new Table());
  this.render(hbs`{{light-table table}}`);

  assert.equal(this.$().text().trim(), '');
});
