/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
// const rename  = require('gulp-rename');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');
const named = require('vinyl-named');
const gulpif = require('gulp-if');
const fs = require('fs');
const path = require('path');
const webpackConfig = require('../node_modules/@vue/cli-service/webpack.config.js');

const scriptsDest = 'dist/assets';

function shouldAppendLiquidExt(file) {
  return !/chunk-vendors/.test(file.path) && /\.js/.test(file.extname);
}

function appendLiquidExt(gulppath) {
  gulppath.extname += '.liquid';
  return gulppath;
}

gulp.task('scripts', (done) => {
  return gulp.src(['src/scripts/*.entry.ts', 'src/scripts/*.entry.js'])
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulpif(shouldAppendLiquidExt, rename(appendLiquidExt)))
    .on('error', (err) => done(err))
    .pipe(gulp.dest(scriptsDest))
    .on('end', () => done());
});

gulp.task('scripts:watch', (done) => {
  gulp.watch([
    'tailwind.config.js',
    'src/scripts/**/*.(js|ts|vue|scss)',
    'src/styles/**/*.scss',
  ], gulp.series('scripts'));
  done();
});
