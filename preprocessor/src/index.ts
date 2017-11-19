import * as fs from 'fs';
import * as postcss from 'postcss';
import * as autoprefixer from 'autoprefixer';
import * as nested from 'postcss-nested';
import * as ifMedia from 'postcss-if-media';
import * as scssSyntax from 'postcss-scss';
import * as stripComments from 'postcss-strip-inline-comments';
import * as imports from 'postcss-easy-import';

import lh from './lib/lh';
import customMedia from './lib/custom-media';
import mediaMinMax from './lib/media-minmax';
import typeScale from './lib/type-scale';

export default file => {
    const ccss = fs.readFileSync(file, 'utf8');

    return postcss()
        .use(imports({ extensions: '.ccss', prefix: '_' }))
        .use(stripComments())
        .use(ifMedia())
        .use(nested())
        .use(customMedia())
        .use(mediaMinMax())
        .use(lh())
        .use(typeScale())
        .use(autoprefixer())
        .process(ccss, { parser: scssSyntax, from: file });
}
