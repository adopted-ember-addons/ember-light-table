import Component from '@ember/component';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';
import classic from 'ember-classic-decorator';

/**
 * @module Light Table
 */

/**
 * ```hbs
 * <LightTable @table={{this.table}} as |t|>
 *   {{t.head @onColumnClick=(action 'sortByColumn')}}
 * </LightTable>
 * ```
 *
 * If you want to define your own thead, just declare the contextual component in a block.
 *
 * ```hbs
 * <LightTable @table={{this.table}} as |t|>
 *   <t.head @onColumnClick={{this.sortByColumn}} as |groups subColumns|>
 *     {{#each groups as |group|}}
 *       {{!-- ... --}}
 *     {{/each}}
 *   </t.head>
 * </LightTable>
 * ```
 *
 * If you dont have grouped columns, the yielded `groups` will be an array of all visibile columns and `subColumns`
 * will be empty
 *
 * @class t.head
 * @uses TableHeaderMixin
 */

@classic
export default class LtHeadComponent extends Component.extend(
  TableHeaderMixin
) {
  table = null;
  sharedOptions = null;
  sharedOptionsFixedKey = 'fixedHeader';
}
