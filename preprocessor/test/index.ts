import * as test from 'tape';
import * as postcss from 'postcss';
import * as fs from 'fs';

import preprocessor from '../src/';

const actual = feature => preprocessor(`test/${feature}.ccss`).replace(/\s+/g, '');
const expected = feature => fs.readFileSync(`test/${feature}.css`, 'utf8').replace(/\s+/g, '');

test('lh', t => {
    t.equal(
        actual('lh/input'),
        expected('lh/output'),
        'should be transformed to rem');

    t.end();
});

test('custom-media', t => {
    t.equal(
        actual('custom-media/transform-all'),
        expected('custom-media/transform-all'),
        'transform all');

    t.equal(
        actual('custom-media/transform-circular-reference'),
        expected('custom-media/transform-circular-reference'),
        'transform circular reference');

    t.equal(
        actual('custom-media/transform-reference'),
        expected('custom-media/transform-reference'),
        'transform reference');

    t.equal(
        actual('custom-media/transform-self-reference'),
        expected('custom-media/transform-self-reference'),
        'transform self reference');

    t.equal(
        actual('custom-media/transform'),
        expected('custom-media/transform'),
        'transform');

    t.equal(
        actual('custom-media/undefined'),
        expected('custom-media/undefined'),
        'undefined');

    t.end();
});

test('media-minmax', t => {
    t.equal(
        actual('media-minmax/aspect-ratio'),
        expected('media-minmax/aspect-ratio'),
        'aspect ratio');

    t.equal(
        actual('media-minmax/color-index'),
        expected('media-minmax/color-index'),
        'color-index');

    t.equal(
        actual('media-minmax/color'),
        expected('media-minmax/color'),
        'color');

    t.equal(
        actual('media-minmax/comment'),
        expected('media-minmax/comment'),
        'comment');

    t.equal(
        actual('media-minmax/device-aspect-ratio'),
        expected('media-minmax/device-aspect-ratio'),
        'device-aspect-ratio');

    t.equal(
        actual('media-minmax/device-width-height'),
        expected('media-minmax/device-width-height'),
        'device-width-height');

    t.equal(
        actual('media-minmax/line-break'),
        expected('media-minmax/line-break'),
        'line-break');

    t.equal(
        actual('media-minmax/min-max'),
        expected('media-minmax/min-max'),
        'min-max');

    t.equal(
        actual('media-minmax/monochrome'),
        expected('media-minmax/monochrome'),
        'monochrome');

    t.equal(
        actual('media-minmax/more-units'),
        expected('media-minmax/more-units'),
        'more-units');

    t.equal(
        actual('media-minmax/other-name'),
        expected('media-minmax/other-name'),
        'other-name');

    t.equal(
        actual('media-minmax/resolution'),
        expected('media-minmax/resolution'),
        'resolution');

    t.equal(
        actual('media-minmax/shorthands'),
        expected('media-minmax/shorthands'),
        'shorthands');

    t.equal(
        actual('media-minmax/width-height'),
        expected('media-minmax/width-height'),
        'width-height');

    t.end();
});

test('nested', t => {
    t.equal(
        actual('nested/input'),
        expected('nested/output'),
        'should transform nested rulesets');

    t.end();
});
