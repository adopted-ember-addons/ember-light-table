import Ember from 'ember';
import layout from '../templates/components/lt-infinity';
import InViewportMixin from 'ember-in-viewport';

const { Component, run } = Ember;

export default Component.extend(InViewportMixin, {
  classNames: ['lt-infinity'],
  classNameBindings: ['viewportEntered:in-viewport'],
  layout,

  rows: null,
  scrollBuffer: null,

  init() {
    this._super(...arguments);

    /*
      When the table doesnt have enough rows to push this component
      out of the viewport, it will only call didEnterViewport once.
      This sets up an observer that will add more rows and then be destroyed
      once this component comes out of view.
     */
    this.addObserver('rows.[]', this, this._scheduleDidEnterViewport);
  },

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
    this.sendAction('onScrolledToBottom');
  },

  didExitViewport() {
    if(this.hasObserverFor('rows.[]')) {
      this._cancelTimers();
      this.removeObserver('rows.[]', this, this._scheduleDidEnterViewport);
    }
  },

  _scheduleDidEnterViewport() {
    this._schedulerTimer = run.scheduleOnce('afterRender', this, this._debounceDidEnterViewport);
  },

  _debounceDidEnterViewport() {
    /*
      This debounce is needed when there is not enough delay when calling onScrolledToBottom.
      Without this debounce, all rows will be rendered causing immense performance problems
     */
    this._debounceTimer = run.debounce(this, this.didEnterViewport, 100);
  },

  _cancelTimers() {
    run.cancel(this._schedulerTimer);
    run.cancel(this._debounceTimer);
  }
});
