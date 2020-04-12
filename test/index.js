const fs = require("fs")
const path = require('path')
const test = require("tape")
const compile = require('../src/index.js')

;(() => {
  const actual = async file => {
    const sourcePath = path.join(__dirname,`fixtures/${file}/${file}.pcss`)
    const fileContent = fs.readFileSync(sourcePath, 'utf8')
    const result = await compile(fileContent, sourcePath)

    return result.css.replace(/\s+/g, '')
  }

  const expected = (file) =>
    fs.readFileSync(
      path.join(__dirname, `fixtures/${file}/${file}.css`),
      'utf8'
    ).replace(/\s+/g, '')


  test('Media queries', async (t) => {
    t.equal(
      await actual('customMedia'),
      expected('customMedia'),
      'Custom media queries')

    t.equal(
      await actual('mediaMinMax'),
      expected('mediaMinMax'),
      'Ranges in media queries')

    t.end()
  })

  test('Units', async (t) => {
    t.equal(
      await actual('verticalRhythm'),
      expected('verticalRhythm'),
      'lh')

    t.end()
  })
})()
