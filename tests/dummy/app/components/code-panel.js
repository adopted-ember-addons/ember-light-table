import Ember from 'ember';
import layout from '../templates/components/code-panel';

export default Ember.Component.extend({
  layout,
  collapse: true,
  title: '',
  snippets: null
});
