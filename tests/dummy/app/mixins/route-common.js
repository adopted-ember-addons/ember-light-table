// BEGIN-SNIPPET route-common
import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Mixin.create({
  page: 1,
  limit: 10,
  dir: 'asc',
  sort: 'firstName',

  model() {
    return this.get('fetchRecords').perform();
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.setProperties({
      fetchRecords: this.get('fetchRecords'),
      sort: this.get('sort')
    });
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      this.set('page', 1);
    }
  },

  actions: {
    fetchMore() {
      this.incrementProperty('page');
      this.refresh();
    },

    onSort({ dir = 'asc', sort = 'firstName', page = 1 }) {
      this.setProperties({
        dir,
        sort,
        page
      });
      this.refresh();
    }
  },

  fetchRecords: task(function*() {
    return yield this.get('store').query('user', this.getProperties(['page', 'limit', 'sort', 'dir']));
  }).restartable()
});
// END-SNIPPET
