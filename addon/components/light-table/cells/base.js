import Ember from 'ember';
import layout from '../../../templates/components/light-table/cells/base';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'td',
  classNames: ['lt-cell'],
  attributeBindings: ['width'],
  classNameBindings: ['align', 'isSorted', 'column.cellClassNames'],

  column: null,
  row: null,
  tableActions: null,

  rawValue: null,

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

  isSorted: computed.readOnly('column.sorted'),

  width: computed.readOnly('column.width'),

  value: computed('rawValue', function() {
    const rawValue = this.get('rawValue');
    const format = this.get('column.format');
    if(format && typeof format === 'function') {
      return format.call(this, rawValue);
    }
    return rawValue;
  }).readOnly()
});
