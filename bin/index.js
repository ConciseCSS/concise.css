#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const compile = require('../src/index')

const command = {
  name: process.argv[2],
  input: process.argv[3],
  output: process.argv[4]
}

const build = (input, output) => {
  compile(fs.readFileSync(input, 'utf8')).then(css => {
    // Create all the parent directories if required
    fs.mkdirSync(path.dirname(output), { recursive: true })

    // Write the CSS
    fs.writeFile(output, css, err => {
      if (err) throw err
      console.log(`File written: ${output}\nFrom: ${input}`);
    })
  });
};

const watch = path => {
  console.log(`Currently watching for changes in: ${path}`);

  fs.watch(path, {recursive: true}, (eventType, filename) => {
    console.log(`${eventType.charAt(0).toUpperCase() + eventType.slice(1)} in: ${filename}`);
    build();
  });
};

switch (command.name) {
  case 'compile':
    build(command.input, command.output);
    break

  case 'watch':
    build(command.input, command.output);
    watch(path.dirname(command.input));
    break

  default:
    console.log('Unknown command')
    break
}
