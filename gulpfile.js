const gulp = require('gulp');

require('require-dir')('./tasks');

// ---------------
// Build Tasks
// ---------------

// scss/js
gulp.task('build', gulp.series('clean', 'copy', 'icons', 'scripts'));

// deploy
gulp.task('deploy', gulp.series('clean', 'copy', 'icons', 'scripts', 'upload:deploy'));

// watch
gulp.task('watch', gulp.parallel('copy:watch', 'icons:watch', 'scripts:watch', 'upload:watch'));

// dev task with initial deploy
gulp.task('start', gulp.series('build', 'upload:deploy', 'watch'));

// default
gulp.task('default', gulp.parallel('start'));
