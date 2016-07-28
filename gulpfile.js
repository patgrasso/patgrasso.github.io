const gulp    = require('gulp');
const jade    = require('gulp-jade');
const stylus  = require('gulp-stylus');
const watch   = require('gulp-watch');
const plumber = require('gulp-plumber');
const babel   = require('gulp-babel');
const del     = require('del');

let   views   = [
  'index'
];
let templates = views.map((name) => `jade/${name}.jade`);

gulp.task('default', function () {
  gulp.src(templates)
    .pipe(plumber())
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./'));

  gulp.src('stylus/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('css'));

  gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('clean', function (cb) {
  del([
    'build/**',
    'css/**'
  ].concat(views.map((name) => `${name}.html`)), cb);
});

gulp.task('watch', function () {
  watch([
    'jade/*.jade',
    'stylus/*.styl',
    'js/**/*.js'
  ], function () {
    gulp.start('default');
  });
});
