import Ember from 'ember';
import layout from '../templates/components/lt-infinity';
import InViewportMixin from 'ember-in-viewport';

const { Component } = Ember;

export default Component.extend(InViewportMixin, {
  classNames: ['lt-infinity'],
  classNameBindings: ['viewportEntered:in-viewport'],
  layout,

  didInsertElement() {
    this._super(...arguments);
    this.setProperties({
      viewportSpy: true,
      viewportTolerance: {
        bottom : this.get('scrollBuffer'),
        top    : 0,
        left   : 0,
        right  : 0
      }
    });
  },

  didEnterViewport() {
    this.sendAction('onScrolledToBottom');
  }
});
