import { merge } from '@ember/polyfills';
import config from 'ember-get-config';

// eslint-disable-next-line ember-suave/no-direct-property-access
const globalOptions = config['ember-light-table'] || {};

export default globalOptions;

export function mergeOptionsWithGlobals(options) {
  return merge(merge({}, globalOptions), options);
}
