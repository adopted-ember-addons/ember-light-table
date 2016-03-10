import Ember from 'ember';

const {
  $,
  run
} = Ember;

/**
 * @module Mixins
 */

/**
 * @class TableScrollMixin
 * @extends Ember.Mixin
 * @private
 */
export default Ember.Mixin.create({
  /**
   * @property scrollBuffer
   * @type {Number}
   * @default 500
   */
  scrollBuffer: 500,

  /**
   * @property scrollContainer
   * @type {String | Object}
   * @default window
   */
  scrollContainer: window,

  /**
   * @property touchMoveContainer
   * @type {String | Object}
   * @default document
   */
  touchMoveContainer: document,

  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, this._setupScrollEvents);
  },

  destroy() {
    this._super(...arguments);
    this._teardownScrollEvents();
  },

  _setupScrollEvents() {
    $(this.get('touchMoveContainer')).on('touchmove.light-table', run.bind(this, this._scrollHandler, '_touchmoveTimer'));
    $(this.get('scrollContainer')).on('scroll.light-table', run.bind(this, this._scrollHandler, '_scrollTimer'));
  },

  _teardownScrollEvents() {
    var scrollContainer = this.get('scrollContainer');
    var touchMoveContainer = this.get('touchMoveContainer');

    if (scrollContainer) {
      $(scrollContainer).off('scroll.light-table');
    }

    if (touchMoveContainer) {
      $(touchMoveContainer).off('touchmove.light-table');
    }

    run.cancel(this.get('_touchmoveTimer'));
    run.cancel(this.get('_scrollTimer'));
  },

  _scrollHandler(timer) {
    this.set(timer, run.throttle(this, this._onScroll, 100));
  },

  _onScroll() {
    if (this.isScrolledToBottom()) {
      Ember.run(() => this.send('onScrolledToBottom'));
    }
  },

  isScrolledToBottom() {
    let element = this.get('element');
    let container = this.get('scrollContainer');
    let buffer = this.get('scrollBuffer');
    if (element) {
      return $(container).scrollTop() + $(container).innerHeight() + buffer >= $(container)[0].scrollHeight;
    }
  }
});
