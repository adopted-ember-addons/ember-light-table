import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt-scrollable', 'Integration | Component | lt scrollable', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lt-scrollable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lt-scrollable}}
      template block text
    {{/lt-scrollable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
