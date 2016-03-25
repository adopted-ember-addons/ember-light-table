import Ember from 'ember';
import layout from '../templates/components/lt-cell';

const {
  isEmpty,
  computed,
  defineProperty
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'td',
  classNames: ['lt-cell'],
  attributeBindings: ['width'],
  classNameBindings: ['align', 'isSorted'],

  column: null,
  row: null,
  tableActions: null,

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

  isSorted: computed.readOnly('column.sorted'),

  width: computed.readOnly('column.width'),

  init() {
    this._super(...arguments);
    const valuePath = this.get('column.valuePath');

    if(!isEmpty(valuePath)) {
      defineProperty(this, '_rawValue', computed.readOnly(`row.${valuePath}`));
    }
    defineProperty(this, 'value', computed('_rawValue', this._getValue).readOnly());
  },

  _getValue() {
    const value = this.get('_rawValue');
    const formatter = this.get('column.formatter');
    if(formatter && typeof formatter === 'function') {
      return formatter.call(this, value);
    }
    return value;
  }
});
