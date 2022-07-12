import Component from '@ember/component';
import layout from '../templates/components/code-panel';

export default Component.extend({
  layout,
  collapse: true,
  title: '',
  snippets: null,
});
