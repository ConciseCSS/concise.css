"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");
const ifMedia = require("postcss-if-media");
const scssSyntax = require("postcss-scss");
const stripComments = require("postcss-strip-inline-comments");
const lh_1 = require("./lib/lh");
const custom_media_1 = require("./lib/custom-media");
const media_minmax_1 = require("./lib/media-minmax");
exports.default = file => {
    const ccss = fs.readFileSync(file, 'utf8');
    return postcss([
        stripComments,
        ifMedia,
        nested,
        custom_media_1.default,
        media_minmax_1.default,
        lh_1.default,
        autoprefixer
    ]).process(ccss, { parser: scssSyntax }).css;
};
