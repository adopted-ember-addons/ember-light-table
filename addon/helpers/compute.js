// https://github.com/DockYard/ember-composable-helpers/blob/master/addon/helpers/compute.js

import { helper } from '@ember/component/helper';

export function compute([action, ...params]) {
  console('own helper');
  return action(...params);
}

export default helper(compute);
