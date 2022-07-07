import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

let sourceColumn;

export default Mixin.create({
  classNameBindings: ['isDragging', 'isDragTarget', 'dragDirection'],
  attributeBindings: ['isDraggable:draggable'],

  isDragging: false,
  isDragTarget: false,

  dragDirection: computed('column', 'dragColumnGroup', 'isDragTarget', function() {
    if (this.isDragTarget) {
      let columns = this.dragColumnGroup;
      let targetIdx = columns.indexOf(this.column);
      let sourceIdx = columns.indexOf(sourceColumn);
      let direction = (sourceIdx - targetIdx) < 0 ? 'right' : 'left';

      return `drag-${direction}`;
    }

    return '';
  }).readOnly(),

  /**
   * Array of Columns indicating where the column can be potentially dragged.
   * If the column is part of a group (has a parent column), this will be all of the columns in that group,
   * otherwise it's all of the columns in the table.
   *
   * @property dragColumnGroup
   * @type Array
   * @readonly
   */
  dragColumnGroup: computed('column.parent', 'table.columns', function() {
    let parent = this.column.get('parent');
    return parent ? parent.get('subColumns') : this.table.columns;
  }).readOnly(),

  isDropTarget() {
    let column = this.column;
    /*
     A column is a valid drop target only if its in the same group
     */
    return sourceColumn && column.get('droppable') && column.get('parent') === sourceColumn.get('parent');
  },

  dragStart(e) {
    this._super(...arguments);

    let column = this.column;

    /*
     NOTE: IE requires setData type to be 'text'
     */
    e.dataTransfer.setData('text', column.get('columnId'));
    e.dataTransfer.effectAllowed = 'move';

    sourceColumn = column;
    this.set('isDragging', true);
    this.onColumnDrag(sourceColumn, ...arguments);

    /*
     NOTE: This is a fix for Firefox to prevent the click event
     from being triggered after a drop.
     */
    this.__click__ = this.click;
    this.click = undefined;
  },

  dragEnter(e) {
    this._super(...arguments);

    if (this.isDropTarget()) {
      e.preventDefault();
      this.set('isDragTarget', this.column !== sourceColumn);
    }
  },

  dragOver(e) {
    this._super(...arguments);

    if (this.isDropTarget()) {
      e.preventDefault();
      /*
        NOTE: dragLeave will be triggered by any child elements inside the
        column. This code ensures the column being dragged over continues to be
        identified as the current drop target
       */
      if (!this.isDragTarget) {
        this.set('isDragTarget', this.column !== sourceColumn);
      }
    }
  },

  dragLeave() {
    this._super(...arguments);
    this.set('isDragTarget', false);
  },

  dragEnd() {
    this._super(...arguments);

    this.setProperties({ isDragTarget: false, isDragging: false });

    /*
     If sourceColumn still references a column, it means that a successful
     drop did not happen.
     */
    if (sourceColumn) {
      this.onColumnDrop(sourceColumn, false, ...arguments);
      sourceColumn = null;
    }

    /*
     Restore click event
     */
    this._clickResetTimer = run.next(this, () => this.click = this.__click__);
  },

  drop(e) {
    this._super(...arguments);

    let targetColumn = this.column;
    if (targetColumn.droppable) {
      let table = this.table;
      let columns = this.dragColumnGroup;

      let targetColumnIdx = columns.indexOf(targetColumn);

      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      e.stopPropagation();

      columns.removeObject(sourceColumn);
      columns.insertAt(targetColumnIdx, sourceColumn);

      table.notifyPropertyChange('columns');

      this.setProperties({ isDragTarget: false, isDragging: false });

      this.onColumnDrop(sourceColumn, true, ...arguments);
      sourceColumn = null;
    }
  },

  destroy() {
    this._super(...arguments);
    run.cancel(this._clickResetTimer);
  },

  // Noop for passed actions
  onColumnDrag() {},
  onColumnDrop() {}
});
