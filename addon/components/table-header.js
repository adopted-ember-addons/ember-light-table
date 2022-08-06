import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import { action, computed, trySet } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';
import cssStyleify from 'ember-light-table/utils/css-styleify';

/**
 * @module Light Table
 */

/**
 * @class TableHeader
 * @extends Ember.Component
 * @private
 */

@classic
export default class TableHeader extends Component {
  @service scrollbarThickness;

  /**
   * @property table
   * @type {Table}
   * @private
   */
  table = null;

  /**
   * @property sharedOptions
   * @type {Object}
   * @private
   */
  sharedOptions = null;

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions = null;

  /**
   * @property extra
   * @type {Object}
   */
  extra = null;

  /**
   * @property fixed
   * @type {Boolean}
   * @default false
   */
  fixed = false;

  /**
   * @property sortOnClick
   * @type {Boolean}
   * @default true
   */
  sortOnClick = true;

  /**
   * @property multiColumnSort
   * @type {Boolean}
   * @default false
   */
  multiColumnSort = false;

  /**
   * Resize all cells in the column instead of just the header / footer
   *
   * @property resizeOnDrag
   * @type {Boolean}
   * @default false
   */
  resizeOnDrag = false;

  /**
   * CSS classes to be applied to an `<i class="lt-sort-icon"></i>` tag that is
   * inserted into the column's `<th>` element when the column is sortable but
   * not yet sorted.
   *
   * For instance, if you have installed `ember-font-awesome` or include the
   * `font-awesome` assets manually (e.g. via a CDN), you can set
   * `iconSortable` to `'sort'`, which would yield this markup =
   * `<i class="lt-sort-icon sort"></i>`
   *
   * @property iconSortable
   * @type {String}
   * @default ''
   */
  iconSortable = '';

  /**
   * See `iconSortable`.  CSS classes to apply to `<i class="lt-sort-icon"></i>`
   * when the column is sorted ascending.
   *
   * @property iconAscending
   * @type {String}
   * @default ''
   */
  iconAscending = '';

  /**
   * See `iconSortable`.  CSS classes to apply to `<i class="lt-sort-icon"></i>`
   * when the column is sorted descending.
   *
   * @property iconDescending
   * @type {String}
   * @default ''
   */
  iconDescending = '';

  /**
   * Custom sorting component name to use instead of the default `<i class="lt-sort-icon"></i>` template.
   * See `iconSortable`, `iconAsending`, or `iconDescending`.
   * @property iconComponent
   * @type {String}
   * @default false
   */
  iconComponent = null;

  /**
   * ID of main table component. Used to generate divs for ember-wormhole
   * @type {String}
   */
  tableId = null;

  get renderInPlace() {
    return this.fixed;
  }

  set renderInPlace(value) {
    this.fixed = value;
  }

  get columnGroups() {
    return this.table.visibleColumnGroups;
  }

  set columnGroups(value) {
    this.table.visibleColumnGroups = value;
  }

  get subColumns() {
    return this.table.visibleSubColumns;
  }

  set subColumns(value) {
    this.table.visibleSubColumns = value;
  }

  get columns() {
    return this.table.visibleColumns;
  }

  set columns(value) {
    this.table.visibleColumns = value;
  }

  @computed('iconSortable', 'iconAscending', 'iconDescending', 'iconComponent')
  get sortIcons() {
    return {
      iconSortable: this.iconSortable,
      iconAscending: this.iconAscending,
      iconDescending: this.iconDescending,
      iconComponent: this.iconComponent,
    };
  }

  @computed('scrollbarThickness.thickness', 'sharedOptions.occlusion')
  get style() {
    if (this.sharedOptions?.occlusion) {
      const scrollbarThickness = this.scrollbarThickness?.thickness;
      return cssStyleify({ paddingRight: `${scrollbarThickness}px` });
    }

    return null;
  }

  init() {
    super.init(...arguments);

    const fixed = this.fixed;
    const sharedOptionsFixedPath = `sharedOptions.${this.sharedOptionsFixedKey}`;
    trySet(this, sharedOptionsFixedPath, fixed);

    const height = this.sharedOptions?.height;

    warn(
      'You did not set a `height` attribute for your table, but marked a header or footer to be fixed. This means that you have to set the table height via CSS. For more information please refer to: https://github.com/adopted-ember-addons/ember-light-table/issues/446',
      !fixed || (fixed && !isEmpty(height)),
      { id: 'ember-light-table.height-attribute' }
    );
  }

  /**
   * onColumnClick action. Handles column sorting.
   *
   * @event onColumnClick
   * @param  {Column} column The column that was clicked
   * @param  {Event} event The click event
   */
  @action
  columnClick(column) {
    if (column.sortable && this.sortOnClick) {
      if (column.sorted) {
        column.toggleProperty('ascending');
      } else {
        if (!this.multiColumnSort) {
          this.table.sortedColumns.setEach('sorted', false);
        }

        column.set('sorted', true);
      }
    }

    this.onColumnClick && this.onColumnClick(...arguments);
  }

  /**
   * onColumnDoubleClick action.
   *
   * @event onColumnDoubleClick
   * @param  {Column} column The column that was clicked
   * @param  {Event} event   The click event
   */
  @action
  columnDoubleClick(/* column */) {
    this.onColumnDoubleClick && this.onColumnDoubleClick(...arguments);
  }

  /**
   * onColumnResized action.
   *
   * @event onColumnResized
   * @param  {Column} column The column that was resized
   * @param  {String} width  The final width of the column
   */
  @action
  columnResized(/* column, width */) {
    this.onColumnResized && this.onColumnResized(...arguments);
  }

  /**
   * onColumnDrag action.
   *
   * @event onColumnDrag
   * @param  {Column} column The column that is being dragged
   */
  @action
  columnDrag(/* column */) {
    this.onColumnDrag && this.onColumnDrag(...arguments);
  }

  /**
   * onColumnDrop action.
   *
   * @event onColumnDrop
   * @param  {Column} column The column that was dropped
   * @param  {Boolean} isSuccess The column was successfully dropped and sorted
   */
  @action
  columnDrop(/* column, isSuccess */) {
    this.onColumnDrop && this.onColumnDrop(...arguments);
  }
}
