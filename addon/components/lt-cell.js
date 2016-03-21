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
  classNameBindings: ['align', 'isSorted'],

  column: null,
  row: null,
  tableActions: null,

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }),

  isSorted: computed.oneWay('column.sorted'),

  init() {
    this._super(...arguments);
    let valuePath = this.get('column.valuePath');
    if(valuePath) {
      defineProperty(this, 'value', computed.readOnly(`row.${valuePath}`));
    }
  }
});
