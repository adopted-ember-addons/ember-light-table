import classic from 'ember-classic-decorator';
import { layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/code-panel';

@classic
@templateLayout(layout)
export default class CodePanel extends Component {
  collapse = true;
  title = '';
  snippets = null;
}
