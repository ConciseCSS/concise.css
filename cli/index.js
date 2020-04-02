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

const lh = require('../lib/lh');
const typeScale = require('../lib/type-scale');

const compile = async file => {
  const ccss = fs.readFileSync(file, 'utf8');

  return await postcss()
    .use(imports())
    .use(stripComments())
    .use(ifMedia())
    .use(nested())
    .use(customMedia())
    .use(mediaMinMax())
    .use(lh())
    .use(typeScale())
    .use(autoprefixer())
    .process(ccss, { parser: scssSyntax, from: file });
}

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
