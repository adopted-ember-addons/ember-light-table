'use strict';

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],

  env: {
    browser: true,
  },

  rules: {
    'generator-star-spacing': ['error', { before: true, after: false }],
    'ember/no-observers': 'off',
    'ember/no-jquery': 'error',
    'ember/no-get': 'warn',
    'ember/no-mixins': 'off',
    'ember/no-new-mixins': 'off',
    'ember/require-tagless-components': 'off',
    // Remove when addon code is updated
    'ember/no-classic-components': 'warn',
    'ember/no-classic-classes': 'warn',
    'ember/no-component-lifecycle-hooks': 'warn',
    'ember/no-actions-hash': 'warn'
  },

  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './index.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './tests/dummy/config/**/*.js',
      ],

      parserOptions: {
        sourceType: 'script',
      },

      env: {
        browser: false,
        node: true,
      },

      plugins: ['node'],
      extends: ['plugin:node/recommended'],
    },
    {
      // Test files:
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
      rules: {
        'qunit/require-expect': 'off',
      },
    },
  ],
};
