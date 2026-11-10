// Builds the precompiled stylesheets in dist/ (published to npm, usable from a CDN):
//   dist/concise.css   everything        dist/core.css    core styles
//   dist/ui.css        UI kit            dist/utils.css   utility classes
// each with a minified .min.css version.

import fs from 'node:fs/promises'
import path from 'node:path'
import cssnano from 'cssnano'
import postcss from 'postcss'

import concise from '../src/index.js'

const root = path.join(import.meta.dirname, '..')
const dist = path.join(root, 'dist')

export const bundles = {
  concise: 'concise.pcss',
  core: 'core/index.pcss',
  ui: 'ui/index.pcss',
  utils: 'utils/index.pcss'
}

const { version } = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8'))
const banner = name => `/*! Concise CSS v${version} (${name}) | MIT License | https://concisecss.com */\n`

await fs.rm(dist, { recursive: true, force: true })
await fs.mkdir(dist, { recursive: true })

for (const [name, entry] of Object.entries(bundles)) {
  const from = path.join(root, entry)
  const css = await fs.readFile(from, 'utf8')

  const result = await postcss([concise()]).process(css, { from, to: path.join(dist, `${name}.css`) })
  for (const warning of result.warnings()) console.warn(warning.toString())

  const minified = await postcss([cssnano({ preset: 'default' })]).process(result.css, { from: undefined })

  await fs.writeFile(path.join(dist, `${name}.css`), banner(name) + result.css)
  await fs.writeFile(path.join(dist, `${name}.min.css`), banner(name) + minified.css)

  const size = file => fs.stat(path.join(dist, file)).then(stat => `${(stat.size / 1024).toFixed(1)} kB`)
  console.log(`dist/${name}.css  ${await size(`${name}.css`)}  (min ${await size(`${name}.min.css`)})`)
}
