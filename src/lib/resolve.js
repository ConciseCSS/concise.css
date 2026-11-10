/**
 * Resolver for postcss-import that understands Concise conventions:
 *
 *   @import 'settings';              ./settings.pcss, ./_settings.pcss, ./settings.css, ./settings/index.pcss …
 *   @import './components/button';   same lookup, relative to the importing file
 *   @import 'concise.css/core';      node_modules/concise.css/core/index.pcss
 *   @import 'some-package';          its package.json "style" field, or index.pcss / index.css
 *
 * Bare names are looked up next to the importing file first, then in node_modules
 * (walking up from the importing file's directory).
 */

import fs from 'node:fs'
import path from 'node:path'

export const EXTENSIONS = ['.pcss', '.css']

export default function resolve (id, basedir) {
  const tried = []
  const attempt = base => {
    const found = findFile(base, tried)
    if (found) return found
  }

  const isRelative = /^\.{1,2}[\\/]/.test(id) || path.isAbsolute(id)
  const local = attempt(path.resolve(basedir, id))
  if (local) return local

  if (!isRelative) {
    const found = resolveModule(id, basedir, tried)
    if (found) return found
  }

  throw new Error(`Unable to resolve "${id}" from ${basedir}. Tried:\n  ${tried.join('\n  ')}`)
}

function resolveModule (id, basedir, tried) {
  const parts = id.split('/')
  const nameLength = id.startsWith('@') ? 2 : 1
  const name = parts.slice(0, nameLength).join('/')
  const subpath = parts.slice(nameLength).join('/')

  for (let dir = basedir; ; dir = path.dirname(dir)) {
    const packageDir = path.join(dir, 'node_modules', name)

    if (isDirectory(packageDir)) {
      if (subpath) return findFile(path.join(packageDir, subpath), tried)

      const style = readStyleField(packageDir)
      if (style) {
        const found = findFile(path.join(packageDir, style), tried)
        if (found) return found
      }
      return findFile(path.join(packageDir, 'index'), tried)
    }

    if (path.dirname(dir) === dir) return undefined
  }
}

// Tries `base` as given, with each extension, as a `_partial`, and as a directory index
function findFile (base, tried) {
  const dir = path.dirname(base)
  const name = path.basename(base)
  const hasExtension = EXTENSIONS.includes(path.extname(name))
  const candidates = hasExtension
    ? [base, path.join(dir, `_${name}`)]
    : [
        ...EXTENSIONS.flatMap(ext => [path.join(dir, name + ext), path.join(dir, `_${name}${ext}`)]),
        ...EXTENSIONS.map(ext => path.join(base, `index${ext}`))
      ]

  for (const candidate of candidates) {
    tried.push(candidate)
    if (isFile(candidate)) return candidate
  }
}

function readStyleField (packageDir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')).style
  } catch {
    return undefined
  }
}

function isFile (file) {
  return fs.statSync(file, { throwIfNoEntry: false })?.isFile() ?? false
}

function isDirectory (dir) {
  return fs.statSync(dir, { throwIfNoEntry: false })?.isDirectory() ?? false
}
