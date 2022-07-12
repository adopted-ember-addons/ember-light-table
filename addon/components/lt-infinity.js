import Component from '@ember/component';
import layout from '../templates/components/lt-infinity';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,

  inViewport: service(),

  classNames: ['lt-infinity'],
  scrollableContent: null,
  scrollBuffer: 50,

  didInsertElement() {
    this._super(...arguments);

    const options = {
      viewportSpy: true,

      viewportTolerance: {
        bottom: this.scrollBuffer,
      },

      scrollableArea: this.scrollableContent,
    };

    const { onEnter, onExit } = this.inViewport.watchElement(
      this.element,
      options
    );

    onEnter(this.didEnterViewport.bind(this));
    onExit(this.didExitViewport.bind(this));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.inViewport.stopWatching(this.element);
  },

  didEnterViewport() {
    this.enterViewport();
  },

  didExitViewport() {
    this.exitViewport();
  },
});
