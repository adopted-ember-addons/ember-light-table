import Ember from 'ember';
import layout from 'ember-light-table/templates/components/lt-head';
import TableHeaderMixin from 'ember-light-table/mixins/table-header';

const {
  assert,
  Component,
  isEmpty,
  set
} = Ember;

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

  init() {
    this._super(...arguments);

    let sharedOptions = this.get('sharedOptions') || {};
    let fixed = this.get('fixed');

    assert('[ember-light-table] The height property is required for fixed header', !fixed || fixed && !isEmpty(sharedOptions.height));

    set(sharedOptions, 'fixedHeader', fixed);
  }
});
