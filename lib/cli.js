#!/usr/bin/env node

const versions = require('./versions');
const argv = require('minimist')(process.argv.slice(2));

versions().then(response => {
  console.log(response);
});
