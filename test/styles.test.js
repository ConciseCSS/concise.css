// Snapshot tests for the shipped stylesheets: any change to the compiled CSS of
// core, ui, utils or the full bundle shows up as a diff against test/snapshots/.
// After an intended change, review the diff and run `npm run test:update`.

import fs from 'node:fs'
import path from 'node:path'
import { describe, test } from 'node:test'
import postcss from 'postcss'

import concise from '../src/index.js'

const root = path.join(import.meta.dirname, '..')
const snapshots = path.join(import.meta.dirname, 'snapshots')

const bundles = {
  concise: 'concise.pcss',
  core: 'core/index.pcss',
  ui: 'ui/index.pcss',
  utils: 'utils/index.pcss',
  'utils-margins-responsive': 'utils/margins-responsive.pcss'
}

const LEFTOVERS = [
  [/getColor\(|typeScale\(|\$[a-z][\w-]*|@include|@each|@if|#\{/, 'Sass syntax'],
  [/font-size:\s*[1-9]\d*\s*[;}]/, 'unconverted type scale steps'],
  [/\?\s*(if\s+)?media/, '?if media queries'],
  [/@custom-media|@media[^{]*\(--/, 'custom media queries']
]

describe('styles', () => {
  for (const [name, entry] of Object.entries(bundles)) {
    test(name, async t => {
      const from = path.join(root, entry)
      const result = await postcss([concise()])
        .process(fs.readFileSync(from, 'utf8'), { from })

      // Comments may mention syntax (e.g. "Use as @media (--medium)"), so check without them
      const code = result.css.replace(/\/\*[\s\S]*?\*\//g, '')
      for (const [pattern, description] of LEFTOVERS) {
        t.assert.doesNotMatch(code, pattern, `${entry} still contains ${description}`)
      }
      t.assert.deepEqual(result.warnings().map(String), [])

      t.assert.fileSnapshot(result.css, path.join(snapshots, `${name}.css`), { serializers: [css => css] })
    })
  }
})
