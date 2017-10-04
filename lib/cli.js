#!/usr/bin/env node

const chalk = require('chalk');
const verita = require('./verita');
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    r: 'raw'
  }
});

verita().then(response => {
  if (argv.raw) {
    return console.log(JSON.stringify(response, null, 2));
  }

  console.log();
  if (response.pass.length) {
    response.pass.forEach(tool => {
      console.log(` ${chalk.green('✔')}︎︎ ${chalk.yellow(tool.tool + ':')} ${chalk.bold.green(tool.version)}`);
    });
    console.log();
  }

  if (response.fail.length) {
    response.fail.forEach(tool => {
      console.log(` ${chalk.red('✘')}︎︎ ${chalk.yellow(tool.tool + ':')} ${chalk.bold.red(tool.error)}`);
    });
    console.log();
  }
});
