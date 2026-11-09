// Snapshot tests for the shipped stylesheets: any change to the compiled CSS of
// core, ui, utils or the full bundle shows up as a diff against test/snapshots/.
// After an intended change, review the diff and run `npm run test:update`.
//
// Autoprefixer is disabled so that browserslist data updates don't change the snapshots.

import fs from 'node:fs'
import path from 'node:path'
import { describe, test } from 'node:test'
import postcss from 'postcss'

import concise, { parser } from '../src/index.js'

const root = path.join(import.meta.dirname, '..')
const snapshots = path.join(import.meta.dirname, 'snapshots')

const bundles = {
  concise: 'concise.ccss',
  core: 'core/index.ccss',
  ui: 'ui/index.ccss',
  utils: 'utils/index.ccss',
  'utils-margins-responsive': 'utils/margins-responsive.ccss'
}

const LEFTOVERS = [
  [/getColor\(|typeScale\(|\$[a-z][\w-]*|@include|@each|@if|#\{/, 'Sass syntax'],
  [/\d\.?\d*lh\b/, 'lh units'],
  [/\?\s*(if\s+)?media/, '?if media queries'],
  [/@custom-media|@media[^{]*\(--/, 'custom media queries']
]

describe('styles', () => {
  for (const [name, entry] of Object.entries(bundles)) {
    test(name, async t => {
      const from = path.join(root, entry)
      const result = await postcss([concise({ autoprefixer: false })])
        .process(fs.readFileSync(from, 'utf8'), { from, parser })

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
