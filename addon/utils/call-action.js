import Ember from 'ember';

export default function(action, ...params) {
  if (Ember.canInvoke(this.attrs, action)) {
    this.attrs[action](...params);
  }
}
