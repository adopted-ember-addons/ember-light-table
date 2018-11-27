import Helper from '@ember/component/helper';
import MultiSelectBehavior from 'ember-light-table/behaviors/multi-select';

export default Helper.extend({

  compute(params, namedArgs) {
    return MultiSelectBehavior.create(namedArgs);
  }

});
