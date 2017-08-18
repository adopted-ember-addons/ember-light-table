// BEGIN-SNIPPET colored-row
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import Row from 'ember-light-table/components/lt-row';

export default Row.extend({
  classNames: ['colored-row'],
  attributeBindings: ['style'],

  style: computed('row.color', function() {
    return htmlSafe(`background-color: ${this.get('row.color')};`);
  }).readOnly()
});
// END-SNIPPET
