// BEGIN-SNIPPET colored-row
import Ember from 'ember';
import Row from 'ember-light-table/components/lt-row';

const { computed, String: { htmlSafe } } = Ember;

export default Row.extend({
  classNames: ['colored-row'],
  attributeBindings: ['style'],

  style: computed('row.color', function() {
    return htmlSafe(`background-color: ${this.get('row.color')};`);
  }).readOnly()
});
// END-SNIPPET
