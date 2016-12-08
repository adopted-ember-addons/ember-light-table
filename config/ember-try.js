/*jshint node:true*/

module.exports = {
  useVersionCompatibility: true,
  scenarios: [{
    name: 'default',
    bower: {
      dependencies: {}
    }
  }, {
    name: 'ember-lts-2.4',
    bower: {
      dependencies: {
        'ember': 'components/ember#lts-2-4'
      },
      resolutions: {
        'ember': 'lts-2-4'
      }
    }
  }, {
  }, {
    name: 'ember-2.6.2',
    allowedToFail: true
  }, {
  }, {
    name: 'ember-2.7.3',
    allowedToFail: true
  }, {
    name: 'ember-release',
    bower: {
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    }
  }, {
    name: 'ember-beta',
    allowedToFail: true,
    bower: {
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    }
  }, {
    name: 'ember-canary',
    allowedToFail: true,
    bower: {
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  }]
};
