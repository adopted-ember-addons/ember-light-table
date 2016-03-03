import Ember from 'ember';
import layout from '../templates/components/lt-foot';
import TableColumnMixin from '../mixins/table-column';

/**
 * @module Components
 */

/**
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{t.foot onColumnClick=(action 'sortByColumn')}}
 * {{/light-table}}
 * ```
 *
 * @class Foot
 * @uses TableColumnMixin
 */

export default Ember.Component.extend(TableColumnMixin, {
  layout,
  tagName: 'tfoot',
  classNames: ['lt-foot'],
  table: null
});
