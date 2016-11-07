import Ember from 'ember';

const {
  computed
} = Ember;

let sourceColumn;

export default Ember.Mixin.create({
  classNameBindings: ['isDragging', 'isDragTarget', 'dragDirection'],
  attributeBindings: ['isDraggable:draggable'],

  isDragging: false,
  isDragTarget: false,

  dragDirection: computed('isDragTarget', function() {
    if (this.get('isDragTarget')) {
      return `drag-${this._getDragDirection()}`;
    }
  }).readOnly(),

  dragColumnGroup: computed('column._group', function() {
    let columnGroup = this.get('column._group');
    return columnGroup ? columnGroup.get('subColumns') : this.get('table.columns');
  }).readOnly(),

  isDropTarget: computed(function() {
    /*
      A column is a valid drop target only if its in the same group
     */
    return this.get('column._group') === sourceColumn.get('_group');
  }).volatile().readOnly(),

  dragStart(e) {
    this._super(...arguments);

    let column = this.get('column');

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', column.get('columnId'));

    sourceColumn = column;
    this.set('isDragging', true);
    this.sendAction('onColumnDrag', sourceColumn, ...arguments);
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

  dragEnd(e) {
    this._super(...arguments);

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isDragTarget: false,
      isDragging: false
    });

    /*
      If sourceColumn still references a column, it means that a successful
      drop did not happen.
     */
    if (sourceColumn) {
      this.sendAction('onColumnDrop', sourceColumn, false, ...arguments);
      sourceColumn = null;
    }
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

    this.setProperties({
      isDragTarget: false,
      isDragging: false
    });

    this.sendAction('onColumnDrop', sourceColumn, true, ...arguments);
    sourceColumn = null;
  },

  _getDragDirection() {
    let columns = this.get('dragColumnGroup');
    let targetIdx = columns.indexOf(this.get('column'));
    let sourceIdx = columns.indexOf(sourceColumn);

    return (sourceIdx - targetIdx) < 0 ? 'right' : 'left';
  }
});
