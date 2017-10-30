import * as postcss from 'postcss';
import * as sass from 'node-sass';
import * as autoprefixer from 'autoprefixer';

import lh from './lib/lh';

export default file => {
    const compiledSass = sass.renderSync({
        file: file
    }).css;

    return postcss([
        lh,
        autoprefixer
    ]).process(compiledSass).css;
}
