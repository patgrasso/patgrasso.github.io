var gulp    = require('gulp');
var jade    = require('gulp-jade');
var stylus  = require('gulp-stylus');
var watch   = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('default', function () {
  gulp.src('jade/*.jade')
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
