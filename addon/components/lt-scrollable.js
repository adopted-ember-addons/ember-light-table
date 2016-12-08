import Ember from 'ember';
import layout from '../templates/components/lt-scrollable';

const {
  Component
} = Ember;

export default Component.extend({
  layout,
  tagName: '',
  virtualScrollbar: false
});
