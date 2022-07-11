import classic from 'ember-classic-decorator';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from '../config/environment';

@classic
export default class Application extends JSONAPIAdapter {
  namespace = `${ENV.rootURL}api`;
}
