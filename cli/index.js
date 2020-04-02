#!/usr/bin/env node

const fs = require('fs')
const compile = require('./commands/compile')

const command = {
  name: process.argv[2],
  input: process.argv[3],
  output: process.argv[4]
}

switch (command.name) {
  case 'compile':
    compile(command.input).then(css => {
      fs.writeFile(command.output, css, err => {
        if (err) throw err
        console.log(`File written: ${command.output}\nFrom: ${command.input}`);
      })
    })
    break
  default:
    break
}
