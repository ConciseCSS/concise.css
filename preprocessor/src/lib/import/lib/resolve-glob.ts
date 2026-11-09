// The MIT License (MIT)

// Copyright 2016 Bogdan Chadkin <trysound@yandex.ru>

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
import * as globby from 'globby'
import * as reduce from 'lodash/fp/reduce'
import * as findIndex from 'lodash/fp/findIndex'
import * as map from 'lodash/fp/map'
import * as flow from 'lodash/fp/flow'
import * as filter from 'lodash/fp/filter'

import addPrefix from './add-prefix'
import hasPrefix from './has-prefix'
import hasExtensions from './has-extensions'

function checkPrefixedVersionExists(fileToCheck, paths, prefix) {
    var index = findIndex(p => {
        const currentFile = path.basename(p)
        return currentFile === prefix + fileToCheck
    }, paths)
    return index === -1
}

export default function resolveGlob(id, base, opts) {
    var prefix = opts.prefix
    var extensions = opts.extensions
    var paths = [base].concat(opts.path)
    // search in modules if non-relative filepath given
    if (id[0] !== '.') {
        paths = paths.concat([
            'node_modules',
            'web_modules'
        ])
    }
    var prefixedId = prefix ? addPrefix(id, prefix) : null

    var patterns = reduce((acc, p) => {
        [''].concat(extensions).forEach(ext => {
            if (prefix) {
                acc.push(path.resolve(p, prefixedId + ext))
            }
            acc.push(path.resolve(p, id + ext))
        })
        return acc
    }, [], paths)

    return globby(patterns)
        .then(files => {
            return flow(
                // Allows a file through if it has a prefix. If it doesn't have
                // a prefix the current list of files are checked to see if a
                // prefix version exists and if not it is added.
                reduce((acc, item) => {
                    var fileName = path.basename(item)
                    if (hasPrefix(item, prefix) || checkPrefixedVersionExists(fileName, acc, prefix)) { // eslint-disable-line max-len
                        acc.push(item)
                    }
                    return acc
                }, []),
                filter(file => hasExtensions(file, extensions)),
                map(file => path.normalize(file))
            )(files)
        })
}
