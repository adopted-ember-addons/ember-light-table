'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-inline-styles': {
      allowDynamicStyles: true,
    },
    'no-action': false,
    'no-curly-component-invocation': false,
    'no-down-event-binding': false,
    'no-duplicate-landmark-elements': false,
    'no-heading-inside-button': false,
    'no-implicit-this': false,
    'no-nested-landmark': false,
    'no-passed-in-event-handlers': false,
    'no-yield-only': false,
    'require-input-label': false,
  },
};
