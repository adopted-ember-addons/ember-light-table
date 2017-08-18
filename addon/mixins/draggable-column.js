import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

let sourceColumn;

export default Mixin.create({
  classNameBindings: ['isDragging', 'isDragTarget', 'dragDirection'],
  attributeBindings: ['isDraggable:draggable'],

  isDragging: false,
  isDragTarget: false,

  dragDirection: computed('isDragTarget', function() {
    if (this.get('isDragTarget')) {
      let columns = this.get('dragColumnGroup');
      let targetIdx = columns.indexOf(this.get('column'));
      let sourceIdx = columns.indexOf(sourceColumn);
      let direction = (sourceIdx - targetIdx) < 0 ? 'right' : 'left';

      return `drag-${direction}`;
    }
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
  dragColumnGroup: computed('column.parent', function() {
    let parent = this.get('column.parent');
    return parent ? parent.get('subColumns') : this.get('table.columns');
  }).readOnly(),

  isDropTarget: computed(function() {
    let column = this.get('column');

    if (!column || !sourceColumn) { return false; }
    /*
     A column is a valid drop target only if its in the same group
     */
    return column.get('droppable') && column.get('parent') === sourceColumn.get('parent');
  }).volatile().readOnly(),

  dragStart(e) {
    this._super(...arguments);

    let column = this.get('column');

    if (!column) { return; }
    /*
     NOTE: IE requires setData type to be 'text'
     */
    e.dataTransfer.setData('text', column.get('columnId'));
    e.dataTransfer.effectAllowed = 'move';

    sourceColumn = column;
    this.set('isDragging', true);
    this.sendAction('onColumnDrag', sourceColumn, ...arguments);

    /*
     NOTE: This is a fix for Firefox to prevent the click event
     from being triggered after a drop.
     */
    this.__click__ = this.click;
    this.click = undefined;
  },

  dragEnter(e) {
    this._super(...arguments);

    if (this.get('isDropTarget')) {
      e.preventDefault();
      this.set('isDragTarget', this.get('column') !== sourceColumn);
    }
  },

  dragOver(e) {
    this._super(...arguments);

    if (this.get('isDropTarget')) {
      e.preventDefault();
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
      this.sendAction('onColumnDrop', sourceColumn, false, ...arguments);
      sourceColumn = null;
    }

    /*
     Restore click event
     */
    this._clickResetTimer = run.next(this, () => this.click = this.__click__);
  },

  drop(e) {
    this._super(...arguments);

    let table = this.get('table');
    let targetColumn = this.get('column');
    let columns = this.get('dragColumnGroup');

    let _columns = columns.toArray();
    let targetColumnIdx = _columns.indexOf(targetColumn);

    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
    e.stopPropagation();

    table.propertyWillChange('columns');

    _columns.removeObject(sourceColumn);
    _columns.insertAt(targetColumnIdx, sourceColumn);
    columns.setObjects(_columns);

    table.propertyDidChange('columns');

    this.setProperties({ isDragTarget: false, isDragging: false });

    this.sendAction('onColumnDrop', sourceColumn, true, ...arguments);
    sourceColumn = null;
  },

  destroy() {
    this._super(...arguments);
    run.cancel(this._clickResetTimer);
  }
});
