import Component from '@ember/component';
import { observer } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/lt-infinity';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
  classNames: ['lt-infinity'],
  classNameBindings: ['viewportEntered:in-viewport'],
  layout,

  rows: null,
  scrollableContent: null,
  scrollBuffer: 0,

  didInsertElement() {
    this._super(...arguments);

    let scrollBuffer = this.get('scrollBuffer');
    let width = this.$().width();
    let scrollableContent = this.get('scrollableContent');

    this.setProperties({
      viewportSpy: true,
      viewportTolerance: {
        left: width,
        right: width,
        bottom: scrollBuffer,
        top: 0
      },
      scrollableArea: scrollableContent
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this._cancelTimers();
  },

  didEnterViewport() {
    this.sendAction('onScrolledToBottom');
  },

  didExitViewport() {
    this._cancelTimers();
  },

  scheduleScrolledToBottom: observer('rows.[]', 'viewportEntered', function() {
    // for rAF
    if (this.get('viewportEntered')) {
      /*
       Continue scheduling onScrolledToBottom until no longer in viewport
       */
      this._scheduleScrolledToBottom();
    }
  }),

  _scheduleScrolledToBottom() {
    this._schedulerTimer = run.scheduleOnce('afterRender', this, this._debounceScrolledToBottom);
  },

  _debounceScrolledToBottom(delay = 100) {
    /*
     This debounce is needed when there is not enough delay between onScrolledToBottom calls.
     Without this debounce, all rows will be rendered causing immense performance problems
     */
    this._debounceTimer = run.debounce(this, this.sendAction, 'onScrolledToBottom', delay);
  },

  _cancelTimers() {
    run.cancel(this._schedulerTimer);
    run.cancel(this._debounceTimer);
  }
});
