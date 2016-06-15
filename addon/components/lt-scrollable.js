import ScrollableComponent from 'ember-scrollable/components/scrollable';

export default ScrollableComponent.extend({
  classNames: ['lt-scrollable'],

  didInsertElement() {
    this._super(...arguments);
    this._updateViewportProps();
  },

  didUpdate() {
    this._super(...arguments);
    if(this._elementWidth !== this._getElementWidth() || this._elementHeight !== this._getElementHeight()) {
      this._updateViewportProps();
      this.send('recalculate');
    }
  },

  _updateViewportProps() {
    this._elementWidth = this._getElementWidth();
    this._elementHeight = this._getElementHeight();
  },

  _getElementWidth() {
    return this.$().css('width');
  },

  _getElementHeight() {
    return this.$().css('height');
  }
});
