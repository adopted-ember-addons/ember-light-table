import Ember from 'ember';
import layout from '../templates/components/lt-head';
import TableHeaderMixin from '../mixins/table-header';

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
 * If you want to define your own thead, just declare the contextual component in a block.
 *
 * ```hbs
 * {{#light-table table as |t|}}
 *   {{#t.head onColumnClick=(action 'sortByColumn') as |groups subColumns table|}}
 *     {{#each groups as |group|}}
 *       {{!-- ... --}}
 *     {{/each}}
 *   {{/t.head}}
 * {{/light-table}}
 * ```
 *
 * If you dont have grouped columns, the yielded `groups` will be an array of all visibile columns and `subColumns`
 * will be empty
 *
 * @class Head
 * @uses TableColumnMixin
 */

export default Ember.Component.extend(TableHeaderMixin, {
  layout,
  classNames: ['lt-head-wrap'],
  table: null
});
