'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    snippetSearchPaths: ['addon', 'tests/dummy/app'],
    snippetPaths: ['snippets', 'tests/dummy/snippets'],
    'ember-prism': {
      components: ['markup-templating', 'handlebars', 'javascript'],
      plugins: ['line-numbers'],
    },

    'ember-power-select': {
      theme: 'bootstrap',
    },

    'ember-cli-babel': {
      includePolyfill: true,
    },

    'ember-cli-string-helpers': {
      only: ['classify'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
