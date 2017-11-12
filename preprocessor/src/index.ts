import * as fs from 'fs';
import * as postcss from 'postcss';
import * as autoprefixer from 'autoprefixer';
import * as nested from 'postcss-nested';
import * as ifMedia from 'postcss-if-media';
import * as scssSyntax from 'postcss-scss';
import * as stripComments from 'postcss-strip-inline-comments';

import lh from './lib/lh';
import customMedia from './lib/custom-media';
import mediaMinMax from './lib/media-minmax';

export default file => {
    const ccss = fs.readFileSync(file, 'utf8');

    return postcss([
        stripComments,
        ifMedia,
        nested,
        customMedia,
        mediaMinMax,
        lh,
        autoprefixer
    ]).process(ccss, { parser: scssSyntax }).css;
}
