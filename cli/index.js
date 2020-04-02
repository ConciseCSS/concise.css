#!/usr/bin/env node

const fs = require('fs')
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const ifMedia = require('postcss-if-media');
const scssSyntax = require('postcss-scss');
const stripComments = require('postcss-strip-inline-comments');
const mediaMinMax = require('postcss-media-minmax');
const customMedia = require('postcss-custom-media');
const imports = require('postcss-easy-import');

const lh = require('./lib/lh');
const typeScale = require('./lib/type-scale');

const command = {
  name: process.argv[2],
  input: process.argv[3],
  output: process.argv[4]
}

const compile = async src => await postcss()
  .use(imports())
  .use(stripComments())
  .use(nested())
  .use(ifMedia())
  .use(customMedia())
  .use(mediaMinMax())
  .use(lh())
  .use(typeScale())
  .use(autoprefixer())
  .process(src, { parser: scssSyntax, from: command.input });


switch (command.name) {
  case 'compile':
    compile(fs.readFileSync(command.input, 'utf8')).then(css => {
      fs.writeFile(command.output, css, err => {
        if (err) throw err
        console.log(`File written: ${command.output}\nFrom: ${command.input}`);
      })
    })
    break
  default:
    console.log('Unknown command')
    break
}
