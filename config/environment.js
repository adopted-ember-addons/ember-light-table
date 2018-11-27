'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    emberKeyboard: {
      listeners: ['keyUp', 'keyDown', 'keyPress', 'click', 'mouseDown', 'mouseUp', 'touchStart', 'touchEnd']
    }
  };
};
