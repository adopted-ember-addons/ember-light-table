import { A } from '@ember/array';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return A([]);
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('page', 1);
    }
  },
});
