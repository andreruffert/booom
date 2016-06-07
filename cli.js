#!/usr/bin/env node
'use strict';

const meow = require('meow');
const isUrl = require('is-url');
const booom = require('./');
const pkg = require('./package.json');

const cli = meow(`
  Usage:
    $ ${pkg.name} <url>

  Options:
    --help      Show information
    --version   Show current version

  <url> should be a .zip file

  Example:
    $ ${pkg.name} https://github.com/andreruffert/booom-initial-standard/archive/master.zip
`);

const args = cli.input.reduce((parsedArgs, arg) => {
  parsedArgs.url = isUrl(arg) && arg;
  return parsedArgs;
}, {});

if (!Object.keys(args).length) {
  console.error(`
    🔥 ${pkg.name}: missing argument after \`${pkg.name}\`
    🔥 ${pkg.name}: Try \`${pkg.name} --help\` for more information.
  `);
  process.exit(1);
}

if (!args.url) {
  console.error(`🔥 ${pkg.name}: You need to specify a URL`);
  process.exit(1);
}

booom.fetch(args.url);
