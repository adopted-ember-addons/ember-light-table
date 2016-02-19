import Ember from 'ember';

const {
  merge,
  isEmpty,
  computed,
  A: emberArray
} = Ember;

const defaultOptions = {
  hidden: false,
  ascending: true,
  sortable: true,
  sorted: false,
  label: '',
  subColumns: null,
  headerComponent: null,
  cellComponent: null,
  valuePath: null,
  width: null,
  align: 'left'
};

export default class Column extends Ember.Object {
  constructor(column = {}) {
    if(column instanceof Column) {
      return column;
    }
    super();
    var options = merge({}, defaultOptions);
    merge(options, column);
    Object.keys(options).forEach(k => this[k] = options[k]);

    if(!isEmpty(this.subColumns)) {
      this.subColumns = emberArray(this.subColumns.map(sc => new Column(sc)));
    }

    this._setupComputedProperties();
  }

  _setupComputedProperties() {
    this.isVisibleGroupColumn = computed('visibleSubColumns.[]', 'hidden', function() {
      return !isEmpty(this.get('visibleSubColumns')) && !this.get('hidden');
    });

    this.visibleSubColumns = computed('subColumns.[]', 'hidden', function() {
      let subColumns = this.get('subColumns');
      return isEmpty(subColumns) || this.get('hidden') ? [] : subColumns.filterBy('hidden', false);
    });
  }
}
