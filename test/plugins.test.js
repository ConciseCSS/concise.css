import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, describe, test } from 'node:test'
import postcss from 'postcss'

import concise, { parser } from '../src/index.js'
import lh from '../src/lib/lh.js'
import resolve from '../src/lib/resolve.js'

const run = async (css, plugins, from = 'input.ccss') =>
  (await postcss(plugins).process(css, { from, parser })).css.replace(/\s+/g, '')

describe('lh', () => {
  test('uses the line-height property of the root selector', async () => {
    assert.equal(await run(':root{line-height:2}a{margin:1lh}', [lh()]), ':root{line-height:2}a{margin:2rem}')
  })

  test('falls back to the lineHeight option when the root sets none', async () => {
    assert.equal(await run('a{margin:2lh}', [lh({ lineHeight: 1.25 })]), 'a{margin:2.5rem}')
  })

  test('supports custom rootSelector and unit options', async () => {
    const css = 'html{font:16px/1.6 serif}:root{line-height:3}a{margin:1rh;padding:1lh}'
    assert.equal(await run(css, [lh({ rootSelector: 'html', unit: 'rh' })]),
      'html{font:16px/1.6serif}:root{line-height:3}a{margin:1.6rem;padding:1lh}')
  })

  test('options of one instance do not leak into the next', async () => {
    await run('a{margin:1rh}', [lh({ unit: 'rh', lineHeight: 3 })])
    assert.equal(await run('a{margin:1lh}', [lh()]), 'a{margin:1.5rem}')
  })

  test('ignores numbers that are part of other tokens', async () => {
    assert.equal(await run('a{margin:1lh;grid-area:x1lh}', [lh()]), 'a{margin:1.5rem;grid-area:x1lh}')
  })
})

describe('type-scale', () => {
  test('keeps font-size: 0 and non-integer values', async () => {
    assert.equal(await run('a{font-size:0}b{font-size:1.5}i{font-size:3}', [concise({ autoprefixer: false })]),
      'a{font-size:0}b{font-size:1.5}i{font-size:1.2rem}')
  })
})

describe('if-media', () => {
  test('works on rules nested with postcss-nested syntax', async () => {
    assert.equal(await run('.a{.b{color:red ?if media (min-width: 1px)}}', [concise({ autoprefixer: false })]),
      '@media(min-width:1px){.a.b{color:red}}')
  })
})

describe('resolve', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'concise-resolve-'))
  const write = (file, content = '') => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.writeFileSync(path.join(root, file), content)
  }
  after(() => fs.rmSync(root, { recursive: true, force: true }))

  write('project/styles/_partial.ccss')
  write('project/styles/folder/index.ccss')
  write('project/node_modules/pkg/package.json', '{"style":"main.ccss"}')
  write('project/node_modules/pkg/main.ccss')
  write('project/node_modules/pkg/core/index.ccss')
  write('project/node_modules/pkg/core/settings.ccss')
  write('project/node_modules/@scope/plain/index.css')

  const from = path.join(root, 'project/styles')
  const at = file => path.join(root, file)

  test('partials and directory indexes', () => {
    assert.equal(resolve('partial', from), at('project/styles/_partial.ccss'))
    assert.equal(resolve('./folder', from), at('project/styles/folder/index.ccss'))
  })

  test('packages: style field, subpaths and scoped packages', () => {
    assert.equal(resolve('pkg', from), at('project/node_modules/pkg/main.ccss'))
    assert.equal(resolve('pkg/core', from), at('project/node_modules/pkg/core/index.ccss'))
    assert.equal(resolve('pkg/core/settings.ccss', from), at('project/node_modules/pkg/core/settings.ccss'))
    assert.equal(resolve('@scope/plain', from), at('project/node_modules/@scope/plain/index.css'))
  })

  test('reports every path it tried', () => {
    assert.throws(() => resolve('./missing', from), /Unable to resolve "\.\/missing"[\s\S]*missing\.ccss/)
  })
})
