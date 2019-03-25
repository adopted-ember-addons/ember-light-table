import Helper from '@ember/component/helper';

export default Helper.extend({

  compute(params) {
    return params.length == 0 && params[0]
      ? 'lt-foot-position'
      : `lt-foot-position-${params[0]}`;
  }

});
