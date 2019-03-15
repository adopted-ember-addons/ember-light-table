import Component from '@ember/component';
import layout from '../templates/components/lt-infinity';
import InViewportMixin from 'ember-in-viewport';
import { get } from '@ember/object';

export default Component.extend(InViewportMixin, {
  classNames: ['lt-infinity'],
  classNameBindings: ['viewportEntered:in-viewport'],
  layout,

  rows: null,
  scrollableContent: null,
  scrollBuffer: 50,

  didInsertElement() {
    this._super(...arguments);

    let scrollBuffer = this.get('scrollBuffer');
    let width = this.$().width();
    let scrollableContent = this.get('scrollableContent');

    // ember-in-viewport errors if `scrollableArea` does not correspond to an element,
    // this could be the case when {{light-table}} is used with no fixed header/footer
    if (scrollableContent && !document.querySelector('scrollableContent')) {
      scrollableContent = undefined;
    }

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

  didEnterViewport() {
    get(this, 'inViewport')();
  },

  didExitViewport() {
    get(this, 'exitViewport')();
  }
});
