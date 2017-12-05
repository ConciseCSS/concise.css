"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = require("postcss");
exports.default = postcss.plugin('custom-properties', () => {
    return css => {
        css.replaceValues(/(var\()*--[\w\d-_]+(\))*(\(.*\))*/g, { fast: '--' }, value => {
            // Matches --variable(fallback)
            const withFallbackRegex = /(--[\w\d-_]+)\((.*)\)/;
            // If the value is already using var()
            if (value.includes('var('))
                return value;
            else if (withFallbackRegex.test(value)) {
                // Extract {$1:propertyName}{$2:Fallback}
                const customProperty = value.match(withFallbackRegex);
                return `var(${customProperty[1]}, ${customProperty[2]})`;
            }
            else
                return `var(${value})`;
        });
    };
});
