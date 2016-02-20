import Ember from 'ember';

const {
  $,
  on,
  run
} = Ember;

export default Ember.Mixin.create({
  scrollBuffer:    500,
  scrollContainer: window,
  touchMoveContainer: document,

  _setupScrollEvents: on('didInsertElement', function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      $(this.get('touchMoveContainer')).on('touchmove.light-table', this._scrollHandler.bind(this, '_touchmoveTimer'));
      $(this.get('scrollContainer')).on('scroll.light-table', this._scrollHandler.bind(this, '_scrollTimer'));
    });
  }),

  _teardownScrollEvents: on('willDestroyElement', function () {
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
  }),

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
