import Ember from 'ember';
import callAction from 'ember-light-table/utils/call-action';

const {
  isArray,
  computed
} = Ember;

/**
 * @module Mixins
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
     * @param  {Column}   column The column that was clicked
     * @param  {Event}   event   The click event
     */
    onColumnClick(column) {
      if(column.sortable && this.get('sortOnClick')) {
        if(column.sorted) {
          column.toggleProperty('ascending');
        } else {
          if(!this.get('multiColumnSort')) {
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
     * @param  {Column}   column The column that was clicked
     * @param  {Event}   event   The click event
     */
    onColumnDoubleClick(/* column */) {
      callAction(this, 'onColumnDoubleClick', ...arguments);
    },

    /**
     * onColumnResized action.
     *
     * @method onColumnResized
     * @param  {Column}   column The column that was resized
     * @param  {String}   width  The final width of the column
     */
    onColumnResized(/* column, width */) {
      callAction(this, 'onColumnResized', ...arguments);
    },

    reorderColumns(group) {
      console.log('reorderColumns', arguments);
      this.get('table').setColumns(group);
    },

    reorderSubColumns(group, column) {
      console.log('reorderSubColumns', arguments);

      const parentColumn = this.get('table.columns').find(c => isArray(c.get('subColumns')) && c.get('subColumns').indexOf(column) !== -1 );
      parentColumn.get('subColumns').setObjects(group);
    }
  }
});
