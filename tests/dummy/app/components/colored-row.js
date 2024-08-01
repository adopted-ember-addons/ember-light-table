// BEGIN-SNIPPET colored-row
import { classNames, attributeBindings } from '@ember-decorators/component';
import { htmlSafe } from '@ember/template';
import Row from 'ember-light-table/components/lt-row';

@classNames('colored-row')
@attributeBindings('style')
export default class ColoredRow extends Row {
  get style() {
    return htmlSafe(`background-color: ${this.row.get('color')};`);
  }
}
// END-SNIPPET
