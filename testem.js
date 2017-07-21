/* eslint-env node */
/* eslint-disable camelcase, prettier/prettier */
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ]
};

if (process.env.HEADLESS === 'true') {
  module.exports.browser_args = {
    'Chrome': ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
  };
}
