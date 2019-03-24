import Behavior from 'ember-light-table/behaviors/behavior';
import { keyDown } from 'ember-keyboard';

export default Behavior.extend({

  exclusionGroup: 'can-select',

  init() {
    this._super(...arguments);
    this.events.onSelectAll = [keyDown('cmd+KeyA')];
  },

  onSelectAll(ltBody, e) {
    ltBody.get('table').selectAll();
    e.preventDefault();
  }

});
