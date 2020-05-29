#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const concise = require('../src/index')
const minimist = require('minimist')

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
      console.log(`File written: ${output}\nFrom: ${input}`)
    })
  })
}

const watch = path => {
  console.log(`Currently watching for changes in: ${path}`)

  fs.watch(path, {recursive: true}, (eventType, filename) => {
    console.log(`${eventType.charAt(0).toUpperCase() + eventType.slice(1)} in: ${filename}`)
    build()
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
