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

import * as valueParser from 'postcss-value-parser'

const stringify = valueParser.stringify

function split(params, start) {
  const list = []
  const last = params.reduce((item, node, index) => {
    if (index < start) return ""
    if (node.type === "div" && node.value === ",") {
      list.push(item)
      return ""
    }
    return item + stringify(node)
  }, "")
  list.push(last)
  return list
}

export default function(result, styles) {
  const statements = []
  let nodes = []

  styles.each(node => {
    let stmt
    if (node.type === "atrule") {
      if (node.name === "import") stmt = parseImport(result, node)
      else if (node.name === "media") stmt = parseMedia(result, node)
    }

    if (stmt) {
      if (nodes.length) {
        statements.push({
          type: "nodes",
          nodes: nodes,
          media: [],
        })
        nodes = []
      }
      statements.push(stmt)
    } else nodes.push(node)
  })

  if (nodes.length) {
    statements.push({
      type: "nodes",
      nodes: nodes,
      media: [],
    })
  }

  return statements
}

function parseMedia(result, atRule) {
  const params = valueParser(atRule.params).nodes
  return {
    type: "media",
    node: atRule,
    media: split(params, 0),
  }
}

function parseImport(result, atRule) {
  let prev = getPrev(atRule)
  if (prev) {
    do {
      if (
        prev.type !== "atrule" ||
        (prev.name !== "import" && prev.name !== "charset")
      ) {
        return result.warn(
          "@import must precede all other statements (besides @charset)",
          { node: atRule }
        )
      } else prev = getPrev(prev)
    } while (prev)
  }

  if (atRule.nodes) {
    return result.warn(
      "It looks like you didn't end your @import statement correctly. " +
        "Child nodes are attached to it.",
      { node: atRule }
    )
  }

  const params = valueParser(atRule.params).nodes
  const stmt: any = {
    type: "import",
    node: atRule,
    media: [],
  }

  // prettier-ignore
  if (
    !params.length ||
    (
      params[0].type !== "string" ||
      !params[0].value
    ) &&
    (
      params[0].type !== "function" ||
      params[0].value !== "url" ||
      !params[0].nodes.length ||
      !params[0].nodes[0].value
    )
  ) {
    return result.warn(`Unable to find uri in '${  atRule.toString()  }'`, {
      node: atRule,
    })
  }

  if (params[0].type === "string") stmt.uri = params[0].value
  else stmt.uri = params[0].nodes[0].value
  stmt.fullUri = stringify(params[0])

  if (params.length > 2) {
    if (params[1].type !== "space") {
      return result.warn("Invalid import media statement", { node: atRule })
    }
    stmt.media = split(params, 2)
  }

  return stmt
}

function getPrev(item) {
  let prev = item.prev()
  while (prev && prev.type === "comment") {
    prev = prev.prev()
  }
  return prev
}
