const gulp    = require('gulp');
const jade    = require('gulp-jade');
const stylus  = require('gulp-stylus');
const watch   = require('gulp-watch');
const plumber = require('gulp-plumber');

let   views   = [
  'index'
].map((name) => `jade/${name}.jade`);

gulp.task('default', function () {
  gulp.src(views)
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./'));

  gulp.src('stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
  watch(['jade/*.jade', 'stylus/*.styl'], function () {
    gulp.start('default');
  });
});
