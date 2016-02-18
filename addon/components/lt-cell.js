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
  classNameBindings: ['align'],
  column: null,
  row: null,

  align: computed('column.align', function() {
    return `lt-align-${this.get('column.align')}`;
  }),

  value: computed('row', 'column', function() {
    let valuePath = this.get('column.valuePath');
    if(valuePath) {
      return get(this.get('row.data'), valuePath);
    }
  })
});
