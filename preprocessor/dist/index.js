"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const nested = require("postcss-nested");
const lh_1 = require("./lib/lh");
const custom_media_1 = require("./lib/custom-media");
const media_minmax_1 = require("./lib/media-minmax");
exports.default = file => {
    const ccss = fs.readFileSync(file, 'utf8');
    return postcss([
        nested,
        custom_media_1.default,
        media_minmax_1.default,
        lh_1.default,
        autoprefixer
    ]).process(ccss).css;
};
