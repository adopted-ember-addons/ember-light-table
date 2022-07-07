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
  ],

  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
  ],

  env: {
    browser: true
  },

  rules: {
    'generator-star-spacing': ['error', { before: false, after: false }],
    'ember/no-observers': 'off',
    'ember/no-jquery': 'error',
    'ember/no-get': 'warn',
    'ember/no-mixins': 'off',
    'ember/no-new-mixins': 'off',
    'ember/use-ember-data-rfc-395-imports': 'warn',
    'ember/require-computed-property-dependencies': 'warn'
  },

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

      rules: { },

      extends: ['plugin:node/recommended']
    }
  ]
};
