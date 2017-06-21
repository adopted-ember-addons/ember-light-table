module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'generator-star-spacing': ['error', { before: false, after: false }],
    'ember-suave/require-access-in-comments': 'off',
    'ember-suave/no-const-outside-module-scope': 'off'
  }
};
