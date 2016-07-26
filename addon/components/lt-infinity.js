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
    run.cancel(this._viewportScheduler);
  },

  didEnterViewport() {
    this.sendAction('onScrolledToBottom');
  },

  didExitViewport() {
    if(this.hasObserverFor('rows.[]')) {
      this.removeObserver('rows.[]', this, this._scheduleDidEnterViewport);
    }
  },

  _scheduleDidEnterViewport() {
    this._viewportScheduler = run.scheduleOnce('afterRender', this, this.didEnterViewport);
  }
});
