import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import layout from '../templates/components/lt-standard-scrollable';
import cssStyleify from 'ember-light-table/utils/css-styleify';

export default Component.extend({

  layout,

  classNames: ['lt-standard-scrollable'],
  attributeBindings: ['tabIndex', 'style'],

  tabIndex: -1,
  height: null,

  style: computed('height', function() {
    return cssStyleify(this.getProperties(['height']));
  }),

  // passed in
  scrollToY: null,
  onScroll: null,

  init() {
    this._super(...arguments);
    this.get('scrollToY');
  },

  didInsertElement() {
    this.get('element').addEventListener('scroll', (evt) => this._onScroll(evt));
  },

  _onScroll(event) {
    let element = this.get('element');
    if (element) {
      if (this.onScroll) {
        this.onScroll(element.scrollTop, event);
      }
    }
  },

  _onScrollToY: observer('scrollToY', function() {
    this.get('element').scrollTop = this.get('scrollToY');
  })

});
