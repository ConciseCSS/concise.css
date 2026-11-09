/**
 * Type scale: unitless `font-size` steps are converted to rem using the
 * ratio set in `--type-ratio` on the root selector.
 *
 *   :root { --type-ratio: 1.2 }   h1 { font-size: 6 }   ->   h1 { font-size: 2.0736rem }
 *
 * Step 2 is the base size (1rem); each step up or down multiplies or divides by the ratio.
 */

const defaults = {
  rootSelector: ':root',
  typeRatio: 1.2,
  ratioProperty: '--type-ratio'
}

const STEP = /^\d+$/

const typeScale = (opts = {}) => {
  const options = { ...defaults, ...opts }

  return {
    postcssPlugin: 'concise-type-scale',
    OnceExit (root) {
      const ratio = getTypeRatio(root, options)

      root.walkDecls('font-size', decl => {
        const value = decl.value.trim()
        // `font-size: 0` is a legitimate CSS value, so only positive steps are converted
        if (STEP.test(value) && Number(value) > 0) decl.value = getSize(Number(value), ratio)
      })
    }
  }
}
typeScale.postcss = true

export default typeScale

function getTypeRatio (root, { rootSelector, typeRatio, ratioProperty }) {
  let ratio = Number(typeRatio)

  root.walkRules(rootSelector, rule => {
    // Print styles may use a different ratio that must not affect the screen one
    if (rule.parent?.type === 'atrule' && /\bprint\b/.test(rule.parent.params)) return

    rule.walkDecls(ratioProperty, decl => {
      const value = parseFloat(decl.value)
      if (!Number.isNaN(value)) ratio = value
    })
  })

  return ratio
}

function getSize (step, ratio) {
  return parseFloat(Math.pow(ratio, step - 2).toFixed(4)) + 'rem'
}
