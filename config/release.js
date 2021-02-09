/* eslint-disable node/no-unsupported-features, no-console */
'use strict';

const { execSync } = require('child_process');

module.exports = {
  publish: true,
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
