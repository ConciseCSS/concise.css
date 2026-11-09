// The MIT License (MIT)

// Copyright (c) Maxime Thirouin, Jason Campbell & Kevin Mårtensson

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import * as path from 'path'
import * as postcss from 'postcss'

// placeholder tooling
let sugarss

export default function processContent(result, content, filename, options) {
  const plugins = options.plugins
  const ext = path.extname(filename)

  const parserList = []

  // SugarSS support:
  if (ext === ".sss") {
    if (!sugarss) {
      try {
        sugarss = require("sugarss")
      } catch (e) {
        // Ignore
      }
    }
    if (sugarss) return runPostcss(content, filename, plugins, [sugarss])
  }

  // Syntax support:
  if (result.opts.syntax && result.opts.syntax.parse) {
    parserList.push(result.opts.syntax.parse)
  }

  // Parser support:
  if (result.opts.parser) parserList.push(result.opts.parser)
  // Try the default as a last resort:
  parserList.push(null)

  return runPostcss(content, filename, plugins, parserList)
}

function runPostcss(content, filename, plugins, parsers, index = 0) {
  return postcss(plugins)
    .process(content, {
      from: filename,
      parser: parsers[index],
    })
    .catch(err => {
      // If there's an error, try the next parser
      index++
      // If there are no parsers left, throw it
      if (index === parsers.length) throw err
      return runPostcss(content, filename, plugins, parsers, index)
    })
}
