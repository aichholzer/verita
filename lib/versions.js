const { exec } = require('child_process');
const { promisify } = require('util');
const config = require('../versions.json');

const proExec = promisify(exec);
module.exports = async () => {
  let versions = [];
  Object.entries(config).forEach(([tool, operator]) => {
    versions.push(proExec(`${tool} ${operator}`));
  });

  versions = versions.map(promise => promise.catch(error => error));
  const result = await Promise.all(versions);
  return result.map((data) => {
    const { stdout: version, stderr: error } = data;
    return error ? error.replace(/\n/, '') : version.replace(/^[^\d]+|[\n|\s].*/gi, '');
  });
};
