import Ember from 'ember';

const { computed, isEmpty, Mixin, warn } = Ember;

/**
 * @module Light Table
 */

/**
 * @class TableHeaderMixin
 * @extends Ember.Mixin
 * @private
 */

export default Mixin.create({
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
   * CSS classes to be applied to an `<i class="lt-sort-icon></i>` tag that is
   * inserted into the column's `<th>` element.
   *
   * For instance, if you have installed `ember-font-awesome` or include the
   * `font-awesome` assets manually (e.g. via a CDN), you can set
   * `iconAscending` to `'fa fa-sort-asc'`, which would yield this markup:
   * `<i class="lt-sort-icon fa fa-sort-asc"></i>`
   *
   * @property iconAscending
   * @type {String}
   * @default ''
   */
  iconAscending: '',

  /**
   * See `iconAscending`.
   *
   * @property iconDescending
   * @type {String}
   * @default ''
   */
  iconDescending: '',

  /**
   * ID of main table component. Used to generate divs for ember-wormhole
   * @type {String}
   */
  tableId: null,

  renderInPlace: computed.oneWay('fixed'),
  columnGroups: computed.readOnly('table.visibleColumnGroups'),
  subColumns: computed.readOnly('table.visibleSubColumns'),
  columns: computed.readOnly('table.visibleColumns'),

  sortIcons: computed('iconAscending', 'iconDescending', function() {
    return this.getProperties(['iconAscending', 'iconDescending']);
  }).readOnly(),

  init() {
    this._super(...arguments);

    let fixed = this.get('fixed');
    let height = this.get('sharedOptions.height');

    warn(
      'You did not set a `height` attribute for your table, but marked a header or footer to be fixed. This means that you have to set the table height via CSS. For more information please refer to:  https://github.com/offirgolan/ember-light-table/issues/446',
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
      if (column.sortable && this.get('sortOnClick')) {
        if (column.sorted) {
          column.toggleProperty('ascending');
        } else {
          if (!this.get('multiColumnSort')) {
            this.get('table.sortedColumns').setEach('sorted', false);
          }
          column.set('sorted', true);
        }
      }
      this.sendAction('onColumnClick', ...arguments);
    },

    /**
     * onColumnDoubleClick action.
     *
     * @event onColumnDoubleClick
     * @param  {Column} column The column that was clicked
     * @param  {Event} event   The click event
     */
    onColumnDoubleClick(/* column */) {
      this.sendAction('onColumnDoubleClick', ...arguments);
    },

    /**
     * onColumnResized action.
     *
     * @event onColumnResized
     * @param  {Column} column The column that was resized
     * @param  {String} width  The final width of the column
     */
    onColumnResized(/* column, width */) {
      this.sendAction('onColumnResized', ...arguments);
    },

    /**
     * onColumnDrag action.
     *
     * @event onColumnDrag
     * @param  {Column} column The column that is being dragged
     */
    onColumnDrag(/* column */) {
      this.sendAction('onColumnDrag', ...arguments);
    },

    /**
     * onColumnDrop action.
     *
     * @event onColumnDrop
     * @param  {Column} column The column that was dropped
     * @param  {Boolean} isSuccess The column was successfully dropped and sorted
     */
    onColumnDrop(/* column, isSuccess */) {
      this.sendAction('onColumnDrop', ...arguments);
    }
  }
});
