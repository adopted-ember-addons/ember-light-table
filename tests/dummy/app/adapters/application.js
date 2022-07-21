import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from '../config/environment';

export default class Application extends JSONAPIAdapter {
  namespace = `${ENV.rootURL}api`;
}
