// BEGIN-SNIPPET materialize-icon
import classic from 'ember-classic-decorator';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/materialize-icon';

@classic
@tagName('span')
@templateLayout(layout)
export default class MaterializeIcon extends Component {}
// END-SNIPPET
