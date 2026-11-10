import Mixin from '@ember/object/mixin';
import { computed, trySet } from '@ember/object';
import { oneWay, readOnly } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { warn } from '@ember/debug';
import { inject as service } from '@ember/service';
import cssStyleify from 'ember-light-table/utils/css-styleify';

/**
 * @module Light Table
 */

/**
 * @class TableHeaderMixin
 * @extends Ember.Mixin
 * @private
 */

export default Mixin.create({
  attributeBindings: ['style'],

  scrollbarThickness: service(),

  /**
   * @property table
   * @type {Table}
   * @private
   */
  table: null,

  /**
   * @property sharedOptions
   * @type {Object}
   * @private
   */
  sharedOptions: null,

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * @property extra
   * @type {Object}
   */
  extra: null,

  /**
   * @property fixed
   * @type {Boolean}
   * @default false
   */
  fixed: false,

  /**
   * @property sortOnClick
   * @type {Boolean}
   * @default true
   */
  sortOnClick: true,

  /**
   * @property multiColumnSort
   * @type {Boolean}
   * @default false
   */
  multiColumnSort: false,

  /**
   * Resize all cells in the column instead of just the header / footer
   *
   * @property resizeOnDrag
   * @type {Boolean}
   * @default false
   */
  resizeOnDrag: false,

  /**
   * Name of the icon that is inserted into the column's `<th>`
   * element when the column is sortable but not yet sorted.
   *
   * The name is passed to the component assigned to the
   * iconComponent property when the table is rendered.
   *
   * The addon includes the Font Awesome icon `sort`.
   *
   * @property iconSortable
   * @type {String}
   * @default ''
   */
  iconSortable: '',

  /**
   * See `iconSortable`. Icon name to use when the
   * column is sorted ascending.
   *
   * The addon includes the Font Awesome icon `sort-up`.
   *
   * @property iconAscending
   * @type {String}
   * @default ''
   */
  iconAscending: '',

  /**
   * See `iconSortable`. Icon name to use when the
   * column is sorted descending.
   *
   * The addon includes the Font Awesome icon `sort-down`.
   *
   * @property iconDescending
   * @type {String}
   * @default ''
   */
  iconDescending: '',

  /**
   * Name of custom component to render the sorting icons template. This component
   * is required to render sorting icons. Duplicate the `fa-icon-wrapper` from the
   * dummy app to use the included Font Awesome icons.
   *
   * See `iconSortable`, `iconAsending`, or `iconDescending`.
   * @property iconComponent
   * @type {String}
   * @default false
   */
  iconComponent: null,

  /**
   * ID of main table component. Used to generate divs for ember-wormhole
   * @type {String}
   */
  tableId: null,

  renderInPlace: oneWay('fixed'),
  columnGroups: readOnly('table.visibleColumnGroups'),
  subColumns: readOnly('table.visibleSubColumns'),
  columns: readOnly('table.visibleColumns'),

  sortIcons: computed(
    'iconSortable',
    'iconAscending',
    'iconDescending',
    'iconComponent',
    function () {
      return {
        iconSortable: this.iconSortable,
        iconAscending: this.iconAscending,
        iconDescending: this.iconDescending,
        iconComponent: this.iconComponent,
      };
    }
  ).readOnly(),

  style: computed(
    'scrollbarThickness.thickness',
    'sharedOptions.occlusion',
    function () {
      if (this.sharedOptions?.occlusion) {
        const scrollbarThickness = this.scrollbarThickness?.thickness;
        return cssStyleify({ paddingRight: `${scrollbarThickness}px` });
      }

      return;
    }
  ).readOnly(),

  init() {
    this._super(...arguments);

    const fixed = this.fixed;
    const sharedOptionsFixedPath = `sharedOptions.${this.sharedOptionsFixedKey}`;
    trySet(this, sharedOptionsFixedPath, fixed);

    const height = this.sharedOptions?.height;

    warn(
      'You did not set a `height` attribute for your table, but marked a header or footer to be fixed. This means that you have to set the table height via CSS. For more information please refer to: https://github.com/adopted-ember-addons/ember-light-table/issues/446',
      !fixed || (fixed && !isEmpty(height)),
      { id: 'ember-light-table.height-attribute' }
    );
  },

  actions: {
    /**
     * onColumnClick action. Handles column sorting.
     *
     * @event onColumnClick
     * @param  {Column} column The column that was clicked
     * @param  {Event} event The click event
     */
    onColumnClick(column) {
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
    },

    /**
     * onColumnDoubleClick action.
     *
     * @event onColumnDoubleClick
     * @param  {Column} column The column that was clicked
     * @param  {Event} event   The click event
     */
    onColumnDoubleClick(/* column */) {
      this.onColumnDoubleClick && this.onColumnDoubleClick(...arguments);
    },

    /**
     * onColumnResized action.
     *
     * @event onColumnResized
     * @param  {Column} column The column that was resized
     * @param  {String} width  The final width of the column
     */
    onColumnResized(/* column, width */) {
      this.onColumnResized && this.onColumnResized(...arguments);
    },

    /**
     * onColumnDrag action.
     *
     * @event onColumnDrag
     * @param  {Column} column The column that is being dragged
     */
    onColumnDrag(/* column */) {
      this.onColumnDrag && this.onColumnDrag(...arguments);
    },

    /**
     * onColumnDrop action.
     *
     * @event onColumnDrop
     * @param  {Column} column The column that was dropped
     * @param  {Boolean} isSuccess The column was successfully dropped and sorted
     */
    onColumnDrop(/* column, isSuccess */) {
      this.onColumnDrop && this.onColumnDrop(...arguments);
    },
  },
});
