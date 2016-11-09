import Ember from 'ember';
import callAction from 'ember-light-table/utils/call-action';

const {
  computed
} = Ember;

/**
 * @module Light Table
 */

/**
 * @class TableHeaderMixin
 * @extends Ember.Mixin
 * @private
 */

export default Ember.Mixin.create({
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
   * @property iconAscending
   * @type {String}
   * @default ''
   */
  iconAscending: '',

  /**
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
      callAction(this, 'onColumnClick', ...arguments);
    },

    /**
     * onColumnDoubleClick action.
     *
     * @event onColumnDoubleClick
     * @param  {Column} column The column that was clicked
     * @param  {Event} event   The click event
     */
    onColumnDoubleClick(/* column */) {
      callAction(this, 'onColumnDoubleClick', ...arguments);
    },

    /**
     * onColumnResized action.
     *
     * @event onColumnResized
     * @param  {Column} column The column that was resized
     * @param  {String} width  The final width of the column
     */
    onColumnResized(/* column, width */) {
      callAction(this, 'onColumnResized', ...arguments);
    },

    /**
     * onColumnDrag action.
     *
     * @event onColumnDrag
     * @param  {Column} column The column that is being dragged
     */
    onColumnDrag(/* column */) {
      callAction(this, 'onColumnDrag', ...arguments);
    },

    /**
     * onColumnDrop action.
     *
     * @event onColumnDrop
     * @param  {Column} column The column that was dropped
     * @param  {Boolean} isSuccess The column was successfully dropped and sorted
     */
    onColumnDrop(/* column, isSuccess */) {
      callAction(this, 'onColumnDrop', ...arguments);
    }
  }
});
