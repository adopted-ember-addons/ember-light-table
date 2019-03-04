import Component from '@ember/component';
import layout from 'ember-light-table/templates/components/lt-foot';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';

/**
 * @module Light Table
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
 * The above examples using angle brackets (Ember 3.4+)
 *
 * ```hbs
 * <LightTable table as |t|>
 *   <t.foot onColumnClick=(action 'sortByColumn') />
 * </LightTable>
 * ```
 *
 * ```hbs
 * <LightTable table as |t|>
 *   <t.foot onColumnClick=(action 'sortByColumn') as |columns table|>
 *     {{#each columns as |column|}}
 *       {{!-- ... --}}
 *     {{/each}}
 *   </t.foot>
 * </LightTable>
 * ```
 * @class t.foot
 * @uses TableHeaderMixin
 */

export default Component.extend(TableHeaderMixin, {
  layout,
  classNames: ['lt-foot-wrap'],
  table: null,
  sharedOptions: null,
  sharedOptionsFixedKey: 'fixedFooter'
});
