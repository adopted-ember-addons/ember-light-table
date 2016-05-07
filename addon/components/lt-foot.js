import Ember from 'ember';
import layout from '../templates/components/lt-foot';
import TableHeaderMixin from '../mixins/table-header';

/**
 * @module Components
 */

/**
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{t.foot onColumnClick=(action 'sortByColumn')}}
 * {{/light-table}}
 * ```
 * If you want to define your own tfoot, just declare the contextual component in a block.
 *
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{#t.foot onColumnClick=(action 'sortByColumn') as |columns table|}}
 *     {{#each columns as |column|}}
 *       {{!-- ... --}}
 *     {{/each}}
 *   {{/t.foot}}
 * {{/light-table}}
 * ```
 *
 * will be empty
 * @class Foot
 * @uses TableColumnMixin
 */

export default Ember.Component.extend(TableHeaderMixin, {
  layout,
  classNames: ['lt-foot'],
  table: null
});
