import Ember from 'ember';
import SortableGroup from 'ember-sortable/components/sortable-group';
import layout from 'ember-sortable/templates/components/sortable-group';
const { get, set, typeOf } = Ember;

export default SortableGroup.extend({
  layout,

  update() {
    let sortedItems = this.get('sortedItems');
    // Position of the first element
    let position = this._itemPosition;

    // Just in case we haven’t called prepare first.
    if (position === undefined) {
      position = this.get('itemPosition');
    }

    sortedItems.forEach(item => {
      let dimension;
      let direction = this.get('direction');

      if (!get(item, 'isDragging')) {
        set(item, direction, position);
      }

      // add additional spacing around active element
      if (get(item, 'isBusy')) {
        position += get(item, 'spacing') * 2;
      }

      if (direction === 'x') {
        dimension = 'width';
      }
      if (direction === 'y') {
        dimension = 'height';
      }

      position += toNumber(get(item, dimension));
    });
  },
});

function toNumber(x) {
  switch (typeOf(x)) {
    case 'number':
      return x;
    case 'string':
      return Number(x.match(/\d+/)[0]);
    default:
      return Number(x);
  }
}
