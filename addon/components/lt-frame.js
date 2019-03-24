import Component from '@ember/component';
import { computed } from '@ember/object';
import cssStyleify from 'ember-light-table/utils/css-styleify';
import layout from 'ember-light-table/templates/components/lt-frame';

export default Component.extend({
  layout,

  classNames: ['lt-frame'],

  attributeBindings: ['style'],

  height: null,
  scrollbar: 'standard',

  style: computed('height', function() {
    return cssStyleify(this.getProperties(['height']));
  })

});
