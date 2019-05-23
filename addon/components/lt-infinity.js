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
    let width = this.element.offsetWidth;
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

  didEnterViewport() {
    get(this, 'enterViewport')();
  },

  didExitViewport() {
    get(this, 'exitViewport')();
  }
});
