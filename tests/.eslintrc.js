module.exports = {
  env: {
    embertest: true
  },

  globals: {
    server: false
  },

  rules: {
    'ember-suave/no-direct-property-access': 'off',
    'import/no-relative-parent-imports': 'off',
    'no-await-in-loop': 'off'
  }
};
