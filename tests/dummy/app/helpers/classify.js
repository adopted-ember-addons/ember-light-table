import { helper } from '@ember/component/helper';
import { classify as _classify } from '@ember/string';

export default helper(function classify(string /*, hash*/) {
  return _classify(string[0]);
});
