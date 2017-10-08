"use strict";
const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const jsmin = require("gulp-jsmin");
const rename = require("gulp-rename");


gulp.task("default", () => {
    gulp.src("public/css/*.css")
      .pipe(cleanCSS({compatibility: "ie8"}))
      .pipe(gulp.dest("public/css/dist"));

    gulp.src("public/js/**/*.js")
      .pipe(jsmin())
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest("public/js/dist"));
  });