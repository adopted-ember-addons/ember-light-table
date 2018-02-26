import Component from '@ember/component';
import layout from 'ember-light-table/templates/components/lt-head';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';

/**
 * @module Light Table
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
 *   {{#t.head onColumnClick=(action 'sortByColumn') as |groups subColumns|}}
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
 * @class t.head
 * @uses TableHeaderMixin
 */

export default Component.extend(TableHeaderMixin, {
  layout,
  classNames: ['lt-head-wrap'],
  table: null,
  sharedOptions: null,
  sharedOptionsFixedKey: 'fixedHeader'
});
