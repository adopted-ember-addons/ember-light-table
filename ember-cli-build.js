'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    snippetSearchPaths: ['addon', 'tests/dummy/app'],
    snippetPaths: ['snippets', 'tests/dummy/snippets'],
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false
    },
    'ember-prism': {
      'components': ['markup-templating', 'handlebars', 'javascript'],
      plugins: [
        'line-numbers',
      ]
    },

    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  return app.toTree();
};
