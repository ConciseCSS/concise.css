/**
 * lh unit: lengths relative to the root line height, used for vertical rhythm.
 *
 * Port of postcss-lh@2 (PostCSS 7) to the PostCSS 8 plugin API.
 *
 *   :root { font: 16px / 1.5 sans-serif }   ->   p { margin-bottom: 1lh }
 *                                                p { margin-bottom: 1.5rem }
 */

const defaults = {
  // Selector where the line height is set
  rootSelector: ':root',
  // Unit name used in stylesheets
  unit: 'lh',
  // Fallback when the root selector sets no line height
  lineHeight: 1.5
}

// Captures {1: font-size}{2: unit} / {3: line-height} in a `font` shorthand
const FONT_SHORTHAND = /(\d*\.?\d+)(r?em|px|pt|%)\s*\/\s*(\d*\.?\d+)\s+/

const lh = (opts = {}) => {
  const options = { ...defaults, ...opts }
  const unitPattern = new RegExp(`(?<![\\w.-])(\\d*\\.?\\d+)${escape(options.unit)}\\b`, 'gi')

  return {
    postcssPlugin: 'concise-lh',
    // Runs after imports and nesting so every root rule is visible
    OnceExit (root) {
      const lineHeight = getLineHeight(root, options)

      root.replaceValues(unitPattern, { fast: options.unit }, (_, value) =>
        lhToRem(parseFloat(value), lineHeight)
      )
    }
  }
}
lh.postcss = true

export default lh

export function getLineHeight (root, { rootSelector, lineHeight }) {
  let current = Number(lineHeight)

  root.walkRules(rootSelector, rule => {
    // Print styles have their own rhythm and must not affect the screen one
    if (isInsidePrint(rule)) return

    rule.each(node => {
      if (node.type !== 'decl') return

      if (node.prop === 'line-height') {
        const value = parseFloat(node.value)
        if (!Number.isNaN(value)) current = value
      } else if (node.prop === 'font') {
        const match = node.value.match(FONT_SHORTHAND)
        if (match) current = parseFloat(match[3])
      }
    })
  })

  return current
}

export function lhToRem (value, lineHeight) {
  return parseFloat((lineHeight * value).toFixed(3)) + 'rem'
}

function isInsidePrint (node) {
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent.type === 'atrule' && parent.name === 'media' && /\bprint\b/.test(parent.params)) return true
  }
  return false
}

function escape (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
