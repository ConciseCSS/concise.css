/**
 * Concise CSS: a PostCSS plugin pack.
 *
 *   import postcss from 'postcss'
 *   import concise from 'concise.css'
 *
 *   await postcss([concise()]).process(css, { from: 'main.pcss' })
 *
 * Nesting, range media queries and the `rlh` unit are native CSS and are left as written.
 */

import customMedia from 'postcss-custom-media'
import imports from 'postcss-import'

import ifMedia from './lib/if-media.js'
import resolve from './lib/resolve.js'
import typeScale from './lib/type-scale.js'

/**
 * @param {object} [options]
 * @param {object} [options.import]  options for postcss-import (a custom `resolve` replaces Concise's)
 */
const concise = (options = {}) => ({
  postcssPlugin: 'concise',
  plugins: [
    imports({ resolve, ...options.import }),
    ifMedia(),
    customMedia(),
    typeScale()
  ]
})
concise.postcss = true

export default concise

// require('concise.css') returns the plugin itself instead of the module namespace
export { concise as 'module.exports' }
