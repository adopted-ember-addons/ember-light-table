import Ember from 'ember';
import layout from '../templates/components/lt-cell';

const {
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
  }),

  isSorted: computed.readOnly('column.sorted'),

  width: computed.readOnly('column.width'),

  init() {
    this._super(...arguments);
    let valuePath = this.get('column.valuePath');
    if(valuePath) {
      defineProperty(this, 'value', computed.readOnly(`row.${valuePath}`));
    }
  }
});
