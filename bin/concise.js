#!/usr/bin/env node

import { watch as fsWatch } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { parseArgs, styleText } from 'node:util'
import postcss from 'postcss'

import concise from '../src/index.js'

const pkg = JSON.parse(await fs.readFile(new URL('../package.json', import.meta.url), 'utf8'))

const USAGE = `Usage: concise compile <input.pcss> <output.css> [options]

Options:
  -w, --watch     Recompile when the input or any file it imports changes
  -h, --help      Show this help
  -v, --version   Show the version`

const { values: flags, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    watch: { type: 'boolean', short: 'w' },
    help: { type: 'boolean', short: 'h' },
    version: { type: 'boolean', short: 'v' }
  }
})

const log = {
  info: (label, text) => console.log(styleText(['bold', 'green'], label) + text),
  watch: (label, text) => console.log(styleText(['bold', 'blue'], label) + styleText('gray', text)),
  error: text => console.error(styleText(['bold', 'red'], 'Error: ') + text)
}

const [command, input, output] = positionals

if (flags.version) {
  console.log(pkg.version)
} else if (flags.help || !command) {
  console.log(USAGE)
} else if (command !== 'compile' || !input || !output || positionals.length > 3) {
  log.error(command === 'compile' ? 'compile needs an input and an output file' : `unknown command "${command}"`)
  console.error(`\n${USAGE}`)
  process.exitCode = 1
} else {
  const files = await build(input, output)
  if (flags.watch) await watch(input, output, files)
}

/** Compiles input into output. Returns every file the result depends on (undefined on failure). */
async function build (input, output) {
  try {
    const css = await fs.readFile(input, 'utf8')
    const result = await postcss([concise()]).process(css, { from: input, to: output })

    for (const warning of result.warnings()) console.warn(styleText('yellow', warning.toString()))

    await fs.mkdir(path.dirname(output), { recursive: true })
    await fs.writeFile(output, result.css)
    log.info('File written: ', `${output} (from ${input})`)

    const dependencies = result.messages.filter(message => message.type === 'dependency').map(message => message.file)
    return [path.resolve(input), ...dependencies]
  } catch (error) {
    // CssSyntaxError includes file, line and a code frame; anything else is reported as is
    log.error(error.name === 'CssSyntaxError' ? error.message + '\n' + error.showSourceCode() : error.message)
    process.exitCode = 1
  }
}

/**
 * Watches the directories of the given files rather than the files themselves:
 * editors that save atomically (write a temporary file, then rename it) replace
 * the file, which would silently end a watcher attached to the old one.
 */
async function watch (input, output, files = [path.resolve(input)]) {
  const watched = new Set()
  const directories = new Map()
  const changed = new Set()
  let timer
  let building = Promise.resolve()

  const follow = file => {
    watched.add(file)
    const dir = path.dirname(file)
    if (directories.has(dir)) return

    const watcher = fsWatch(dir, (event, filename) => {
      const file = filename && path.join(dir, filename.toString())
      if (!watched.has(file)) return

      // One save fires several events: wait for them to settle, then build once
      changed.add(file)
      clearTimeout(timer)
      timer = setTimeout(() => { building = building.then(rebuild) }, 50)
    })
    watcher.on('error', error => log.error(error.message))
    directories.set(dir, watcher)
  }

  const rebuild = async () => {
    for (const file of changed) log.watch('Change: ', path.relative('.', file))
    changed.clear()
    process.exitCode = 0

    // Follow new imports; files no longer imported are simply ignored until the next run
    for (const dependency of (await build(input, output)) ?? []) {
      if (!watched.has(dependency)) follow(dependency)
    }
  }

  files.forEach(follow)
  log.watch('\nWatching for changes in: ', [...watched].map(file => path.relative('.', file)).join(', '))
}
