import Ember from 'ember';
import layout from '../templates/components/lt-infinity';
import InViewportMixin from 'ember-in-viewport';

const { Component, observer, run } = Ember;

export default Component.extend(InViewportMixin, {
  classNames: ['lt-infinity'],
  classNameBindings: ['viewportEntered:in-viewport'],
  layout,

  rows: null,
  scrollBuffer: null,

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

  willDestroyElement() {
    this._super(...arguments);
    this._cancelTimers();
  },

  didEnterViewport() {
    this._throttleScrolledToBottom();
  },

  didExitViewport() {
    this._cancelTimers();
  },

  scheduleScrolledToBottom: observer('rows.[]', 'viewportEntered', function() {
    if(this.get('viewportEntered')) {
      /*
        Continue scheduling onScrolledToBottom until no longer in viewport
       */
      this._scheduleScrolledToBottom();
    }
  }),

  _scheduleScrolledToBottom() {
    this._schedulerTimer = run.scheduleOnce('afterRender', this, this._throttleScrolledToBottom);
  },

  _throttleScrolledToBottom(spacing = 100) {
    /*
      This throttle is needed when there is not enough spancing between onScrolledToBottom calls.
      Without this throttle, all rows will be rendered causing immense performance problems
     */
    this._throttleTimer = run.throttle(this, this.sendAction, 'onScrolledToBottom', spacing);
  },

  _cancelTimers() {
    run.cancel(this._schedulerTimer);
    run.cancel(this._throttleTimer);
  }
});
