/*jshint node:true*/

module.exports = {
  useVersionCompatibility: true,
  scenarios: [{
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
    name: 'ember-2.6.2'
  }, {
    name: 'ember-2.7.3'
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
