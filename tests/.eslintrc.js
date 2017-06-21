module.exports = {
  env: {
    embertest: true
  },
  globals: {
    $: false,
    server: false
  },
  rules: {
    'ember-suave/no-direct-property-access': 'off'
  }
};
