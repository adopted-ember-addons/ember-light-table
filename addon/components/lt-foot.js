import classic from 'ember-classic-decorator';
import TableHeader from './table-header';
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
export default class LtFoot extends TableHeader {
  table = null;
  sharedOptions = null;
  sharedOptionsFixedKey = 'fixedFooter';
}
