import * as test from 'tape';
import * as postcss from 'postcss';
import * as fs from 'fs';

import preprocessor from '../src/'

const actual = feature => {
    return preprocessor(`spec/${feature}/input.ccss`).replace(/\s+/g, '');
};

const expected = feature => {
    return fs.readFileSync(`spec/${feature}/output.css`, 'utf8').replace(/\s+/g, '');
};

test('lh', (t) => {
    t.equal(
        actual('lh'),
        expected('lh'),
        'should be transformed to rem');

    t.end();
});
