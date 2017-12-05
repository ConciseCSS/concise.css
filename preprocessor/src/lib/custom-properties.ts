import * as postcss from 'postcss'

export default postcss.plugin('custom-properties', () => {
    return css => {
        css.replaceValues(/(var\()*--[\w\d-_]+(\))*(\(.*\))*/g, { fast: '--' }, value => {
            // Matches --variable(fallback)
            const withFallbackRegex = /(--[\w\d-_]+)\((.*)\)/

            // If the value is already using var()
            if (value.includes('var(')) return value
            // If the value is --variable(fallback)
            else if (withFallbackRegex.test(value)) {
                // Extract {$1:propertyName}{$2:Fallback}
                const customProperty = value.match(withFallbackRegex)
                return `var(${customProperty[1]}, ${customProperty[2]})`
            }
            // If the value is --property
            else return `var(${value})`
        })
    }
})
