/*jshint node:true*/
module.exports = {
  description: 'Install Ember Light Table dependencies',

  normalizeEntityName: function() {},

  beforeInstall: function() {
    return this.addAddonToProject('ember-responsive');
  }
};
