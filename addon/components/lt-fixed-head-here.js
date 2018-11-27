import Component from '@ember/component';

import layout from 'ember-light-table/templates/components/lt-fixed-head-here';

export default Component.extend({
  layout,
  tagName: '',

  // passed in
  frameId: ''
});
