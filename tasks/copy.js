const gulpif = require('gulp-if');
const gulp = require('gulp');
const flatten = require('gulp-flatten');
const changed = require('gulp-changed');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const schema = require('../schema/default.js');

function isAccountTemplate(file) {
  return file.path.includes('templates/customers');
}

function isLiquidOrJSON(file) {
  return /\.(liquid|json)/.test(file.path);
}

gulp.task('copy', () => {
  return gulp
    .src(['src/liquid/**/*', '!src/liquid/config/settings_data.json'])
    .pipe(gulpif(isAccountTemplate, flatten({ includeParents: 2 }), flatten({ includeParents: 1 })))
    .pipe(gulpif(isLiquidOrJSON, ejs(schema)))
    .pipe(changed('dist/', { hasChanged: changed.compareContents }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:watch', (done) => {
  watch(['src/liquid/**/*', '!src/liquid/config/settings_data.json'])
    .pipe(gulpif(isAccountTemplate, flatten({ includeParents: 2 }), flatten({ includeParents: 1 })))
    .pipe(gulpif(isLiquidOrJSON, ejs(schema)))
    .pipe(changed('dist/', { hasChanged: changed.compareContents }))
    .pipe(gulp.dest('dist/'));

  done();
});
