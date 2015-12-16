module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
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
            "bin/release/js/bacon.jquery.min.js",
            "src/Common.js",
            "src/NewTodoItem.js",
            "src/Orchestrator.js",
            "src/TodoList.js",
            "tests/*_Specs.js"
        ],
        exclude: [
        ],
        reporters: ["progress", "html", "coverage"],
        htmlReporter: {
            outputDir: "tests/dev/reports",
            templatePath: __dirname + "/node_modules/karma-html-reporter/jasmine_template.html"
        },
        preprocessors: {
            "src/*.js": ["coverage"]
        },
        coverageReporter: {
            type: "html",
            dir: "tests/dev/coverage/"
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ["Chrome"],
        singleRun: true
    });
};
