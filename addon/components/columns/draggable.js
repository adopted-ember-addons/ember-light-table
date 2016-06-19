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

  _swapColumns(columns, draggedColumnName, staticColumnName, propertyName){
    let draggedIndex, staticIndex;
    columns.forEach((column, index) => {
      if (column.get(propertyName) === draggedColumnName) {
        draggedIndex = index;
      } else {
        if (column.get(propertyName) === staticColumnName) {
          staticIndex = index;
        }
      }
    });
    let temp = columns.objectAt(draggedIndex);
    columns.replace(draggedIndex, 1, [columns.objectAt(staticIndex)]);
    columns.replace(staticIndex, 1, temp);
  },

  drop(event) {
    event.preventDefault();
    this.set('isDragging', false);
    let columns = this.get('table.columns');
    let draggedColumn = JSON.parse(event.dataTransfer.getData('text/plain'));

    // table without groups...
    if(!draggedColumn.tableHasGroupColumns){
      if (draggedColumn.columnName !== staticName) {
        this._swapColumns(columns,draggedColumn.columnName,this.get('column.valuePath'), 'valuePath');
      }
    } else {
      // parentColumn...
      if(draggedColumn.hasSubcolumns){
        // swapping with parentColumn...
        if(this.get('column.subColumns')){
          this._swapColumns(columns,draggedColumn.columnName,this.get('column.label'),'label');
        }
      } else {
        // swapping subColumn with subColumn...
        if(!this.get('column.subColumns')){
          // part of the same group
          if(draggedColumn.parentColumn ===  this._findParentColumnName(this.get('column.valuePath'))) {
            columns.forEach(column => {
              if(column.get('label') === draggedColumn.parentColumn){
                this._swapColumns(column.get('subColumns'),draggedColumn.columnName,this.get('column.valuePath'), 'valuePath');
              }
            });
          }
        }
      }
    }   
  },

  _findParentColumnName(subColumnName){
    let result;
    this.get('table.columns').forEach(column => {
      column.get('subColumns').forEach(subcolumn => {
        if(subcolumn.valuePath === subColumnName){
          result = column.label;
        }
      });
    });
    return result;
  },

  _tableHasGroupColumns(){
    let result = false;
    this.get('table.columns').forEach(column => {
      if(column.get('subColumns')){
        result = true;
      }
    });
    return result;
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
    let obj = {};
    obj.tableHasGroupColumns = this._tableHasGroupColumns();
    if(obj.tableHasGroupColumns) {
      if(this.get('column.subColumns')){
        // in case of parentColumn...
        obj.hasSubcolumns = true;
        obj.columnName = this.get('column.label');
      } else {
        // in case of subColumn...
        obj.columnName = this.get('column.valuePath');
        obj.parentColumn = this._findParentColumnName(obj.columnName);
      }    
    } else {
      obj.columnName = this.get('column.valuePath');
    }
    event.dataTransfer.setData('text/plain', JSON.stringify(obj));
  }
});

export default draggable;