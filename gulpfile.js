/**
 * Created by Dani on 12.12.2016.
 */

// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const eslint = require('gulp-eslint'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');


const input  = {
    'less': 'less/rvp.less',
    'js': 'js/**/*.js',
};

const output = {
    'css': 'public/css',
    'js': 'public/js'
};

//Lint task
gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**','!public/**'])
        .pipe(eslint())
        .pipe(eslint.format());
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(input.js)
        .pipe(concat('jada.js'))
        .pipe(gulp.dest(output.js))
        .pipe(rename('jada.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(output.js));
});


//Compile less to css and minify css
gulp.task('less', function(){
    gulp.src(input.less)
        .pipe(less())
        .pipe(gulp.dest(output.css))
        .pipe(rename('jada.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(output.css));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(input.js, ['lint', 'scripts']);
    gulp.watch(input.less, ['less']);
});


// Default Task
gulp.task('default', ['lint','watch']);