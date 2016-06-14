import Ember from 'ember';
import Base from 'ember-light-table/components/columns/base';

const {
  computed
} = Ember;

/**
 * @module Column Types
 * @class Draggable Column
 */
const draggable = Base.extend({
  attributeBindings: ['draggable','droptarget'],
  classNameBindings: ['isDragging:dragged-over'],

  draggable: true,
  isDragging: false,

  drop(event) {
    event.preventDefault();
    this.set('isDragging', false);
    let draggedName = event.dataTransfer.getData('text/plain');
    let staticName = this.get('column.valuePath');
    if (draggedName !== staticName) {
      const table = this.get('table');
      let draggedIndex, staticIndex, draggedColumn, staticColumn;
      table.columns.forEach((column, index) => {
        if (column.valuePath === draggedName) {
          draggedIndex = index;
          draggedColumn = column;
        } else {
          if (column.valuePath === staticName) {
            staticIndex = index;
            staticColumn = column;
          }
        }
      });

      let columns = table.columns;
      let temp = columns.objectAt(draggedIndex);
      columns.replace(draggedIndex, 1, [columns.objectAt(staticIndex)]);
      columns.replace(staticIndex, 1, temp);
    }
  },

  dragLeave(event) {
    event.preventDefault();
    this.set('isDragging', false);
  },

  dragOver(event) {
    event.preventDefault();
    this.set('isDragging', true);
  },

  dragStart(event) {
    event.dataTransfer.setData('text/plain', this.get('column.valuePath'));
  }

});

export default draggable;