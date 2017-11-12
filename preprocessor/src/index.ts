import * as fs from 'fs';
import * as postcss from 'postcss';
import * as autoprefixer from 'autoprefixer';

import lh from './lib/lh';
import customMedia from './lib/custom-media';
import mediaMinMax from './lib/media-minmax';

export default file => {
    const ccss = fs.readFileSync(file, 'utf8');

    return postcss([
        customMedia,
        mediaMinMax,
        lh,
        autoprefixer
    ]).process(ccss).css;
}
