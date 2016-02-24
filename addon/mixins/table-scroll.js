import Ember from 'ember';

const {
  $,
  run
} = Ember;

/**
 * @class TableScrollMixin
 * @extends Ember.Mixin
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
    var element = this.get('element');
    if (element) {
      return element.getBoundingClientRect().bottom <= window.innerHeight + this.get('scrollBuffer');
    }
  }
});
