"use strict";
// The MIT License (MIT)
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2014 PostCSS
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const postcss = require("postcss");
exports.default = postcss.plugin('postcss-media-minmax', () => {
    return css => {
        const feature_unit = {
            'width': 'px',
            'height': 'px',
            'device-width': 'px',
            'device-height': 'px',
            'aspect-ratio': '',
            'device-aspect-ratio': '',
            'color': '',
            'color-index': '',
            'monochrome': '',
            'resolution': 'dpi'
        };
        //支持 min-/max- 前缀的属性
        const feature_name = Object.keys(feature_unit);
        const step = .001; // smallest even number that won’t break complex queries (1in = 96px)
        const power = {
            '>': 1,
            '<': -1
        };
        const minmax = {
            '>': 'min',
            '<': 'max'
        };
        function create_query(name, gtlt, eq, value, params) {
            return value.replace(/([-\d\.]+)(.*)/, (match, number, unit) => {
                const initialNumber = parseFloat(number);
                if (parseFloat(number) || eq) {
                    // if eq is true, then number remains same
                    if (!eq) {
                        // change integer pixels value only on integer pixel
                        if (unit === 'px' && initialNumber === parseInt(number, 10)) {
                            number = initialNumber + power[gtlt];
                        }
                        else {
                            number = Number(Math.round(parseFloat(parseFloat(number) + step * power[gtlt] + 'e6')) + 'e-6');
                        }
                    }
                }
                else {
                    number = power[gtlt] + feature_unit[name];
                }
                return '(' + minmax[gtlt] + '-' + name + ': ' + number + unit + ')';
            });
        }
        // 读取 media-feature
        css.walkAtRules((rule, i) => {
            if (rule.name !== "media" && rule.name !== "custom-media")
                return;
            /**
             * 转换 <mf-name> <|>= <mf-value>
             *    $1  $2   $3
             * (width >= 300px) => (min-width: 300px)
             * (width <= 900px) => (max-width: 900px)
             */
            //取值不支持负值
            //But -0 is always equivalent to 0 in CSS, and so is also accepted as a valid <mq-boolean> value.
            rule.params = rule.params.replace(/\(\s*([a-z-]+?)\s*([<>])(=?)\s*((?:-?\d*\.?(?:\s*\/?\s*)?\d+[a-z]*)?)\s*\)/gi, ($0, $1, $2, $3, $4) => {
                let params = '';
                if (feature_name.indexOf($1) > -1)
                    return create_query($1, $2, $3, $4, rule.params);
                //如果不是指定的属性，不做替换
                return $0;
            });
            /**
             * 转换  <mf-value> <|<= <mf-name> <|<= <mf-value>
             * 转换  <mf-value> >|>= <mf-name> >|>= <mf-value>
             *   $1  $2$3 $4  $5$6  $7
             * (500px <= width <= 1200px) => (min-width: 500px) and (max-width: 1200px)
             * (500px < width <= 1200px) => (min-width: 501px) and (max-width: 1200px)
             * (900px >= width >= 300px)  => (min-width: 300px) and (max-width: 900px)
             */
            rule.params = rule.params.replace(/\(\s*((?:-?\d*\.?(?:\s*\/?\s*)?\d+[a-z]*)?)\s*(<|>)(=?)\s*([a-z-]+)\s*(<|>)(=?)\s*((?:-?\d*\.?(?:\s*\/?\s*)?\d+[a-z]*)?)\s*\)/gi, ($0, $1, $2, $3, $4, $5, $6, $7) => {
                if (feature_name.indexOf($4) > -1) {
                    if ($2 === '<' && $5 === '<' || $2 === '>' && $5 === '>') {
                        const min = ($2 === '<') ? $1 : $7;
                        const max = ($2 === '<') ? $7 : $1;
                        // output differently depended on expression direction
                        // <mf-value> <|<= <mf-name> <|<= <mf-value>
                        // or
                        // <mf-value> >|>= <mf-name> >|>= <mf-value>
                        const equals_for_min = ($2 === '>') ? $6 : $3;
                        const equals_for_max = ($2 === '>') ? $3 : $6;
                        return create_query($4, '>', equals_for_min, min) + ' and ' + create_query($4, '<', equals_for_max, max);
                    }
                }
                //如果不是指定的属性，不做替换
                return $0;
            });
        });
    };
});
