const { exec } = require('child_process');
const { promisify } = require('util');
const versions = require('../versions.json');

const proExec = promisify(exec);
module.exports = async () => {
  const toolVersions = versions
    .map(check => proExec(`${check.tool} ${check.argument}`))
    .map(promise => promise.catch(error => error));

  const result = { pass: [], fail: [] };
  (await Promise.all(toolVersions)).forEach((data, index) => {
    const { stdout: version, stderr: error } = data;
    const tool = versions[index].tool;
    if (error) {
      result.fail.push({ tool, error: error.replace(/^\/.*:\s|[\n].*/gi, '') });
    } else {
      result.pass.push({ tool, version: version.replace(/^[^\d]+|[\n|\s].*/gi, '') });
    }
  });

  return result;
};
