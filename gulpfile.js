var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    uglifycss = require('gulp-uglifycss'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon'),
    browserSync = require('browser-sync').create(),
    path = require("path");

var paths = {
    sass:
        [
            path.join(__dirname, 'sass/*.scss')
            // path.join(__dirname, 'sass/*pages*/*.scss')
        ],
    css:
        {
            vendor:
                [
                    path.join(__dirname, "bower_components/bootstrap/dist/css/bootstrap.min.css"),
                    path.join(__dirname, "bower_components/slick-carousel/slick/slick.css"),
                    path.join(__dirname, "bower_components/slick-carousel/slick/slick-theme.css"),
                    path.join(__dirname, "bower_components/font-awesome/css/font-awesome.min.css")
                ]
        },        
    js:
        {
            plugins:
                [
                    path.join(__dirname, "plugins/**/*.js"),
                ],
            vendor:
                [
                    path.join(__dirname, "bower_components/jquery/dist/jquery.min.js"),
                    path.join(__dirname, "bower_components/bootstrap/dist/js/bootstrap.min.js"),
                    path.join(__dirname, "bower_components/slick-carousel/slick/slick.min.js")
                ],
            app:
                [
                    path.join(__dirname, 'script/**/*.js')
                ],
            custom:
                [
                    path.join(__dirname, 'custom/custom.js')
                ]
        },
    fonts:
        [
            path.join(__dirname, "bower_components/font-awesome/fonts/**/*")
        ]
}

// --------------------------------------------------------- INIT TASK //

gulp.task('init', ['sass', 'js', 'js_custom', 'css', 'fonts']);

// --------------------------------------------------------- SET TASK FOR WATCHER //

// copy the sass file task
gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(concat('main.min.css'))
        .pipe(sass({
          includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))       
        .pipe(uglifycss())
        .pipe(gulp.dest(path.join(__dirname, '../build/style')))
        .pipe(browserSync.stream())
});

// copy vendor task
gulp.task('css', function () {
    return gulp.src(paths.css.vendor)
        .pipe(concat('vendor.min.css'))
        .pipe(uglifycss())
        .pipe(gulp.dest(path.join(__dirname, '../build/style')));
});

// copy javascript task
gulp.task('js', ['js_vendor', 'js_plugins'], function () {
    return gulp.src(paths.js.app)
        .pipe(concat('app.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../build/js')));
});

gulp.task('js_vendor', function () {
    return gulp.src(paths.js.vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../build/js')));
});

gulp.task('js_plugins', function () {
    return gulp.src(paths.js.plugins)
        .pipe(concat('plugins.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../build/js')));
});

gulp.task('js_custom', function () {
    return gulp.src(paths.js.custom)
        .pipe(concat('custom.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../build/js')));
});

// copy fontawesome fonts task
gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
		.pipe(gulp.dest(path.join(__dirname, '../build/style/fonts')));
});

// --------------------------------------------------------- SET SHOW WATCHER //

//Watcher active
gulp.task('watch', function(){
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js.app, ['js']);  
    gulp.watch(paths.js.plugins, ['js']);
    gulp.watch(paths.js.custom, ['js_custom']);
    gulp.watch(paths.css.vendor, ['css']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(path.join(__dirname, 'sass/**/*.scss'), ['sass']);
    gulp.watch(path.join(__dirname, '../views/**/*.html')).on('change', browserSync.reload);
});

// --------------------------------------------------------- SHOW WATCHER //

browserSync.init({
    server: {
        baseDir: path.join(__dirname, "../")
    }
});

gulp.task('default', ['init', 'watch']);