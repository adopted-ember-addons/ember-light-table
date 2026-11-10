import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {
  attributeBindings,
  classNameBindings,
} from '@ember-decorators/component';
import { computed } from '@ember/object';
import { cancel, next } from '@ember/runloop';

let sourceColumn;

@classic
@classNameBindings('isDragging', 'isDragTarget', 'dragDirection')
@attributeBindings('isDraggable:draggable')
export default class TableHeader extends Component {
  isDragging = false;
  isDragTarget = false;

  @computed('column', 'dragColumnGroup', 'isDragTarget')
  get dragDirection() {
    if (this.isDragTarget) {
      let columns = this.dragColumnGroup;
      let targetIdx = columns.indexOf(this.column);
      let sourceIdx = columns.indexOf(sourceColumn);
      let direction = sourceIdx - targetIdx < 0 ? 'right' : 'left';

      return `drag-${direction}`;
    }

    return '';
  }

  /**
   * Array of Columns indicating where the column can be potentially dragged.
   * If the column is part of a group (has a parent column), this will be all of the columns in that group,
   * otherwise it's all of the columns in the table.
   *
   * @property dragColumnGroup
   * @type Array
   * @readonly
   */
  @computed('column.parent', 'table.columns')
  get dragColumnGroup() {
    let parent = this.column.get('parent');
    return parent ? parent.get('subColumns') : this.table.columns;
  }

  isDropTarget() {
    let column = this.column;
    /*
     A column is a valid drop target only if its in the same group
     */
    return (
      sourceColumn &&
      column.get('droppable') &&
      column.get('parent') === sourceColumn.get('parent')
    );
  }

  dragStart(e) {
    let column = this.column;

    /*
     NOTE: IE requires setData type to be 'text'
     */
    e.dataTransfer.setData('text', column.get('columnId'));
    e.dataTransfer.effectAllowed = 'move';

    sourceColumn = column;
    this.set('isDragging', true);
    this.onColumnDrag?.(sourceColumn, ...arguments);

    /*
     NOTE: This is a fix for Firefox to prevent the click event
     from being triggered after a drop.
     */
    this.__click__ = this.click;
    this.click = undefined;
  }

  dragEnter(e) {
    if (this.isDropTarget()) {
      e.preventDefault();
      this.set('isDragTarget', this.column !== sourceColumn);
    }
  }

  dragOver(e) {
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
  }

  dragLeave() {
    this.set('isDragTarget', false);
  }

  dragEnd() {
    this.setProperties({ isDragTarget: false, isDragging: false });

    /*
     If sourceColumn still references a column, it means that a successful
     drop did not happen.
     */
    if (sourceColumn) {
      this.onColumnDrop?.(sourceColumn, false, ...arguments);
      sourceColumn = null;
    }

    /*
     Restore click event
     */
    this._clickResetTimer = next(this, () => (this.click = this.__click__));
  }

  drop(e) {
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

      this.onColumnDrop?.(sourceColumn, true, ...arguments);
      sourceColumn = null;
    }
  }

  destroy() {
    super.destroy(...arguments);
    cancel(this._clickResetTimer);
  }
}
