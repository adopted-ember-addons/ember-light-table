import Ember from 'ember';
import layout from '../templates/components/lt-head';
import callAction from '../utils/call-action';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'thead',
  classNames: ['lt-head'],

  table: null,

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

  visibleColumnGroups: computed.oneWay('table.visibleColumnGroups'),
  visibleSubColumns: computed.oneWay('table.visibleSubColumns'),

  sortIcons: computed('iconAscending', 'iconDescending', function() {
    return this.getProperties(['iconAscending', 'iconDescending']);
  }),

  actions: {
    onColumnClick(column) {
      if(column.sortable) {
        if(column.sorted) {
          column.toggleProperty('ascending');
        } else {
          if(!this.get('multiColumnSort')) {
            this.get('table.sortedColumns').setEach('sorted', false);
          }
          column.set('sorted', true);
        }
      }
      callAction.call(this, 'onColumnClick', ...arguments);
    },

    onColumnDoubleClick(/* column */) {
      callAction.call(this, 'onColumnDoubleClick', ...arguments);
    },
  }
});
