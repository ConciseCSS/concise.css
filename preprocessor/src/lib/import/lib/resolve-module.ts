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

import * as fs from 'fs'
import * as pify from 'pify'
import * as resolve_ from 'resolve'

import addPrefix from './add-prefix'
import hasExtensions from './has-extensions'

const resolve = pify(resolve_)

export default function (id, base, opts) {
    var prefix = opts.prefix
    var prefixedId = prefix ? addPrefix(id, prefix) : id
    var extensions = opts.extensions
    var resolveOpts = {
        basedir: base,
        extensions: opts.extensions,
        moduleDirectory: [
            'node_modules',
            'web_modules'
        ],
        paths: opts.path,
        isFile: function (file, cb) {
            fs.stat(file, function (err, stat) {
                if (err && err.code === 'ENOENT') {
                    cb(null, false)
                } else if (err) {
                    cb(err)
                } else {
                    cb(null, stat.isFile())
                }
            })
        },
        packageFilter: function (pkg) {
            if (pkg.style) {
                pkg.main = pkg.style
            } else if (
                !pkg.main ||
                !hasExtensions(pkg.main, extensions)
            ) {
                pkg.main = 'index' + extensions[0]
            }
            return pkg
        }
    }

    return resolve('./' + prefixedId, resolveOpts)
        .catch(() => {
            if (!prefix) {
                throw Error()
            }
            return resolve(prefixedId, resolveOpts)
        })
        .catch(() => resolve('./' + id, resolveOpts))
        .catch(() => resolve(id, resolveOpts))
}
