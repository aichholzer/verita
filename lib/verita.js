const { readFile, writeFile } = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const versions = require('../versions.json');

const Verita = {
  add: async (tool) => {
    let data = await promisify(readFile)('./versions.json');
    data = JSON.parse(data);
    data.push({
      tool,
      argument: '--version'
    });

    await promisify(writeFile)('./versions.json', JSON.stringify(data));
    return tool;
  },

  remove: async (tool) => {
    let data = await promisify(readFile)('./versions.json');
    data = JSON.parse(data).filter(item => item.tool !== tool);

    await promisify(writeFile)('./versions.json', JSON.stringify(data));
    return tool;
  },

  run: async () => {
    const toolVersions = versions
      .map(check => promisify(exec)(`${check.tool} ${check.argument}`))
      .map(promise => promise.catch(error => error));

    const result = [];
    (await Promise.all(toolVersions)).forEach((data, index) => {
      const { stdout: version, stderr: error } = data;
      const { tool } = versions[index];
      result.push({
        tool,
        version: version.replace(/^[^\d]+|[\n|\s].*/gi, '') || null,
        error: error.replace(/^\/.*:\s|[\n].*/gi, '') || null
      });
    });

    return result;
  }
};

module.exports = Verita;
