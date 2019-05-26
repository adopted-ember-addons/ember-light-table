module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 2017,

    sourceType: 'module'
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

  rules: {
    'generator-star-spacing': ['error', { before: false, after: false }],
    'ember/no-observers': 'off',
    'ember-suave/require-access-in-comments': 'off',
    'ember-suave/no-const-outside-module-scope': 'off'
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
        sourceType: 'script',

        ecmaVersion: 2015
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
