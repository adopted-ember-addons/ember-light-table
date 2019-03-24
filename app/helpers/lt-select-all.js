import Helper from '@ember/component/helper';
import SelectAllBehavior from 'ember-light-table/behaviors/select-all';

export default Helper.extend({

  compute() {
    return SelectAllBehavior.create();
  }

});
