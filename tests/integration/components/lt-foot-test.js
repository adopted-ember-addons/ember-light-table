import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt-foot', 'Integration | Component | lt foot', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{lt-foot renderInPlace=true}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#lt-foot renderInPlace=true}}
      template block text
    {{/lt-foot}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
