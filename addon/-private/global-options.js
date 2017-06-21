import Ember from 'ember';
import config from 'ember-get-config';

// eslint-disable-next-line ember-suave/no-direct-property-access
const assign = Ember.assign || Ember.merge;
const globalOptions = config['ember-light-table'] || {};

export default globalOptions;

export function mergeOptionsWithGlobals(options) {
  return assign(assign({}, globalOptions), options);
}
