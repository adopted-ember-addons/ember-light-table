import classic from 'ember-classic-decorator';
import { layout } from '@ember-decorators/component';
import Component from '@ember/component';
import template from '../templates/components/code-panel';

@classic
@layout(template)
export default class CodePanel extends Component {
  collapse = true;
  title = '';
  snippets = null;
}
