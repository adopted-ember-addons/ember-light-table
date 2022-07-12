// BEGIN-SNIPPET colored-row
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Row from 'ember-light-table/components/lt-row';

export default Row.extend({
  classNames: ['colored-row'],
  attributeBindings: ['style'],

  style: computed('row.color', function () {
    return htmlSafe(`background-color: ${this.row.color};`);
  }).readOnly(),
});
// END-SNIPPET
