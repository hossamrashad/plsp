var gulp = require("gulp");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass")(require("sass"));
var pug = require("gulp-pug");
livereload = require("gulp-livereload");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var notify = require("gulp-notify");
var zip = require("gulp-zip");
// var ftp = require("vinyl-ftp");

gulp.task("html", function () {
  return gulp
    .src("project/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload())
    .pipe(notify("Html Task Is Done"));
});

gulp.task("scss", function () {
  return gulp
    .src("project/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 20 versions"))
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("Scss Task Is Done"));
});

gulp.task("js", function () {
  return gulp
    .src("project/js/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("js.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js/js"))
    .pipe(notify("Js Task Is Done"))
    .pipe(livereload());
});

gulp.task("libs-css", function () {
  return gulp
    .src("project/libs-css/**/*")
    .pipe(gulp.dest("dist/css/libs"))
    .pipe(livereload())
    .pipe(notify("Libs Css Task Is Done"));
});
gulp.task("libs-js", function () {
  return gulp
    .src("project/libs-js/**/*")
    .pipe(gulp.dest("dist/js/libs"))
    .pipe(livereload())
    .pipe(notify("Libs js Task Is Done"));
});
gulp.task("compressImages", function () {
  return (
    gulp
      .src("project/images/**/*")
      // .pipe(imagemin({ progressive: true }))
      .pipe(gulp.dest("dist/images"))
      .pipe(livereload())
      .pipe(notify("compress Images Task Is Done"))
  );
});

gulp.task("compress", function () {
  return gulp
    .src("dist/**/*.*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("Files Is Compressed To Zip "));
});

gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  // = Html
  gulp.watch("project/pug/**/*.pug", gulp.series("html"));
  // = Css
  gulp.watch("project/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("project/libs-css/**/*", gulp.series("libs-css"));
  // = Javascript
  gulp.watch("project/js/js/**/*.js", gulp.series("js"));
  gulp.watch("project/libs-js/**/*", gulp.series("libs-js"));
  // = Images
  gulp.watch("project/images/**/*", gulp.series("compressImages"));
  // = Zip
  gulp.watch("dist/**/*.*", gulp.series("compress"));
  // = Upload
  // gulp.watch("dist/**/*.*", gulp.series("deploy"));
});
// = Default
gulp.task("default", gulp.series("watch"));
