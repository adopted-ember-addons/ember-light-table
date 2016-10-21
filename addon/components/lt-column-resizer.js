import Ember from 'ember';
import layout from '../templates/components/lt-column-resizer';

const {
  $
} = Ember;

export default Ember.Component.extend({
  layout,
  classNameBindings: [':lt-column-resizer', 'isResizing'],
  column: null,
  resizeOnDrag: false,

  isResizing: false,
  startWidth: null,
  startX: null,

  didInsertElement() {
    this._super(...arguments);

    this.__mouseMove = this._mouseMove.bind(this);
    this.__mouseUp = this._mouseUp.bind(this);

    $(document).on('mousemove', this.__mouseMove);
    $(document).on('mouseup', this.__mouseUp);
  },

  willDestroyElement() {
    this._super(...arguments);

    $(document).off('mousemove', this.__mouseMove);
    $(document).off('mouseup', this.__mouseUp);
  },

  click(e) {
    /*
      Prevent click events from propagating (i.e. onColumnClick)
     */
    e.preventDefault();
    e.stopPropagation();
  },

  mouseDown(e) {
    let $column = this._getColumn();

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isResizing: true,
      startWidth: $column.width(),
      startX: e.pageX
    });
  },

  _mouseUp(e) {
    if (this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      let $column = this._getColumn();

      this.set('isResizing', false);
      this.set('column.width', `${$column.width()}px`);
      this.sendAction('columnResized', this.get('column.width'));
    }
  },

  _mouseMove(e) {
    if (this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      let resizeOnDrag = this.get('resizeOnDrag');
      let $column = this._getColumn();
      let { startX, startWidth } = this.getProperties(['startX', 'startWidth']);
      let width = startWidth + (e.pageX - startX);

      if (resizeOnDrag) {
        this.set('column.width', `${width}px`);
      } else {
        $column.width(`${width}px`);
      }
    }
  },

  _getColumn() {
    return $(this.get('element')).parent('th');
  }
});
