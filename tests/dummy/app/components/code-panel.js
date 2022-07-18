import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
export default class CodePanel extends Component {
  collapse = true;
  title = '';
  snippets = null;
}
