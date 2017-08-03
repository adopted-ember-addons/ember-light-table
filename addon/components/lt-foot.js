import Component from '@ember/component';
import { get, trySet } from '@ember/object';
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

  init() {
    this._super(...arguments);

    trySet(this, 'sharedOptions.fixedFooter', get(this, 'fixed'));
  }
});
