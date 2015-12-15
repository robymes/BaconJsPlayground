/*global console,require,process*/

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    eslint = require("gulp-eslint"),
    uglify = require("gulp-uglify"),
    karma = require("gulp-karma"),
    rename = require("gulp-rename"),
    bowerMain = require("bower-main"),
    filter = require("gulp-filter"),
    del = require("del");

var bowerMainJavaScriptFiles = bowerMain("js", "min.js");
var bowerMainCssFiles = bowerMain("css", "min.css");

var paths = {
    eslintrc: [
        ".eslintrc.json"
    ],
    libs: [
        "bin/release/js/jquery.min.js",
        "bin/release/js/linq.min.js",
        "bin/release/js/moment-with-locales.min.js",
        "bin/release/js/bootstrap.min.js",
        "bin/release/js/Bacon.min.js",
        "bin/release/js/maquette.min.js",
        "bin/release/js/velocity.min.js",
        "bin/release/js/bootstrap-datepicker.min.js",
        "bin/release/js/bootstrap-datepicker.it.min.js",
        "bin/release/js/bacon.model.min.js",
        "bin/release/js/bacon.jquery.min.js"
    ],
    src: [
        "src/Common.js",
        "src/ApiService.js",
        "src/Orchestrator.js",
        "src/NewTodoItem.js",
        "src/NewTodoItemView.js",
        "src/TodoList.js",
        "src/TodoListTableBuilder.js",
        "src/TodoListView.js",
        "src/App.js"
    ],
    testSrc: [
        "src/Common.js",
        "src/NewTodoItem.js",
        "src/Orchestrator.js",
        "src/TodoList.js"
    ],
    testSrcDebug: [
        "obj/debug/js/testDebug.js"
    ],
    testSrcRelease: [
        "obj/release/js/testRelease.min.js"
    ],
    specs: [
        "tests/*_Specs.js"
    ],
    debug: [
        "bin/debug/js/mytodo.js"
    ],
    release: [
        "bin/release/js/mytodo.min.js"
    ]
};

gulp.task("copyDevLibs", function () {
    return gulp.src(bowerMainJavaScriptFiles.normal)
        .pipe(gulp.dest("bin/debug/js"));
});

gulp.task("copyProdNotMinLibs", function () {
    return gulp.src(bowerMainJavaScriptFiles.minifiedNotFound)
        .pipe(gulp.dest("bin/release/js"));
});

gulp.task("copyProdLibs", ["copyProdNotMinLibs"], function () {
    return gulp.src(bowerMainJavaScriptFiles.minified)
        .pipe(gulp.dest("bin/release/js"));
});

gulp.task("copyLibs", ["copyProdLibs", "copyDevLibs"]);

gulp.task("copyDevCss", function () {
    return gulp.src(bowerMainCssFiles.normal)
        .pipe(gulp.dest("bin/debug/css"));
});

gulp.task("copyProdNotMinCss", function () {
    return gulp.src(bowerMainCssFiles.minifiedNotFound)
        .pipe(gulp.dest("bin/release/css"));
});

gulp.task("copyProdCss", ["copyProdNotMinCss"], function () {
    return gulp.src(bowerMainCssFiles.minified)
        .pipe(gulp.dest("bin/release/css"));
});

gulp.task("copyCss", ["copyProdCss", "copyDevCss"]);

gulp.task("copyDevFonts", function () {
    return gulp.src(["bower_components/bootstrap/dist/fonts/*.*"])
        .pipe(gulp.dest("bin/debug/fonts"));
});

gulp.task("copyProdFonts", function () {
    return gulp.src(["bower_components/bootstrap/dist/fonts/*.*"])
        .pipe(gulp.dest("bin/release/fonts"));
});

gulp.task("copyFonts", ["copyDevFonts", "copyProdFonts"]);

gulp.task("clean", function (callback) {
    del(["bin/**/*"], {
        force: true
    }, callback);
});

gulp.task("copyRefs", ["clean", "copyLibs", "copyCss", "copyFonts"]);

//NOTA: vengono testati solo i sorgenti NON legati alla UI (HTML DOM)
//per testare tutta la codebase è necessario condurre test di page automation

gulp.task("prepareTestsDebug", function () {
    return gulp.src(paths.testSrc)
        .pipe(concat("testDebug.js"))
        .pipe(gulp.dest("obj/debug/js"));
});

gulp.task("testsDebug", ["prepareTestsDebug"], function () {
    return gulp.src(paths.libs.concat(paths.libs, paths.testSrcDebug, paths.specs))
        .pipe(karma({
            configFile: "karma.debug.js",
            action: "run"
        }));
});

//Creazione del file sorgente di debug, utile per il debug step-by-step
//con i devtools del browser

gulp.task("debug", function () {
    return gulp.src(paths.src)
        .pipe(eslint(paths.eslintrc))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on("error", function (error) {
            console.error(String(error));
        })
        .pipe(concat("mytodo.js"))
        .pipe(gulp.dest("bin/debug/js"));
});

gulp.task("buildDebug", ["testsDebug", "debug"]);

gulp.task("prepareTestsRelease", function () {
    return gulp.src(paths.testSrc)
        .pipe(concat("testRelease.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("obj/release/js"));
});

gulp.task("testsRelease", ["prepareTestsRelease"], function () {
    return gulp.src(paths.libs.concat(paths.libs, paths.testSrcRelease, paths.specs))
        .pipe(karma({
            configFile: "karma.release.js",
            action: "run"
        }));
});

//Creazione del file sorgente di release minificato

gulp.task("release", function () {
    return gulp.src(paths.src)
        .pipe(concat("mytodo.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("bin/release/js"));
});

gulp.task("buildRelease", ["testsRelease", "release"]);

gulp.task("build", ["buildDebug", "buildRelease"]);

gulp.task("default", ["build"]);