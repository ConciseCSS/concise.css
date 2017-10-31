// The MIT License (MIT)

// Copyright (c) 2017 Maxime Thirouin & Nicolas Gallagher

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

import * as postcss from 'postcss';

var EXTENSION_RE = /\(\s*(--[\w-]+)\s*\)/g

/*
 * Resolve custom media values.
 */
function resolveValue(query, depChain, map, result) {
  if (!EXTENSION_RE.test(query.value)) {
    return query.value
  }
  var val = query.value.replace(EXTENSION_RE, function(orig, name) {
    if (!map[name]) {
      return orig
    }

    var mq = map[name]
    if (mq.resolved) {
      return mq.value
    }

    if (depChain.indexOf(name) !== -1) {
      mq.circular = true
      return orig
    }
    depChain.push(name)
    mq.value = resolveValue(mq, depChain, map, result)
    return mq.value
  })
  if (val === query.value) {
    query.circular = true
  }
  return val
}

/*
 * read & replace custom media queries by standard media queries
 */
function customMedia(options) {
  return function(styles, result) {
    options = options || {}
    var extensions = {}
    if (options.extensions) {
      Object.keys(options.extensions).forEach(function(name) {
        var val = options.extensions[name]
        if (name.slice(0, 2) !== "--") {
          name = "--" + name
        }
        extensions[name] = val
      })
    }
    var appendExtensions = options.appendExtensions
    var preserve = options.preserve
    var map = {}
    var toRemove = []

    // read custom media queries
    styles.walkAtRules(function(rule) {
      if (rule.name !== "custom-media") {
        return
      }

      var params = rule.params.split(" ")
      // @custom-media <extension-name> <media-query-list>;
      // map[<extension-name>] = <media-query-list>
      map[params.shift()] = {
        value: params.join(" "),
        circular: false,
        resolved: false,
      }

      if (!preserve) {
        toRemove.push(rule)
      }
    })

    // apply js-defined media queries
    Object.keys(extensions).forEach(function(name) {
      map[name] = {
        value: extensions[name],
        circular: false,
        resolved: false,
      }
    })

    Object.keys(map).forEach(function(name) {
      map[name].value = resolveValue(map[name], [ name ], map, result)
      map[name].resolved = true
    })

    // transform custom media query aliases
    styles.walkAtRules(function(rule) {
      if (rule.name !== "media") {
        return
      }

      rule.params = rule.params.replace(EXTENSION_RE, function(_, name) {
        if (map[name]) {
          if (map[name].circular) {
            result.warn(
              "Circular @custom-media definition for '" + name +
                "'. The entire rule has been removed from the output.",
              { node: rule }
            )
            toRemove.push(rule)
          }
          return map[name].value
        }

        result.warn(
          "Missing @custom-media definition for '" + name +
            "'. The entire rule has been removed from the output.",
          { node: rule }
        )
        toRemove.push(rule)
      })
    })

    if (appendExtensions) {
      var names = Object.keys(map)
      if (names.length) {
        names.forEach(function(name) {
          if (map[name].circular) {
            return
          }
          var atRule = postcss.atRule({
            name: "custom-media",
            params: name + " " + map[name].value,
            raws: {
              afterName: " ",
            },
          })
          styles.append(atRule)
        })
        styles.raws.semicolon = true
        styles.raws.after = "\n"
      }
    }

    // remove @custom-media
    toRemove.forEach(function(rule) {
      rule.remove()
    })
  }
}

export default postcss.plugin("postcss-custom-media", customMedia)
