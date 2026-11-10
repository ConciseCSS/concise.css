/**
 * Concise CSS: a PostCSS plugin pack.
 *
 *   import postcss from 'postcss'
 *   import scss from 'postcss-scss'
 *   import concise from 'concise.css'
 *
 *   await postcss([concise()]).process(css, { from: 'main.pcss', parser: scss.parse })
 *
 * The postcss-scss parser is only needed for `//` comments in the file being
 * processed; imported .pcss files are always read with it.
 *
 * Nesting, range media queries and the `rlh` unit are native CSS and are left as written.
 */

import customMedia from 'postcss-custom-media'
import imports from 'postcss-import'
import scss from 'postcss-scss'

import ifMedia from './lib/if-media.js'
import load from './lib/load.js'
import resolve from './lib/resolve.js'
import stripComments from './lib/strip-comments.js'
import typeScale from './lib/type-scale.js'

/**
 * @param {object} [options]
 * @param {object} [options.import]  options for postcss-import (custom `resolve`/`load` replace Concise's)
 */
const concise = (options = {}) => ({
  postcssPlugin: 'concise',
  plugins: [
    imports({ resolve, load, ...options.import }),
    stripComments(),
    ifMedia(),
    customMedia(),
    typeScale()
  ]
})
concise.postcss = true

/** Parser that understands `//` comments; pass as `parser` when processing .pcss files. */
export const parser = scss.parse
concise.parser = parser

export default concise

// require('concise.css') returns the plugin itself (with .parser) instead of the module namespace
export { concise as 'module.exports' }
