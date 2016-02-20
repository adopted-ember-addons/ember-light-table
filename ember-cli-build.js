/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    snippetSearchPaths: ['app', 'addon', 'tests/dummy/app'],
    snippetPaths: ['snippets', 'tests/dummy/app/snippets', 'tests/dummy/app/templates/snippets']
  });
  return app.toTree();
};
