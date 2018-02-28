import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('lt-infinity', 'Integration | Component | lt infinity', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{lt-infinity}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#lt-infinity}}
      template block text
    {{/lt-infinity}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
