import * as postcss from 'postcss'

export default postcss.plugin('custom-properties', () => {
    return css => {
        // Extend custom properties that aren't inside var()
        // TODO: I don't know if there is a way to include the conditional inside the regex
        css.replaceValues(/var\(--[\w\d-_]+|--[\w\d-_]+/g, { fast: '--' }, property => {
            if (!property.includes('var(')) return `var(${property})`
            else return property
        })
    }
})
