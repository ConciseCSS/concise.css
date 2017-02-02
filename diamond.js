const postcss = require('postcss');

module.exports = (css) => {
  return postcss([
    require('postcss-input-range'),
    require('postcss-lh'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('autoprefixer')
  ]).process(css).css;
};
