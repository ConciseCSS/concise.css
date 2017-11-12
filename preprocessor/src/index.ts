import * as fs from 'fs';
import * as postcss from 'postcss';
import * as autoprefixer from 'autoprefixer';
import * as nested from 'postcss-nested';

import lh from './lib/lh';
import customMedia from './lib/custom-media';
import mediaMinMax from './lib/media-minmax';

export default file => {
    const ccss = fs.readFileSync(file, 'utf8');

    return postcss([
        nested,
        customMedia,
        mediaMinMax,
        lh,
        autoprefixer
    ]).process(ccss).css;
}
