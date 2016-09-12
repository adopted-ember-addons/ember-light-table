import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('user', { page: 1, limit: 10 });
  },

  setupController(controller, model) {
    controller.set('model', model.toArray());
  },

  resetController: function(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
  }
});
