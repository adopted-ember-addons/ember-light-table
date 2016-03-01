import Ember from 'ember';
import callAction from '../utils/call-action';

const {
  computed
} = Ember;

export default Ember.Mixin.create({
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

  visibleColumnGroups: computed.oneWay('table.visibleColumnGroups'),
  visibleSubColumns: computed.oneWay('table.visibleSubColumns'),
  visibleColumns: computed.oneWay('table.visibleColumns'),

  sortIcons: computed('iconAscending', 'iconDescending', function() {
    return this.getProperties(['iconAscending', 'iconDescending']);
  }),

  actions: {
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
      callAction.call(this, 'onColumnClick', ...arguments);
    },

    onColumnDoubleClick(/* column */) {
      callAction.call(this, 'onColumnDoubleClick', ...arguments);
    },
  }
});
