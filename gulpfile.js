"use strict";
const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const jsmin = require("gulp-jsmin");
const rename = require("gulp-rename");
const gulpIgnore = require("gulp-ignore");
const watch = require("gulp-watch");


gulp.task("default", () => {
    gulp.src("public/css/*.css")
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(gulp.dest("public/dist/css"));

    gulp.src("public/js/**/*.js")
        .pipe(jsmin())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("public/dist/js"));
});


gulp.task('stream', function () {
    return watch('public/js/**/*.js', { ignoreInitial: false })
        .pipe(jsmin())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("public/dist/js"));
});