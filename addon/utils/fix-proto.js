/**
 * @module Utils
 * @private
 */

/**
 * Internet Explorer <= 10 has no support for `__proto__`.
 * This conditional polyfill works around that, so that static methods like
 * `reopen` may be used. There are some caveats though.
 *
 * For more information, please see: [Issue #436 (comment)][436]
 *
 * [436]: https://github.com/offirgolan/ember-light-table/issues/436#issuecomment-310138868
 *
 * @class fixProto
 */

/**
 * Whether or not this environment supports `__proto__`.
 * IE <= 10 is known to not support it-
 *
 * More information on `__proto__`:
 *
 *   https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/proto
 *
 * @const isProtoSupported
 * @type {Boolean}
 * @readOnly
 */
// prettier-ignore
export const isProtoSupported = ({ __proto__: [] }) instanceof Array;

/**
 * Assigns all properties of `defaults` to `obj`, if they are not already
 * defined on `obj`. This means that `obj` is mutated in place.
 *
 * Taken from:
 *
 *   https://github.com/babel/babel/blob/64eafad472ebac6333671fff65a9669739e6cd88/packages/babel-helpers/src/helpers.js#L287-L299
 *
 * @method defaults
 * @param  {Object} obj      The object to assign the default properties to
 * @param  {Object} defaults The object that provides all default properties to
 *                           be assigned
 * @return {Object}          The `obj` that was passed in
 */
export function defaults(obj, defaults) {
  const keys = Object.getOwnPropertyNames(defaults);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = Object.getOwnPropertyDescriptor(defaults, key);
    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }
  return obj;
}

/**
 * Conditionally attempt to polyfill support for `__proto__` in environments
 * that do not support it.
 *
 * If `__proto__` is not supported, this function assigns all properties and
 * methods pf `Class.__proto__` to `Class` itself.
 *
 * @method fixProto
 * @param  {Function} Class The base class
 * @return {Function}       The `Class` that was passed in
 */
export default function fixProto(Class) {
  if (isProtoSupported) {
    return;
  }

  // https://github.com/babel/babel/tree/64eafad472ebac6333671fff65a9669739e6cd88/packages/babel-plugin-transform-proto-to-assign#example
  return defaults(Class, Class.__proto__);
}
