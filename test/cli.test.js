import assert from 'node:assert/strict'
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, describe, test } from 'node:test'

const bin = path.join(import.meta.dirname, '../bin/concise.js')
const fixtures = path.join(import.meta.dirname, 'fixtures')
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'concise-cli-'))
const concise = (...args) => spawnSync(process.execPath, [bin, ...args], { encoding: 'utf8' })

after(() => fs.rmSync(tmp, { recursive: true, force: true }))

describe('cli', () => {
  test('compiles a file, creating missing output directories', () => {
    const output = path.join(tmp, 'nested/dir/out.css')
    const result = concise('compile', path.join(fixtures, 'imports/basic.ccss'), output)

    assert.equal(result.status, 0, result.stderr)
    assert.match(fs.readFileSync(output, 'utf8'), /\.a\s*\{\s*width: auto;[\s\S]*\.b\s*\{/)
  })

  test('fails with a readable error on invalid CSS', () => {
    const input = path.join(tmp, 'broken.ccss')
    fs.writeFileSync(input, 'a { color: red')
    const result = concise('compile', input, path.join(tmp, 'broken.css'))

    assert.equal(result.status, 1)
    assert.match(result.stderr, /broken\.ccss:1:1: Unclosed block/)
  })

  test('rejects unknown commands and missing arguments', () => {
    assert.equal(concise('build', 'a', 'b').status, 1)
    assert.equal(concise('compile', 'only-input.ccss').status, 1)
  })

  test('prints help and version', () => {
    assert.match(concise('--help').stdout, /Usage: concise compile/)
    assert.match(concise('-v').stdout, /^\d+\.\d+\.\d+/)
  })

  test('watch mode recompiles when an imported file changes', async () => {
    const dir = fs.mkdtempSync(path.join(tmp, 'watch-'))
    const input = path.join(dir, 'main.ccss')
    const partial = path.join(dir, '_part.ccss')
    const output = path.join(dir, 'out.css')
    fs.writeFileSync(input, "@import 'part';")
    fs.writeFileSync(partial, 'a { color: red }')

    const child = spawn(process.execPath, [bin, 'compile', input, output, '-w'])
    try {
      await waitFor(child, /Watching for changes/)
      fs.writeFileSync(partial, 'a { color: blue }')
      await waitFor(child, /Change: /)
      await waitFor(child, /File written/)
      assert.match(fs.readFileSync(output, 'utf8'), /color: blue/)
    } finally {
      child.kill()
    }
  })
})

function waitFor (child, pattern, timeout = 5000) {
  return new Promise((resolve, reject) => {
    let seen = ''
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${pattern}; output:\n${seen}`)), timeout)
    const onData = data => {
      seen += data
      if (pattern.test(seen)) {
        clearTimeout(timer)
        child.stdout.off('data', onData)
        resolve()
      }
    }
    child.stdout.on('data', onData)
  })
}
