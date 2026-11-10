/**
 * Loader for postcss-import. Imported .pcss files are parsed with postcss-scss
 * and their `//` comments removed before PostCSS parses them, so Concise's own
 * files (and a project's partials) work even when the caller uses the default
 * CSS parser, as most bundler integrations do.
 */

import fs from 'node:fs/promises'
import scss from 'postcss-scss'

export default async function load (filename) {
  const css = await fs.readFile(filename, 'utf8')
  if (!filename.endsWith('.pcss') || !css.includes('//')) return css

  const root = scss.parse(css, { from: filename })
  root.walkComments(comment => {
    if (comment.raws.inline) comment.remove()
  })

  return root.toString()
}
