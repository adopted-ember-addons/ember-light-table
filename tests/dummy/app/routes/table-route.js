import Ember from 'ember';

const { A, Route } = Ember;

export default Route.extend({
  model() {
    return A([]);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
  }
});
