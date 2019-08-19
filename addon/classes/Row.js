import ObjectProxy from '@ember/object/proxy';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import fixProto from 'ember-light-table/utils/fix-proto';

/**
 * @module Table
 * @extends Ember.ObjectProxy
 * @class Row
 */
export default class Row extends ObjectProxy.extend({
  /**
   * Whether the row is hidden.
   *
   * CSS Classes:
   *  - `is-hidden`
   *
   * @property hidden
   * @type {Boolean}
   * @default false
   */
  hidden: false,

  /**
   * Whether the row is expanded.
   *
   * CSS Classes:
   *  - `is-expanded`
   *
   * @property expanded
   * @type {Boolean}
   * @default false
   */
  expanded: false,

  /**
   * Whether the row is selected.
   *
   * CSS Classes:
   *  - `is-selected`
   *
   * @property selected
   * @type {Boolean}
   * @default false
   */
  selected: false,

  /**
   * Class names to be applied to this row
   *
   * @property classNames
   * @type {String | Array}
   */
  classNames: null,

  /**
   * Data content for this row. Since this class extends Ember.ObjectProxy,
   * all properties are forwarded to the content. This means that instead of
   * `row.content.foo` you can just do `row.foo`. Please note that methods are
   * not forwarded. You will not be able to do `row.save()`, instead, you would have
   * to do `row.content.save()`.
   *
   * @property content
   * @type {Object}
   */
  content: null,

  /**
   * Rows's unique ID.
   *
   * Note: named `rowId` in order to not shadow the `content.id` property.
   *
   * @property rowId
   * @type {String}
   * @readOnly
   */
  rowId: computed(function() {
    return guidFor(this);
  }).readOnly()
}) {}

// https://github.com/offirgolan/ember-light-table/issues/436#issuecomment-310138868
fixProto(Row);
