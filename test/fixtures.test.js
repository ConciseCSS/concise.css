// Every test/fixtures/<feature>/<case>.ccss is compiled and compared with <case>.css.
// Files starting with `_` are partials used by imports and are not compiled on their own.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { describe, test } from 'node:test'
import postcss from 'postcss'

import concise, { parser } from '../src/index.js'

const fixtures = path.join(import.meta.dirname, 'fixtures')

// Formatting differences don't matter, only the resulting CSS
const normalize = css => css.replace(/\s+/g, '')

export async function compile (file, options) {
  const css = fs.readFileSync(file, 'utf8')
  return postcss([concise(options)]).process(css, { from: file, parser })
}

for (const feature of fs.readdirSync(fixtures).sort()) {
  describe(feature, () => {
    const dir = path.join(fixtures, feature)
    const cases = fs.readdirSync(dir).filter(file => file.endsWith('.ccss') && !file.startsWith('_')).sort()

    for (const file of cases) {
      const name = path.basename(file, '.ccss')

      test(name, async () => {
        const result = await compile(path.join(dir, file))
        const expected = fs.readFileSync(path.join(dir, `${name}.css`), 'utf8')

        assert.equal(normalize(result.css), normalize(expected))
      })
    }
  })
}
