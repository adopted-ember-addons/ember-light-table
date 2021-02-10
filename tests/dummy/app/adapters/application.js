import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from '../config/environment';

export default JSONAPIAdapter.extend({
  namespace: `${ENV.rootURL}api`
});
