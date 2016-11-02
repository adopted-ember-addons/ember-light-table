import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.A([]);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
  }
});
