const postcss = require('postcss')

const defaults = {
    rootSelector: ':root',
    unit: 'lh',
    lineHeight: 1.5
}

module.exports = postcss.plugin('lh', (opts = defaults) => {
    const options = Object.assign(defaults, opts)

    return css => {
        const lineHeight = getLineHeight(css, options)
        const lhReg = new RegExp('\\d*\\.?\\d+' + options.unit, 'gi')

        css.replaceValues(lhReg, { fast: options.unit }, (val) => {
            return lhToRem(parseFloat(val), lineHeight)
        })
    }
})

function getLineHeight (css, opts) {
    // Start with the default line-height
    let lineHeight = opts.lineHeight

    // Walk over all the root selectors
    css.walkRules(opts.rootSelector, rule => {
        // Omit the process if the selector is inside a print media query
        if (rule.parent && rule.parent.params === 'print') return

        // Walk over all the font or line-height properties
        rule.walkDecls(/font$|line-height/, decl => {
            // Matches {$1:font-size}{$2:unit}/{$3:line-height} when the property is 'font'
            const fontProps = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/) || []

            lineHeight = fontProps[3] || decl.value
        })
    })

    return lineHeight
}

function lhToRem(val, lineHeight) {
    return parseFloat((lineHeight * val).toFixed(3)) + 'rem'
}
