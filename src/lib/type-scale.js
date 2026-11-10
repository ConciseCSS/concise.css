/**
 * Type scale: unitless `font-size` steps become a power of `--type-ratio`,
 * calculated by the browser so the ratio can change at runtime.
 *
 *   h1 { font-size: 6 }   ->   h1 { font-size: calc(pow(var(--type-ratio), 4) * 1rem) }
 *
 * Step 2 is the base size (1rem); each step up or down multiplies or divides by the ratio.
 */

const STEP = /^\d+$/

const typeScale = () => ({
  postcssPlugin: 'concise-type-scale',
  Declaration: {
    'font-size' (decl) {
      const value = decl.value.trim()
      // `font-size: 0` is a legitimate CSS value, so only positive steps are converted
      if (STEP.test(value) && Number(value) > 0) decl.value = getSize(Number(value))
    }
  }
})
typeScale.postcss = true

export default typeScale

function getSize (step) {
  return step === 2 ? '1rem' : `calc(pow(var(--type-ratio), ${step - 2}) * 1rem)`
}
