const fs = require("fs");
const test = require("tape");
const compile = require('../lib/compile');

const actual = (file) => {
  return compile(`test/fixtures/${file}/${file}.scss`).replace(/\s+/g, '');
};

const expected = (file) => {
  return fs.readFileSync(`test/fixtures/${file}/${file}.css`, 'utf8').replace(/\s+/g, '');
};

test('@media', (t) => {
  t.equal(
    actual('customMedia'),
    expected('customMedia'),
    'should transform custom media queries');

  t.equal(
    actual('mediaMinMax'),
    expected('mediaMinMax'),
    'should transform ranges in media queries');

  t.end();
});

test('units', (t) => {
  t.equal(
    actual('verticalRhythm'),
    expected('verticalRhythm'),
    'should be added');

  t.end();
});

test('range input', (t) => {
  t.equal(
    actual('input-range'),
    expected('input-range'),
    'should be transformed');

  t.end();
});