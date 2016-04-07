import Ember from 'ember';
import layout from '../templates/components/lt-row';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'tr',
  classNames: ['lt-row'],
  classNameBindings: ['isSelected', 'isExpanded', 'canExpand:is-expandable', 'canSelect:is-selectable'],
  attributeBindings: ['colspan'],

  columns: null,
  row: null,
  tableActions: null,
  canExpand: false,
  canSelect: false,
  colpan: 1,

  isSelected: computed.readOnly('row.selected'),
  isExpanded: computed.readOnly('row.expanded')
});
