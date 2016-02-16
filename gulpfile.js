
var gulp = require("gulp");
var sass = require("gulp-sass");
var react = require("gulp-react");
var babel = require("gulp-babel");
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

var electron = require('electron-connect').server.create();

gulp.task("sass", function () {
  gulp.src("_sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("babel", function () {
  browserify({
      entries: "_js/app.js",
      extensions: [".js"]
    })
    .transform(babelify)
    .bundle()
    .on("error", function (err) {
      console.log("Error : " + err.message);
      this.emit("end");
    })
    .pipe(source("app.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task('scripts', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/underscore/underscore-min.js',
      'bower_components/gsap/src/minified/TweenMax.min',
      'bower_components/react/react.min.js'
    ])
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task("start", function () {
  electron.start();
});

gulp.task('watch', function() {
  gulp.watch('_js/**/*.js', ['babel']);
  gulp.watch('_js/**/*.jsx', ['babel']);
  gulp.watch('_sass/**/*.scss', ['sass']);
  gulp.watch('dist/js/**/*.js', electron.reload);
  gulp.watch('dist/css/**/*.css', electron.reload);
  gulp.watch('dist/index.html', electron.reload);
});

gulp.task('default', ['watch', 'start']);

