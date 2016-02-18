import Ember from 'ember';

const {
  merge
} = Ember;

const defaultOptions = {
  data: null,
  expanded: false,
  selected: false
};

export default class Row extends Ember.Object {
  constructor(data) {
    if(data instanceof Row) {
      return data;
    }
    super();
    var options = merge({}, defaultOptions);
    options.data = data;
    Object.keys(options).forEach(k => this[k] = options[k]);
  }
}
