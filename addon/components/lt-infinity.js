import Component from '@ember/component';
import layout from '../templates/components/lt-infinity';
import { get } from '@ember/object';
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
        bottom: this.get('scrollBuffer')
      },
      scrollableArea: this.get('scrollableContent')
    };

    const { onEnter, onExit } = this.get('inViewport').watchElement(get(this, 'element'), options);
    onEnter(this.didEnterViewport.bind(this));
    onExit(this.didExitViewport.bind(this));
  },

  willDestroyElement() {
    this.get('inViewport').stopWatching(this.get('element'));
  },

  didEnterViewport() {
    get(this, 'enterViewport')();
  },

  didExitViewport() {
    get(this, 'exitViewport')();
  }
});
