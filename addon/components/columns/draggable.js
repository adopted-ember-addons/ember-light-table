import Ember from 'ember';
import Base from 'ember-light-table/components/columns/base';
import layout from 'ember-light-table/templates/components/columns/base';

const {
  computed
} = Ember;

/**
 * @module Column Types
 * @class Draggable Column
 */
const draggable = Base.extend({
  layout,
  attributeBindings: ['width', 'colspan', 'rowspan', 'draggable'],
  classNameBindings: [
    'align',
    'isGroupColumn:lt-group-column',
    'isHideable',
    'isSortable',
    'isSorted',
    'column.classNames',
    'droptargetClass',
    'dragClass'
  ],

  draggable: true,
  dragClass: null,

  drop(event) {
    event.preventDefault();
    this.set('dragClass', null);
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

  droptargetClass: computed(function () {
    return 'droptarget';
  }),

  dragLeave(event) {
    event.preventDefault();
    this.set('dragClass', null);
  },

  dragOver(event) {
    event.preventDefault();
    this.set('dragClass', 'dragged-over');
  },

  dragStart(event) {
    event.dataTransfer.setData('text/plain', this.get('column.valuePath'));
  }

});

export default draggable;