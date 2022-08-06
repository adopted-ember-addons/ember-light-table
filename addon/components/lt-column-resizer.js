import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';
import closest from 'ember-light-table/utils/closest';

const TOP_LEVEL_CLASS = '.ember-light-table';

@classic
@classNameBindings(':lt-column-resizer', 'isResizing')
export default class LtColumnResizer extends Component {
  column = null;
  resizeOnDrag = false;
  isResizing = false;
  startWidth = null;
  startX = null;

  colElement() {
    return this.element.parentNode;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);

    this.__mouseMove = this._mouseMove.bind(this);
    this.__mouseUp = this._mouseUp.bind(this);

    document.addEventListener('mousemove', this.__mouseMove);
    document.addEventListener('mouseup', this.__mouseUp);
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);
    document.removeEventListener('mousemove', this.__mouseMove);
    document.removeEventListener('mouseip', this.__mouseUp);
  }

  click(e) {
    /*
      Prevent click events from propagating (i.e. onColumnClick)
     */
    e.preventDefault();
    e.stopPropagation();
  }

  mouseDown(e) {
    let column = this.colElement();

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isResizing: true,
      startWidth: column.offsetWidth,
      startX: e.pageX,
    });

    let topLevel = closest(this.element, TOP_LEVEL_CLASS);
    topLevel.classList.add('is-resizing');
  }

  _mouseUp(e) {
    if (this.isResizing) {
      e.preventDefault();
      e.stopPropagation();

      let column = this.colElement();
      let width = `${column.offsetWidth}px`;

      this.set('isResizing', false);
      this.set('column.width', width);

      let topLevel = closest(this.element, TOP_LEVEL_CLASS);
      topLevel.classList.remove('is-resizing');
      this.onColumnResized(width);
    }
  }

  _mouseMove(e) {
    if (this.isResizing) {
      e.preventDefault();
      e.stopPropagation();

      let resizeOnDrag = this.resizeOnDrag;
      let minResizeWidth = this.column.minResizeWidth;
      let { startX, startWidth } = this;
      let width = `${Math.max(
        startWidth + (e.pageX - startX),
        minResizeWidth
      )}px`;

      let column = this.colElement();
      let index = this.table.visibleColumns.indexOf(this.column) + 1;
      let table = closest(this.element, TOP_LEVEL_CLASS);

      column.style.width = width;
      const headerScaffoldingCell = table.querySelector(
        `thead td.lt-scaffolding:nth-child(${index})`
      );
      if (headerScaffoldingCell) {
        headerScaffoldingCell.style.width = width;
      }

      const footerScaffoldingCell = table.querySelector(
        `tfoot td.lt-scaffolding:nth-child(${index})`
      );
      if (footerScaffoldingCell) {
        footerScaffoldingCell.style.width = width;
      }

      if (resizeOnDrag) {
        let cols = table.querySelectorAll(`tbody td:nth-child(${index})`);
        cols.forEach((col) => {
          col.style.width = width;
        });
      }
    }
  }

  // No-op for closure actions
  onColumnResized() {}
}
