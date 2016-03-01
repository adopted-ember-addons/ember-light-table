import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt-spanned-row', 'Integration | Component | lt spanned row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{lt-spanned-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#lt-spanned-row}}
      template block text
    {{/lt-spanned-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
