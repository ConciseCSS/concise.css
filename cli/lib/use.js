const postcss = require('postcss')
const fs = require('fs')
const path = require('path')

const defaults = {

}

module.exports = postcss.plugin('use', (opts = defaults) => {
  const options = Object.assign(defaults, opts)

  return css => {

    css.walkAtRules('use', rule => {
      const fileName = rule.params
      const fileDir = path.dirname(css.source.input.file)
      const filePath = path.join(fileDir, fileName)

      const fileContent = isLocal(filePath)
        ? fs.readFileSync(filePath, 'utf-8')
        : 'download file'

      console.log(fileContent)
      // rule.replaceWith(fileContent)
    })


  }
})

const isLocal = path => {
  return true
}
