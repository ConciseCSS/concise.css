const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const ifMedia = require('postcss-if-media');
const scssSyntax = require('postcss-scss');
const stripComments = require('postcss-strip-inline-comments');
const mediaMinMax = require('postcss-media-minmax');
const customMedia = require('postcss-custom-media');
const imports = require('postcss-easy-import');

// Custom modules
const lh = require('./lib/lh');
const typeScale = require('./lib/type-scale');

module.exports = (src, from) =>
  postcss()
    .use(imports())
    .use(stripComments())
    .use(nested())
    .use(ifMedia())
    .use(customMedia())
    .use(mediaMinMax())
    .use(lh())
    .use(typeScale())
    .use(autoprefixer())
    .process(src, { parser: scssSyntax, from })
