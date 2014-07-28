/**
 * Gulpfile.js - concise.css builder.
 *
 * (c) 2014 Contributors.
 * Released under the MIT license.
 */

'use strict';

/**
 * Dependencies.
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

/**
 * Const.
 */

var AUTOPREFIXER_BROWSERS = [
  'chrome >= 30',
  'ie >= 8',
  'ff >= 24',
  'safari >= 6',
  'opera >= 12',
  'ios >= 6',
  'android 2.3',
  'android >= 4',
  'ie_mob >= 9'
];

var BANNER = [
  '/*!',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.homepage %>',
  ' *',
  ' * Copyright <%= date %> Contributors',
  ' * Released under the <%= pkg.license.type %> license',
  ' * <%= pkg.license.url %>',
  ' */',
  ''
].join('\n');
var pkg = require('./package');
var BANNER_SETTINGS = { pkg: pkg, date: new Date().getFullYear() };

/**
 * Distribute SCSS and js files.
 */

// css
gulp.task('dist:css', function () {
  return gulp.src('scss/concise.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10, // I don't know what does it mean, taken from web-starter-kit :D
      loadPath: ['scss']
    }))
    .on('error', function (e) { console.error(e.message) })
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.header(BANNER, BANNER_SETTINGS))
    .pipe(reload({ stream: true }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'dist:css' }))
});

//js
gulp.task('dist:js', function () {
  return gulp.src('js/*.js') // Set array of files in order U need.
    .pipe($.concat('concise.js'))
    .pipe($.header(BANNER, BANNER_SETTINGS))
    .pipe(reload({ stream: true }))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({ title: 'dist:js' }))
});

gulp.task('dist', ['dist:css', 'dist:js']);

/**
 * Minify.
 */

// css
gulp.task('minify:css', function () {
  return gulp.src('dist/css/concise.css')
    .pipe($.csso())
    .pipe($.header(BANNER, BANNER_SETTINGS))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'dist:min:css' }))
});

// js
gulp.task('minify:js', function () {
  return gulp.src('dist/js/concise.js')
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({ title: 'dist:min:js' }))
});

gulp.task('minify', ['minify:css', 'minify:js']);

/**
 * Linting.
 */

// js
gulp.task('lint:js', function () {
  return gulp.src('js/*.js')
    .pipe($.cached('lint'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
});

gulp.task('lint', ['lint:js']);

/**
 * Check js style.
 */

gulp.task('jscs', function () {
  return gulp.src('js/*.js')
    .pipe($.cached('jscs'))
    .pipe($.jscs())
});

/**
 * Watch for changes.
 */

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['dist:css']);
  gulp.watch('js/**/*.js', ['lint:js', 'jscs', 'dist:js']);
});

/**
 * Serve.
 * Creating autoreload page.
 */

gulp.task('serve', ['watch'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: './'
    }
  });
});

/**
 * Default.
 */

gulp.task('default', ['lint', 'jscs', 'dist', 'minify']);