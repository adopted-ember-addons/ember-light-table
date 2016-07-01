import Ember from 'ember';
import layout from 'ember-light-table/templates/components/lt-row';

const {Component, computed} = Ember;

const Row = Component.extend({
  layout,
  tagName: 'tr',
  classNames: ['lt-row'],
  classNameBindings: ['isSelected', 'isExpanded', 'canExpand:is-expandable', 'canSelect:is-selectable', 'row.classNames'],
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

Row.reopenClass({
  positionalParams: ['row', 'columns']
});

export default Row;
