'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },

  plugins: [
    'ember',
    'ember-suave'
  ],

  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:ember-suave/recommended'
  ],

  env: {
    browser: true
  },
<<<<<<< HEAD

  rules: {
    'generator-star-spacing': ['error', { before: false, after: false }],
    'ember/no-observers': 'off',
    'ember-suave/require-access-in-comments': 'off',
    'ember-suave/no-const-outside-module-scope': 'off',
    'ember/no-jquery': 'error',
    'ember/no-get': 'warn',
    'ember/no-mixins': 'warn',
    'ember/no-new-mixins': 'warn',
    'ember/use-ember-data-rfc-395-imports': 'warn',
    'ember/require-computed-property-dependencies': 'warn'
  },

=======
  rules: {},
>>>>>>> 8a10e77... v3.16.1...v3.20.0
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js'
      ],

      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],

      parserOptions: {
        sourceType: 'script'
      },

      env: {
        browser: false,
        node: true
      },

      plugins: ['node'],

      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
        'ember-suave/lines-between-object-properties': 'off'
      })
    }
  ]
};
