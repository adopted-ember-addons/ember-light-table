import { assign } from '@ember/polyfills';
import config from 'ember-get-config';

const globalOptions = config['ember-light-table'] || {};

export default globalOptions;

export function mergeOptionsWithGlobals(options) {
  return assign({}, globalOptions, options);
}
