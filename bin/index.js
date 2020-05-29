#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const concise = require('../src/index')
const chokidar = require('chokidar')
const chalk = require('chalk')

const command = {
  name: process.argv[2],
  flags: process.argv[3],
  input: process.argv[process.argv.length - 2],
  output: process.argv[process.argv.length - 1]
}

const build = (input, output) => {
  concise.process(fs.readFileSync(input, 'utf8'), { from: input }).then(result => {
    // Create all the parent directories if required
    fs.mkdirSync(path.dirname(output), { recursive: true })

    // Write the CSS
    fs.writeFile(output, result.css, err => {
      if (err) throw err
      console.log(chalk.bold.green('File written: ') + output)
      console.log(chalk.bold.green('From: ') + input)
    })
  })
}

const watch = path => {
  console.log(chalk.bold.blue('\nCurrently watching for changes in: ') + chalk.gray(path))

  chokidar.watch(path, { ignored: /\.css$/, ignoreInitial: true }).on('all', (eventType, filename) => {
    console.log(chalk.bold.blue(`${eventType.charAt(0).toUpperCase() + eventType.slice(1)} in: `) + filename)
    build(command.input, command.output)
  })
}

switch (command.name) {
  case 'compile':
    build(command.input, command.output)
    if (command.flags === '-w') watch(path.dirname(command.input))
    break

  default:
    console.log('Unknown command')
    break
}
