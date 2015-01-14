var gulp = require('gulp');
var browserSync = require('browser-sync');

var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');
var concat = require('gulp-concat');

gulp.task('sass', ['images'], function () {
  return gulp.src( 'src/css/*.css')
    .pipe(concat('app.css'))
    //.on('error', handleErrors)
    .pipe(autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream: true}));
});
