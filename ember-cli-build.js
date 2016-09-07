/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    snippetSearchPaths: ['addon', 'tests/dummy/app'],
    snippetPaths: ['snippets', 'tests/dummy/snippets'],
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false
    }
  });

  return app.toTree();
};
