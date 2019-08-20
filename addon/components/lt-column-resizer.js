import Component from '@ember/component';
import { get } from '@ember/object';
import closest from 'ember-light-table/utils/closest';
import layout from '../templates/components/lt-column-resizer';

const TOP_LEVEL_CLASS = '.ember-light-table';

export default Component.extend({
  layout,
  classNameBindings: [':lt-column-resizer', 'isResizing'],
  column: null,
  resizeOnDrag: false,

  isResizing: false,
  startWidth: null,
  startX: null,

  colElement() {
    return get(this, 'element').parentNode;
  },

  didInsertElement() {
    this._super(...arguments);

    this.__mouseMove = this._mouseMove.bind(this);
    this.__mouseUp = this._mouseUp.bind(this);

    document.addEventListener('mousemove', this.__mouseMove);
    document.addEventListener('mouseup', this.__mouseUp);
  },

  willDestroyElement() {
    this._super(...arguments);
    document.removeEventListener('mousemove', this.__mouseMove);
    document.removeEventListener('mouseip', this.__mouseUp);
  },

  click(e) {
    /*
      Prevent click events from propagating (i.e. onColumnClick)
     */
    e.preventDefault();
    e.stopPropagation();
  },

  mouseDown(e) {
    let column = this.colElement();

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isResizing: true,
      startWidth: column.offsetWidth,
      startX: e.pageX
    });

    let topLevel = closest(this.get('element'), TOP_LEVEL_CLASS);
    topLevel.classList.add('is-resizing');
  },

  _mouseUp(e) {
    if (this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      let column = this.colElement();
      let width = `${column.offsetWidth}px`;

      this.set('isResizing', false);
      this.set('column.width', width);

      let topLevel = closest(this.get('element'), TOP_LEVEL_CLASS);
      topLevel.classList.remove('is-resizing');
      this.onColumnResized(width);
    }
  },

  _mouseMove(e) {
    if (this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      let resizeOnDrag = this.get('resizeOnDrag');
      let minResizeWidth = this.get('column.minResizeWidth');
      let { startX, startWidth } = this.getProperties(['startX', 'startWidth']);
      let width = `${Math.max(startWidth + (e.pageX - startX), minResizeWidth)}px`;

      let column = this.colElement();
      let index = this.get('table.visibleColumns').indexOf(this.get('column')) + 1;
      let table = closest(this.get('element'), TOP_LEVEL_CLASS);

      column.width = width;
      table.querySelector(`thead td.lt-scaffolding:nth-child(${index})`).style.width = width;
      table.querySelector(`tfoot td.lt-scaffolding:nth-child(${index})`).style.width = width;
      if (resizeOnDrag) {
        let cols = table.querySelectorAll(`tbody td:nth-child(${index})`);
        cols.forEach((col) => {
          col.style.width = width;
        });
      }
    }
  },

  // No-op for closure actions
  onColumnResized() {}
});
