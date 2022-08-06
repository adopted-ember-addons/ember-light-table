import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';
import { tagName } from '@ember-decorators/component';

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

@classic
@tagName('')
export default class LtFoot extends Component.extend(TableHeaderMixin) {
  table = null;
  sharedOptions = null;
  sharedOptionsFixedKey = 'fixedFooter';
}
