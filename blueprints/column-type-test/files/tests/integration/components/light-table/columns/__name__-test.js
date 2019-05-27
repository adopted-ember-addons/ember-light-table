import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Column } from 'ember-light-table';

moduleForComponent('light-table/columns/<%= dasherizedModuleName %>', 'Integration | Component | Columns | <%= dasherizedModuleName %>', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{light-table/columns/<%= dasherizedModuleName %>}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders label', function(assert) {
  this.set('column', Column.create({ label: '<%= dasherizedModuleName %>' }));

  this.render(hbs`{{light-table/columns/<%= dasherizedModuleName %> column}}`);

  assert.equal(this.$().text().trim(), '<%= dasherizedModuleName %>');
});
