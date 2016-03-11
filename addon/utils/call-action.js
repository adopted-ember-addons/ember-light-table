import Ember from 'ember';

export default function(target, action, ...params) {
  if (Ember.canInvoke(target.attrs, action)) {
    target.attrs[action](...params);
  }
}
