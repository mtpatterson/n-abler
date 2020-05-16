const { dest, series, src, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  dist: './dist',
  scss: './scss',
};

function stylesTask() {
  return src(`${paths.scss}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('/'))
    .pipe(dest(`${paths.dist}`))
    .pipe(browserSync.stream());
}

function watchTask() {
  watch(`${paths.scss}/**/*.scss`, stylesTask);
  watch('./**/*.php').on('change', browserSync.reload);
}

function startServer() {
  browserSync.init({
    proxy: 'n-abler.localhost',
    notify: false,
    online: true,
  });

  watchTask();
}

exports.styles = stylesTask;
exports.build = stylesTask;
exports.default = series(stylesTask, startServer);
