const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');

gulp.task('icons', () => {
  const svgs = gulp.src('src/icons/**/*.svg').pipe(svgstore({ inlineSvg: true }));

  function fileToString(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src(['src/liquid/snippets/icon-store.liquid'])
    .pipe(inject(svgs, { transform: fileToString }))
    .pipe(gulp.dest('dist/snippets'));
});

gulp.task('icons:watch', (done) => {
  gulp.watch('src/icons/**/*', gulp.series('icons'));
  done();
});
