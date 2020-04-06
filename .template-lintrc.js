'use strict';

module.exports = {
  extends: 'octane',
  rules: {
    'no-inline-styles': {
      allowDynamicStyles: true
    },
    'no-action': false,
    'no-implicit-this': false,
    'link-href-attributes': false,
    'require-valid-alt-text': false,
    'no-invalid-role': false
  }
};
