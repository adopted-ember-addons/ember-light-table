import classic from 'ember-classic-decorator';
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
} from '@ember-decorators/component';
import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';

@classic
@tagName('tr')
@classNames('lt-row')
@classNameBindings(
  'isSelected',
  'isExpanded',
  'canExpand:is-expandable',
  'canSelect:is-selectable',
  'row.classNames'
)
@attributeBindings('colspan', 'data-row-id')
export default class LtRow extends Component {
  columns = null;
  row = null;
  tableActions = null;
  extra = null;
  canExpand = false;
  canSelect = false;
  colspan = 1;

  @readOnly('row.selected')
  isSelected;

  @readOnly('row.expanded')
  isExpanded;
}
