const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const ifMedia = require('postcss-if-media');
const scssSyntax = require('postcss-scss');
const stripComments = require('postcss-strip-inline-comments');
const mediaMinMax = require('postcss-media-minmax');
const customMedia = require('postcss-custom-media');
const imports = require('postcss-easy-import');
const postcssFor = require('postcss-for');

const lh = require('./lib/lh');
const typeScale = require('./lib/type-scale');

module.exports = file => {
  const ccss = fs.readFileSync(file, 'utf8');

  return postcss()
    .use(imports())
    .use(postcssFor())
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
