import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, describe, test } from 'node:test'
import postcss from 'postcss'

import concise, { parser } from '../src/index.js'
import resolve from '../src/lib/resolve.js'

const run = async (css, plugins, from = 'input.pcss') =>
  (await postcss(plugins).process(css, { from, parser })).css.replace(/\s+/g, '')

describe('type-scale', () => {
  test('keeps font-size: 0 and non-integer values', async () => {
    assert.equal(await run('a{font-size:0}b{font-size:1.5}i{font-size:3}', [concise()]),
      'a{font-size:0}b{font-size:1.5}i{font-size:calc(pow(var(--type-ratio),1)*1rem)}')
  })

  test('step 2 is the base size', async () => {
    assert.equal(await run('a{font-size:2}', [concise()]), 'a{font-size:1rem}')
  })
})

describe('if-media', () => {
  test('keeps the @media block nested inside the parent rule', async () => {
    assert.equal(await run('.a{.b{color:red ?if media (min-width: 1px)}}', [concise()]),
      '.a{@media(min-width:1px){.b{color:red}}}')
  })
})

describe('resolve', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'concise-resolve-'))
  const write = (file, content = '') => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    fs.writeFileSync(path.join(root, file), content)
  }
  after(() => fs.rmSync(root, { recursive: true, force: true }))

  write('project/styles/_partial.pcss')
  write('project/styles/folder/index.pcss')
  write('project/node_modules/pkg/package.json', '{"style":"main.pcss"}')
  write('project/node_modules/pkg/main.pcss')
  write('project/node_modules/pkg/core/index.pcss')
  write('project/node_modules/pkg/core/settings.pcss')
  write('project/node_modules/@scope/plain/index.css')

  const from = path.join(root, 'project/styles')
  const at = file => path.join(root, file)

  test('partials and directory indexes', () => {
    assert.equal(resolve('partial', from), at('project/styles/_partial.pcss'))
    assert.equal(resolve('./folder', from), at('project/styles/folder/index.pcss'))
  })

  test('packages: style field, subpaths and scoped packages', () => {
    assert.equal(resolve('pkg', from), at('project/node_modules/pkg/main.pcss'))
    assert.equal(resolve('pkg/core', from), at('project/node_modules/pkg/core/index.pcss'))
    assert.equal(resolve('pkg/core/settings.pcss', from), at('project/node_modules/pkg/core/settings.pcss'))
    assert.equal(resolve('@scope/plain', from), at('project/node_modules/@scope/plain/index.css'))
  })

  test('reports every path it tried', () => {
    assert.throws(() => resolve('./missing', from), /Unable to resolve "\.\/missing"[\s\S]*missing\.pcss/)
  })
})

describe('default parser', () => {
  test('imported .pcss files with // comments work without postcss-scss', async () => {
    const from = path.join(import.meta.dirname, '../concise.pcss')
    const result = await postcss([concise()]).process(fs.readFileSync(from, 'utf8'), { from })
    assert.match(result.css, /\._mxs \{ margin: var\(--spacing-xs\); \}/)
    assert.doesNotMatch(result.css, /^\s*\/\/ /m)
  })

  test('the plugin exposes the parser for CommonJS users', () => {
    assert.equal(concise.parser, parser)
  })
})
