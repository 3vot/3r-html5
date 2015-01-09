var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var handleErrors = require('../util/handleErrors');

gulp.task('sass', ['images'], function () {
  return gulp.src('src/sass/*.{sass, scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
        sourceComments: 'map',
        imagePath: '/images'
    }))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({browsers: ['last 2 version']}))
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream: true}));
});
