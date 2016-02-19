import Ember from 'ember';
import layout from '../templates/components/lt-row';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'tr',
  classNames: ['lt-row'],
  classNameBindings: ['canExpand:is-expandable', 'isSelected', 'canSelect:is-selectable'],
  attributeBindings: ['colspan'],

  columns: null,
  row: null,
  tableActions: null,
  canExpand: false,
  canSelect: false,
  colpan: 1,

  isSelected: computed.oneWay('row.selected')
});
