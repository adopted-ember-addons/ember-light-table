import config from 'ember-get-config';

const globalOptions = config['ember-light-table'] || {};

export default globalOptions;

export function mergeOptionsWithGlobals(options) {
  return Object.assign({}, globalOptions, options);
}
