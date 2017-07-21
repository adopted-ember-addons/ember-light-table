import Ember from 'ember';
import layout from '../templates/components/lt-column-resizer';

const { $, Component, computed } = Ember;

const TOP_LEVEL_CLASS = '.ember-light-table';

export default Component.extend({
  layout,
  classNameBindings: [':lt-column-resizer', 'isResizing'],
  column: null,
  resizeOnDrag: false,

  isResizing: false,
  startWidth: null,
  startX: null,

  $column: computed(function() {
    return $(this.get('element')).parent('th');
  })
    .volatile()
    .readOnly(),

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
    let $column = this.get('$column');

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isResizing: true,
      startWidth: $column.outerWidth(),
      startX: e.pageX
    });

    this.$().closest(TOP_LEVEL_CLASS).addClass('is-resizing');
  },

  _mouseUp(e) {
    if (this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      let $column = this.get('$column');
      let width = `${$column.outerWidth()}px`;

      this.set('isResizing', false);
      this.set('column.width', width);

      this.sendAction('onColumnResized', width);
      this.$().closest(TOP_LEVEL_CLASS).removeClass('is-resizing');
    }
  },

  _mouseMove(e) {
    if (this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      let resizeOnDrag = this.get('resizeOnDrag');
      let minResizeWidth = this.get('column.minResizeWidth');
      let { startX, startWidth } = this.getProperties(['startX', 'startWidth']);
      let width = `${Math.max(
        startWidth + (e.pageX - startX),
        minResizeWidth
      )}px`;

      let $column = this.get('$column');
      let $index =
        this.get('table.visibleColumns').indexOf(this.get('column')) + 1;
      let $table = this.$().closest(TOP_LEVEL_CLASS);

      $column.outerWidth(width);
      $(`thead td.lt-scaffolding:nth-child(${$index})`, $table).outerWidth(
        width
      );
      $(`tfoot td.lt-scaffolding:nth-child(${$index})`, $table).outerWidth(
        width
      );

      if (resizeOnDrag) {
        $(`tbody td:nth-child(${$index})`, $table).outerWidth(width);
      }
    }
  }
});
