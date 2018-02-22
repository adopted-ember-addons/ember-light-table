/* eslint-disable node/no-unsupported-features, no-console */
'use strict';

const { execSync } = require('child_process');
const generateChangelog = require('ember-cli-changelog/lib/tasks/release-with-changelog');

module.exports = {
  publish: true,
  beforeCommit: generateChangelog,
  afterPublish(project, versions) {
    // Publish dummy app with docs to gh-pages
    runCommand(`ember github-pages:commit --message "Released ${versions.next}"`);
    runCommand('git push origin gh-pages:gh-pages');
  }
};

function runCommand(command) {
  console.log(`running: ${command}`);
  const output = execSync(command, { encoding: 'utf8' });
  console.log(output);
}
