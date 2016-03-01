import Ember from 'ember';
import layout from '../templates/components/lt-foot';
import TableColumn from '../mixins/table-column';

export default Ember.Component.extend(TableColumn, {
  layout,
  tagName: 'tfoot',
  classNames: ['lt-foot'],
  table: null
});
