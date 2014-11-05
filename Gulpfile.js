/**
 * Gulpfile.js - Concise builder
 *
 * (c) 2014 Contributors.
 * Released under the MIT license.
 */


'use strict';


/**
 * Dependencies
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


/**
 * Constants
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

/**
 * Distribute SCSS and JS files
 */

// CSS
gulp.task('dist:css', function () {
  return gulp.src('scss/concise.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 5,
      loadPath: ['scss']
    }))
    .on('error', function (e) { console.error(e.message) })
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'dist:css' }))
});

// JS
gulp.task('dist:js', function () {
  return gulp.src('js/*.js')
    .pipe($.concat('concise.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({ title: 'dist:js' }))
});

gulp.task('dist', ['dist:css', 'dist:js']);


/**
 * Minify
 */

// CSS
gulp.task('minify:css', function () {
  return gulp.src('dist/css/concise.css')
    .pipe($.csso())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'dist:min:css' }))
});

// JS
gulp.task('minify:js', function () {
  return gulp.src('dist/js/concise.js')
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({ title: 'dist:min:js' }))
});

gulp.task('minify', ['minify:css', 'minify:js']);


/**
 * Linting
 */

// JS
gulp.task('lint:js', function () {
  return gulp.src('js/*.js')
    .pipe($.cached('lint'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
});

gulp.task('lint', ['lint:js']);


/**
 * Check JS style
 */

gulp.task('jscs', function () {
  return gulp.src('js/*.js')
    .pipe($.cached('jscs'))
    .pipe($.jscs())
});


/**
 * Watch for changes
 */

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['dist:css']);
  gulp.watch('js/**/*.js', ['lint:js', 'jscs', 'dist:js']);
});

/**
 * Default
 */

gulp.task('default', ['lint', 'jscs', 'dist', 'minify']);
