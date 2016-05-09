import Ember from 'ember';

const {
  $,
  run,
  isNone,
  computed
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

  /**
   * @property _shouldSetupScroll
   * @type {Boolean}
   * @private
   */
  _shouldSetupScroll: computed.notEmpty('attrs.onScrolledToBottom'),

  didInsertElement() {
    this._super(...arguments);
    if(this.get('_shouldSetupScroll')) {
      run.scheduleOnce('render', this, this._setupScrollContainer);
      run.scheduleOnce('afterRender', this, this._setupScrollEvents);
    }
  },

  destroy() {
    this._super(...arguments);
    if(this.get('_shouldSetupScroll')) {
      this._teardownScrollEvents();
    }
  },

  _setupScrollContainer() {
    const fixedHeader = this.$('.lt-head-wrap thead.lt-head');
    const fixedFooter = this.$('.lt-foot-wrap tfoot.lt-foot');

    /**
     * If there is a fixed header and footer, that means that the scroll container
     * must be the lt-body-wrap with the fixed height and overflow.
     */
    if(fixedHeader.length > 0 || fixedFooter.length > 0) {
      const container = `#${this.get('elementId')} .lt-body-wrap`;

      // Only apply if custom container not specified
      if(isNone(this.get('attrs.scrollContainer'))) {
        this.set('scrollContainer', container);
      }

      if(isNone(this.get('attrs.touchMoveContainer'))) {
        this.set('touchMoveContainer', container);
      }
    }
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
      run(() => this.send('onScrolledToBottom'));
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
