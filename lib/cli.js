#!/usr/bin/env node

const chalk = require('chalk');
const verita = require('./verita');
const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    a: 'add',
    r: 'remove',
    raw: 'raw'
  }
});

if (argv.add) {
  verita.add(argv.add).then((response) => {
    console.log(`\n ${chalk.green('✔')}︎︎ ${chalk.yellow('Added:')} ${chalk.bold.green(response)}\n`);
  });
} else if (argv.remove) {
  verita.remove(argv.remove).then((response) => {
    console.log(`\n ${chalk.green('✔')}︎︎ ${chalk.yellow('Removed:')} ${chalk.bold.green(response)}\n`);
  });
} else {
  verita.run().then((response) => {
    if (argv.raw) {
      return console.log(JSON.stringify(response, null, 2));
    }

    let log = '\n';
    response.forEach((item) => {
      let { tool, version, error } = item;
      tool = chalk.yellow(`${tool}:`);
      version = chalk.bold.green(version);

      if (error) {
        error = chalk.bold.red(error);
        log += ` ${chalk.red('✘')}︎︎ ${tool} ${error}\n`;
      } else {
        log += `  ︎︎ ${tool} ${version}\n`;
      }
    });

    return console.log(log);
  });
}
