import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('')
export default class LtSpannedRow extends Component {
  colspan = 1;
  visible = true;
}
