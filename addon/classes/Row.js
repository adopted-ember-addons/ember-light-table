import Ember from 'ember';

const { get, computed, guidFor, isNone, isArray } = Ember;

function buildPassthroughProperty(defaultValue) {
  return computed('_passthroughMappings', {
    get(key) {
      let mappings = this.get('_passthroughMappings');

      if (!mappings || !mappings[key]) {
        let value = this.get('_passthroughBuffer')[key];
        return isNone(value) ? defaultValue : value;
      }

      let { path, isInverted } = mappings[key];
      let value = this.get(path);
      return isInverted ? !value : value;
    },
    set(key, value) {
      let mappings = this.get('_passthroughMappings');

      if (!mappings || !mappings[key]) {
        this.get('_passthroughBuffer')[key] = value;
        return value;
      }

      let { path, isInverted } = mappings[key];
      this.set(path, isInverted ? !value : value);
      return isInverted ? !this.get(path) : this.get(path);
    }
  });
}

/**
 * @module Table
 * @extends Ember.ObjectProxy
 * @class Row
 */
export default class Row extends Ember.ObjectProxy.extend({
  /**
   * Properties listed here are passed through to the `content` object instead
   * of getting shadowed by the `ObjectProxy` behavior of `Row`.
   *
   * You can use mappings similar to `classNameBindings` in `Ember.Component`.
   *
   * - `'selected'` - transparently pass through the `selected` property
   * - `'expanded:isShowingMore'` - map the `expanded` property to the
   *   `isShowingMore` property
   * - `'hidden:!visible'` - map the `hidden` property to the `visible` property
   *   and invert the value
   *
   * @property passthrough
   * @type {Array}
   * @default []
   */
  passthrough: computed(() => []),

  /**
   * Processed look-up object of `passthrough` for faster access.
   *
   * @property _passthroughMappings
   * @type {Object}
   * @private
   */
  _passthroughMappings: computed('passthrough.[]', function() {
    let passthroughMappings = {};
    let properties = this.get('passthrough');

    if (!isArray(properties) || !get(properties, 'length')) {
      return null;
    }

    // jshint ignore:start
    properties.forEach((p) => {
      let [, mapFrom, isInverted = false, mapTo = mapFrom] =
        /^(\w+)(?::(!?)(\w+))?$/.exec(p);
      if (mapFrom) {
        passthroughMappings[mapFrom] = {
          mapFrom,
          mapTo,
          isInverted: Boolean(isInverted),
          path: `content.${mapTo}`
        };
      }
    });
    // jshint ignore:end

    return passthroughMappings;
  }),

  /**
   * Internal buffer for properties that are the defined on the `Row` object
   * itself, but not passed through to the `content` object.
   *
   * @property _passthroughMappings
   * @type {Object}
   * @private
   */
  _passthroughBuffer: computed(() => ({})),

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
  hidden: buildPassthroughProperty(false),

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
  expanded: buildPassthroughProperty(false),

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
  selected: buildPassthroughProperty(false),

  /**
   * Class names to be applied to this row
   *
   * @property classNames
   * @type {String | Array}
   */
  classNames: buildPassthroughProperty(),

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
}) {
  /**
   * @class Row
   * @constructor
   * @param {Object} content
   * @param {Object} options
   */
  constructor(content, options = {}) {
    if (content instanceof Row) {
      return content;
    }

    super();
    this.setProperties(options);
    this.set('content', content);
  }
}
