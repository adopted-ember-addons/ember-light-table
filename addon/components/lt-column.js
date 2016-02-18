import Ember from 'ember';
import layout from '../templates/components/lt-column';

const {
  isEmpty,
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'th',
  classNames: ['lt-column'],
  attributeBindings: ['width', 'colspan', 'rowspan'],
  classNameBindings: ['align', 'isGroup:lt-group-column'],
  column: null,

  width: computed.oneWay('column.width'),

  isGroup: computed.oneWay('column.isVisibleGroupColumn'),

  colspan: computed('column', 'column.visibleSubColumns.[]', function() {
    let subColumns = this.get('column.visibleSubColumns');
    return !isEmpty(subColumns) ? subColumns.length : 1;
  }),

  rowspan: computed('isGroup', 'column.visibleSubColumns.[]', function() {
    let subColumns = this.get('column.visibleSubColumns');
    return !isEmpty(subColumns) ? 1 : 2;
  }),

  align: computed('column.align', function() {
    return `lt-align-${this.get('column.align')}`;
  })
});
