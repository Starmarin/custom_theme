const gulp = require('gulp');
const clean = require('gulp-clean');
const fs = require('fs');

gulp.task('clean', () => {
  return fs.existsSync('dist') ? gulp.src(['dist'], { read: false }).pipe(clean()) : Promise.resolve();
});
