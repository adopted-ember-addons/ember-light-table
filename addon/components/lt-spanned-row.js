import Component from '@ember/component';
import layout from 'ember-light-table/templates/components/lt-spanned-row';

export default Component.extend({
  layout,
  colspan: 1,
  tagName: '',
  visible: true,
});
