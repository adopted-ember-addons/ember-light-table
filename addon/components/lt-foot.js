import Component from '@ember/component';
import layout from 'ember-light-table/templates/components/lt-foot';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';

/**
 * @module Light Table
 */

/**
 * ```hbs
 * <LightTable @table={{this.table}} as |t|>
 *   <t.foot @onColumnClick={{this.sortByColumn}} />
 * </LightTable>
 * ```
 * If you want to define your own tfoot, just declare the contextual component in a block.
 *
 * ```hbs
 * <LightTable @table={{this.table}} as |t|>
 *   <t.foot @onColumnClick={{this.sortByColumn}} as |columns table|?
 *     {{#each columns as |column|}}
 *       {{!-- ... --}}
 *     {{/each}}
 *   </t.foot>
 * </LightTable>
 * ```
 *
 * will be empty
 *
 * @class t.foot
 * @uses TableHeaderMixin
 */

export default Component.extend(TableHeaderMixin, {
  layout,
  classNames: ['lt-foot-wrap'],
  table: null,
  sharedOptions: null,
  sharedOptionsFixedKey: 'fixedFooter',
});
