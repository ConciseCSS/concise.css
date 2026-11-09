import chalk from 'chalk'
import * as postcss from 'postcss'
import * as fs from 'fs'
import preprocessor from '../src/'

test('imports', 'should import ccss files')
test('nested', 'should expand nested rulesets')
test('if-media', 'should expand inline media queries')
test('lh', 'should replace lh units')
test('strip-comments', 'should strip inline comments')
test('type-scale', 'should set sizes using a scale')
test('custom-properties', 'should transform custom properties syntactic sugar')

test('custom-media', {
    'transform-all': 'should transform all custom media',
    'transform-circular-reference': 'should transform circular reference',
    'transform-reference': 'should transform reference',
    'transform-self-reference': 'transform self reference',
    'transform': 'transform',
    'undefined': 'undefined',
})

test('media-minmax', {
    'min-max': 'min max',
    'aspect-ratio': 'aspect ratio',
    'color-index': 'color index',
    'color': 'color',
    'comment': 'comment',
    'device-aspect-ratio': 'device aspect ratio',
    'device-width-height': 'device width height',
    'line-break': 'line breeak',
    'monochrome': 'monochrome',
    'more-units': 'more units',
    'other-name': 'other-name',
    'resolution': 'resolution',
    'shorthands': 'shorthands',
    'width-height': 'width-height'
})

function test (feature: string, extra: string | Object) {
    if (typeof extra === 'string') {
        const actual = `test/${feature}/input.ccss`
        const expected = `test/${feature}/output.css`
        const description = `${chalk.blue(feature)}: ${chalk.gray(extra)}`

        compare(actual, expected, description)
    } else {
        for (const subfeature in <Object>extra) {
            const actual = `test/${feature}/${subfeature}.ccss`
            const expected = `test/${feature}/${subfeature}.css`
            const description = `${chalk.blue(feature)}/${chalk.cyan(subfeature)}: ${chalk.gray(extra[subfeature])}`

            compare(actual, expected, description)
        }
    }

    function compare(inputFile, outputFile, description) {
        const log = console.log

        preprocessor(inputFile).then( result => {
            fs.readFile(outputFile, 'utf-8', (err, data) => {
                if (result.css.replace(/\s+/g, '') == data.replace(/\s+/g, '')) {
                    log(`${chalk.green('OK')}: ${description}`)
                } else {
                    log(`${chalk.red('Fail')}: ${description}`)
                    // TODO: Show a diff instead
                    log(`${chalk.red('CURRENT:')}\n${result.css.replace(/\n\n+/g, '\n')}\n${chalk.blue('EXPECTED:')}\n${data.replace(/\n\n+/g, '\n')}`)
                }
            });
        });
    }
}
