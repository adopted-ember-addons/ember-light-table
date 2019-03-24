import Helper from '@ember/component/helper';
import RowExpansionBehavior from 'ember-light-table/behaviors/row-expansion';

export default Helper.extend({

  compute(params, namedArgs) {
    return RowExpansionBehavior.create(namedArgs);
  }

});
