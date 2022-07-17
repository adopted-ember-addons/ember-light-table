import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import template from 'ember-light-table/templates/components/cells/base';
import { htmlSafe } from '@ember/template';
import { ensureSafeComponent } from '@embroider/util';
import classic from 'ember-classic-decorator';
import { layout } from '@ember-decorators/component';

/**
 * @module Light Table
 * @submodule Cell Types
 */

/**
 * @module Cell Types
 * @class Base Cell
 */

@classic
@layout(template)
class Cell extends Component {
  enableScaffolding = false;

  @readOnly('column.sorted')
  isSorted;

  get cellComponent() {
    if (this.column.cellComponent) {
      return ensureSafeComponent(this.column.cellComponent, this);
    }

    return undefined;
  }

  @computed('enableScaffolding', 'column.width')
  get style() {
    let column = this.column;
    let columnWidth = column.get('width');

    if (this.enableScaffolding || !column) {
      return undefined;
    }

    // For performance reasons, it's more interesting to bypass cssStyleify
    // since it leads to a lot of garbage collections
    // when displaying many cells
    return columnWidth ? htmlSafe(`width: ${columnWidth};`) : null;
  }

  @computed('column.align')
  get align() {
    return `align-${this.column.align}`;
  }

  /**
   * @property value
   * @type {Mixed}
   */
  @computed('column.format', 'rawValue')
  get value() {
    let rawValue = this.rawValue;
    let format = this.column.format;

    if (format && typeof format === 'function') {
      return format.call(this, rawValue);
    }

    return rawValue;
  }
}

Cell.reopenClass({
  positionalParams: ['column', 'row'],
});

export default Cell;
