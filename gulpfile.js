const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const image = require('gulp-image');
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require('gulp-uglify');


const Config = {
  IMG_DEST_DIR: 'www/dist/img/',
  IMG_SRC_DIR: 'www/src/img/',
  JS_DEST_DIR: 'www/dist/js/',
  JS_SRC_DIR: 'www/src/js/',
  SCSS_DEST_DIR: 'www/dist/css',
  SCSS_SRC_DIR: 'www/src/scss/',
};

gulp.task('scripts', () => {
  gulp.src(Config.JS_SRC_DIR + 'main.js')
      .pipe(browserify({
        insertGlobals : true,
        debug : !gulp.env.production
      }))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(Config.JS_DEST_DIR))
      .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  gulp.src(Config.SCSS_SRC_DIR + 'main.scss')
      .pipe(sass({
       outputStyle: 'compressed'
      }).on('error', sass.logError))
      .pipe(rename({
       suffix: '.min'
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(Config.SCSS_DEST_DIR))
      .pipe(browserSync.stream());
});

gulp.task('image', function () {
  gulp.src(Config.IMG_SRC_DIR + '*')
    .pipe(image())
    .pipe(gulp.dest(Config.IMG_DEST_DIR))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['scripts', 'sass', 'image'], function() {
  browserSync.init({
    open: false,
    proxy: 'http://localhost:8080'
  });

  gulp.watch(Config.JS_SRC_DIR + '**', ['scripts']);
  gulp.watch(Config.SCSS_SRC_DIR + '**', ['sass']);
  gulp.watch(Config.IMG_SRC_DIR + '**', ['image']);
  gulp.watch('www/**/*.jinja').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
