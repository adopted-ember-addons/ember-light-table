import Ember from 'ember';
import layout from '../templates/components/lt-column-resize';

const {
  $
} = Ember;

export default Ember.Component.extend({
  layout,
  classNameBindings: [':lt-column-resize', 'isResizing'],
  column: null,
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

  mouseDown(e) {
    const $column = $(this.get('element')).parent('th');

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isResizing: true,
      startWidth: $column.width(),
      startX: e.pageX
    });
  },

  _mouseUp(e) {
    if(this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      this.set('isResizing', false);
      this.sendAction('columnResized', this.get('column.width'));
    }
  },

  _mouseMove(e) {
    if(this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      const { startX, startWidth } = this.getProperties(['startX', 'startWidth']);
      const width = startWidth + (e.pageX - startX);

      this.set('column.width', `${width}px`);
    }
  }
});
