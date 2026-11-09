/**
 * Concise CSS: a PostCSS plugin pack.
 *
 *   import postcss from 'postcss'
 *   import scss from 'postcss-scss'
 *   import concise from 'concise.css'
 *
 *   await postcss([concise()]).process(css, { from: 'main.ccss', parser: scss.parse })
 *
 * The postcss-scss parser is only needed for `//` comments; everything else works
 * with the default parser.
 */

import autoprefixer from 'autoprefixer'
import customMedia from 'postcss-custom-media'
import imports from 'postcss-import'
import mediaMinMax from 'postcss-media-minmax'
import nested from 'postcss-nested'
import scss from 'postcss-scss'

import ifMedia from './lib/if-media.js'
import lh from './lib/lh.js'
import resolve from './lib/resolve.js'
import stripComments from './lib/strip-comments.js'
import typeScale from './lib/type-scale.js'

/**
 * @param {object} [options]
 * @param {object} [options.import]        options for postcss-import (a custom `resolve` replaces Concise's)
 * @param {object} [options.lh]            { rootSelector, unit, lineHeight }
 * @param {object} [options.typeScale]     { rootSelector, typeRatio, ratioProperty }
 * @param {object|false} [options.autoprefixer]  autoprefixer options, or false to skip it
 */
const concise = (options = {}) => ({
  postcssPlugin: 'concise',
  plugins: [
    imports({ resolve, ...options.import }),
    stripComments(),
    // Before nested: postcss-nested would read `?if media …` blocks as selectors
    ifMedia(),
    nested(),
    customMedia(),
    mediaMinMax(),
    lh(options.lh),
    typeScale(options.typeScale),
    ...(options.autoprefixer === false ? [] : [autoprefixer(options.autoprefixer)])
  ]
})
concise.postcss = true

export default concise

/** Parser that understands `//` comments; pass as `parser` when processing .ccss files. */
export const parser = scss.parse
