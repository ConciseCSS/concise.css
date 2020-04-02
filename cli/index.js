#!/usr/bin/env node

const cliparse = require('cliparse');
const pkg = require('../package.json');
const fs = require('fs');

const compile = require('./commands/compile');

cliparse.parse(cliparse.cli({
  name: 'concise-cli',
  description: 'Command-line Interface for Concise CSS',
  version: pkg.version,
  commands: [
    cliparse.command(
      'compile', {
        description: 'Compile code from Concise CSS',
        args: [
          cliparse.argument('input', { description: 'File to compile' }),
          cliparse.argument('output', { description: 'Output CSS file' })
        ]
      }, (params) => {
        compile(params.args[0]).then(css => {
          fs.writeFile(params.args[1], css, (err) => {
            if (err) { throw err; }
            console.log(`File written: ${params.args[1]}\nFrom: ${params.args[0]}`);
          })
        })
      }
    )
  ]
}));
