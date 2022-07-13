// BEGIN-SNIPPET colored-row
import classic from 'ember-classic-decorator';
import { classNames, attributeBindings } from '@ember-decorators/component';
import { htmlSafe } from '@ember/string';
import Row from 'ember-light-table/components/lt-row';

@classic
@classNames('colored-row')
@attributeBindings('style')
export default class ColoredRow extends Row {
  get style() {
    return htmlSafe(`background-color: ${this.row.get('color')};`);
  }
}
// END-SNIPPET
