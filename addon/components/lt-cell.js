import Ember from 'ember';
import layout from '../templates/components/lt-cell';

const {
  get,
  computed
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

  value: computed('row', 'column', function() {
    let valuePath = this.get('column.valuePath');
    if(valuePath) {
      return get(this.get('row.data'), valuePath);
    }
  })
});
