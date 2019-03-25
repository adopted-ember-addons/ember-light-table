import Helper from '@ember/component/helper';
import SingleSelectBehavior from 'ember-light-table/behaviors/single-select';

export default Helper.extend({

  compute() {
    return SingleSelectBehavior.create();
  }

});
