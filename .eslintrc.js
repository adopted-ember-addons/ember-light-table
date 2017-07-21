module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended',
    'prettier'
  ],
  env: {
    browser: true
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'generator-star-spacing': ['error', { before: false, after: false }],
    'ember-suave/require-access-in-comments': 'off',
    'ember-suave/no-const-outside-module-scope': 'off'
  }
};
