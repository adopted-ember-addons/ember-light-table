module.exports = {
  env: {
    embertest: true
  },

  globals: {
    server: false
  },

  rules: {
    'import/no-relative-parent-imports': 'off',
    'no-await-in-loop': 'off'
  }
};
