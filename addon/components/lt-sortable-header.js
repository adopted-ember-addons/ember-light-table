import Ember from 'ember';
import SortableHeader from 'ember-sortable/components/sortable-item';
import layout from 'ember-light-table/templates/components/lt-sortable-header';

const {
  computed
} = Ember;

const sortableHeader = SortableHeader.extend({
  layout,
  tagName: 'th',
  classNames: ['lt-column'],
  attributeBindings: ['customWidth:width', 'colspan', 'rowspan'],
  classNameBindings: ['align', 'isGroupColumn:lt-group-column', 'isHideable', 'isSortable', 'isSorted', 'column.classNames'],

  width: computed(function() {
    let el = this.$();
    let width = el.outerWidth(true);
    
    width += this._getBorderSpacing(el).horizontal;

    return width;
  }).volatile(),

  _getBorderSpacing(el) {
    el = $(el);

    let css = el.css('border-spacing'); // '0px 0px'
    let [horizontal, vertical] = css.split(' ');

    return {
        horizontal: parseFloat(horizontal),
        vertical: parseFloat(vertical)
    };
  },
  customWidth: computed.readOnly('column.width'),
  isGroupColumn: computed.readOnly('column.isGroupColumn'),
  isSortable: computed.readOnly('column.sortable'),
  isSorted: computed.readOnly('column.sorted'),
  isHideable: computed.readOnly('column.hideable'),

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

  model: computed.alias('column')
});

export default sortableHeader;
