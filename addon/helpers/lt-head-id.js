import Helper from '@ember/component/helper';

export default Helper.extend({

  compute(params) {
    return params.length == 0 && params[0]
      ? 'lt-head-position'
      : `lt-head-position-${params[0]}`;
  }

});
