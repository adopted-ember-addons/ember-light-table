import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

const Row = Component.extend({
  tagName: 'tr',
  classNames: ['lt-row'],
  classNameBindings: [
    'isSelected',
    'isExpanded',
    'canExpand:is-expandable',
    'canSelect:is-selectable',
    'row.classNames',
  ],
  attributeBindings: ['colspan', 'data-row-id'],

  columns: null,
  row: null,
  tableActions: null,
  extra: null,
  canExpand: false,
  canSelect: false,
  colspan: 1,

  isSelected: readOnly('row.selected'),
  isExpanded: readOnly('row.expanded'),
});

Row.reopenClass({
  positionalParams: ['row', 'columns'],
});

export default Row;
