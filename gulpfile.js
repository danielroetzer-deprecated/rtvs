/**
 * Created by Dani on 12.12.2016.
 */

// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const eslint = require('gulp-eslint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    stylus = require('gulp-stylus'),
    pugLint = require('gulp-pug-lint');


//Defining some paths
const src  = {
    'stylus': 'stylus/index.styl',
    'stylusAll': 'stylus/**/*.styl',
    'js': 'js/**/*.js',
    'lint': ['**/*.js', '!node_modules/**', '!public/**'],
    'pugLint': 'views/**/*.pug'
};

const dest = {
    'css': 'public/css',
    'js': 'public/js'
};



//Lint task
gulp.task('lint', function() {
    return gulp.src(src.lint)
        .pipe(eslint())
        .pipe(eslint.format());
});

//Pug lint task
gulp.task('pug-lint', function() {
    return gulp.src(src.pugLint)
        .pipe(pugLint());
});


// Concatenate & minify js
gulp.task('scripts', function() {
    return gulp.src(src.js)
        .pipe(concat('rtvs.js'))
        .pipe(gulp.dest(dest.js))
        .pipe(rename('rtvs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest.js));
});


//Compile stylus to css & minify it
gulp.task('stylus', function () {
    return gulp.src(src.stylus)
        .pipe(stylus())
        .pipe(rename('rtvs.css'))
        .pipe(gulp.dest(dest.css))
        .pipe(rename('rtvs.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dest.css));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(src.lint, ['lint', 'scripts']);
    gulp.watch(src.stylusAll, ['stylus']);
});


// Default Task
gulp.task('default', ['lint','pug-lint','watch']);