import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class CodePanel extends Component {
  @tracked collapse = true;
  elementId = guidFor(this);
}
