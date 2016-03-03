import Ember from 'ember';
import layout from '../templates/components/lt-head';
import TableColumnMixin from '../mixins/table-column';

/**
 * @module Components
 */

/**
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{t.head onColumnClick=(action 'sortByColumn')}}
 * {{/light-table}}
 * ```
 *
 * @class Head
 * @uses TableColumnMixin
 */

export default Ember.Component.extend(TableColumnMixin, {
  layout,
  tagName: 'thead',
  classNames: ['lt-head'],
  table: null
});
