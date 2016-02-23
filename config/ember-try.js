/*jshint node:true*/
module.exports = {
  scenarios: [{
    name: 'default',
    dependencies: {}
  }, {
    name: 'ember-2.0',
    dependencies: {
      'ember': '~2.0.0',
      'ember-data': '~2.0.0',
      'ember-cli-shims': '0.0.6'
    }
  }, {
    name: 'ember-2.1',
    dependencies: {
      'ember': '~2.1.0',
      'ember-data': '~2.1.0',
      'ember-cli-shims': '0.0.6'
    }
  }, {
    name: 'ember-2.2',
    dependencies: {
      'ember': '~2.2.0',
      'ember-data': '~2.2.0',
      'ember-cli-shims': '0.0.6'
    }
  }, {
    name: 'ember-release',
    dependencies: {
      'ember': 'components/ember#release',
      'ember-data': 'components/ember-data#release'
    },
    resolutions: {
      'ember': 'release',
      'ember-data': 'release'
    }
  }, {
    name: 'ember-beta',
    dependencies: {
      'ember': 'components/ember#beta',
      'ember-data': 'components/ember-data#beta'
    },
    resolutions: {
      'ember': 'beta',
      'ember-data': 'beta'
    }
  }, {
    name: 'ember-canary',
    dependencies: {
      'ember': 'components/ember#canary',
      'ember-data': 'components/ember-data#canary'
    },
    resolutions: {
      'ember': 'canary',
      'ember-data': 'canary'
    }
  }]
};
