/* jshint node:true*/
module.exports = {
  description: 'Install Ember Light Table dependencies',

  normalizeEntityName() {},

  beforeInstall() {
    return this.addAddonToProject('ember-responsive');
  }
};
