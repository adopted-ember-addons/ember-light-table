import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('user', {page: 1, limit: 20});
  },

  setupController(controller, model) {
    controller.get('table').setRows(model.toArray());
  }
});
