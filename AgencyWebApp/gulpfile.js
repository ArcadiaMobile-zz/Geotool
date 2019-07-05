/// <binding Clean='clean' ProjectOpened='watch, min' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    stream = require('merge-stream'),
    filter = require('gulp-filter'),
    cssUrlToAbsolute = require('gulp-css-url-to-absolute'),
    concatCss = require('gulp-concat-css'),
    ts = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename");


var paths = {
    webroot: "./wwwroot/",
    node_modules: "./node_modules/"
};
var tsProject = ts.createProject("tsconfig.json");

paths.js = [
    //"!" + paths.webroot + "dist/typescript*.js",
    paths.webroot + "assets/js/jquery-3.1.1.min.js",
    paths.webroot + "assets/bootstrap/js/bootstrap.min.js",
    paths.webroot + "assets/bootstrap/js/bootstrap-dialog.js",
    paths.webroot + "assets/bootstrap/js/datatables.min.js",
    paths.webroot + "assets/js/app.js",
    paths.webroot + "assets/mCustomScroolbar/jquery.mCustomScrollbar.concat.min.js",
    paths.webroot + "assets/owlCarousel2/owl.carousel.min.js",
    paths.webroot + "assets/datepicker/pickerDate.js",
    paths.webroot + "assets/lightbox-master/ekko-lightbox.min.js",
    paths.webroot + "assets/dropzone/dropzone.js",
    paths.webroot + "assets/typeahead.js-master/bloodhound.min.js",
    paths.webroot + "assets/typeahead.js-master/typeahead.bundle.min.js",
    paths.webroot + "assets/bootstrap-tagsinput/bootstrap-tagsinput.js",
    paths.webroot + "assets/bootstrap-validator/validator.min.js",
    paths.webroot + "assets/bootstrap-select/js/bootstrap-select.js",
    paths.webroot + "assets/js/jquery.cms.js",
    paths.node_modules + "navigo/lib/navigo.min.js",
    paths.node_modules + "navigo/dist/es6-promise.min.js",
    paths.node_modules + "handlebars/dist/handlebars.min.js",
    paths.node_modules + "linq4js/dist/linq4js.min.js",
    paths.node_modules + "moment/min/moment-with-locales.min.js",
    paths.node_modules + "jwt-decode/build/jwt-decode.min.js",
    paths.node_modules + "jquery.cookie/jquery.cookie.js",
    paths.node_modules + "powerbi-client/dist/powerbi.js",
    paths.node_modules + "powerbi-client/dist/powerbi.min.js",
];
paths.css = [
    // Non posso inserire anche bootstrap perché concatCss espande il css di bootstrap che ha un errore e nel ricomprimerlo si perde qualcosa
    //paths.webroot + "assets/bootstrap/css/bootstrap.min.css",
    paths.webroot + "assets/css/bootstrap-dialog.min.css",
    paths.webroot + "assets/owlCarousel2/assets/owl.carousel.min.css",
    paths.webroot + "assets/mCustomScroolbar/jquery.mCustomScrollbar.min.css",
    paths.webroot + "assets/css/animate.css",
    paths.webroot + "assets/datepicker/theme.css",
    paths.webroot + "assets/lightbox-master/ekko-lightbox.min.css",
    paths.webroot + "assets/dropzone/dropzone.css",
    paths.webroot + "assets/bootstrap-tagsinput/bootstrap-tagsinput.css",
    paths.webroot + "assets/bootstrap-select/css/bootstrap-select.min.css",
    paths.webroot + "assets/css/style.css"
];
paths.typescriptDest = paths.webroot + "dist";
paths.typescriptMinDest = paths.webroot + "dist";
paths.concatJsDest = paths.webroot + "dist/site.min.js";
paths.concatCssDest = paths.webroot + "dist/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("typescript", function () {
    return tsProject.src()
        //.pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.typescriptDest));
});

gulp.task("min:typescript", [ "typescript" ], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(rename("typescript.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.typescriptDest));
});

gulp.task("min:js", function () {
    const f = filter(["**", "!**/*.min.js"], { restore: true });

    return gulp.src(paths.js, { base: "." })
        .pipe(f)
        .pipe(uglify())
        .pipe(f.restore)
        .pipe(concat(paths.concatJsDest))
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src(paths.css)
        .pipe(cssUrlToAbsolute({
            root: './wwwroot/'
        }))
        .pipe(cssmin())
        .pipe(concatCss(paths.concatCssDest, { rebaseUrls: false }))
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css", "min:typescript"]);

gulp.task("watch", function () {
    gulp.watch(["wwwroot/**/*.ts"], ["typescript"])
});