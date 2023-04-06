import gulp from 'gulp';
import concat from 'gulp-concat';
import minify from 'gulp-minify';
import cleanCss from 'gulp-clean-css';
import minifyejs from 'gulp-minify-ejs';

gulp.task('pack-js', function () {    
    return gulp.src(['public/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('public/build/js'));
});
 
gulp.task('pack-css', function () {    
    return gulp.src(['public/styles/*.css'])
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('public/build/css'));
});
gulp.task('minify-pages', function() {
    return gulp.src(['views/*.ejs'])
        .pipe(minifyejs())
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('views/build'))
})
gulp.task('minify-static', function() {
    return gulp.src(['views/partials/*.ejs'])
        .pipe(minifyejs())
        //.pipe(rename({suffix:".min"}))
        .pipe(gulp.dest('views/build/partials'))
});
gulp.task('default', gulp.series('pack-js', 'pack-css', 'minify-pages', 'minify-static'));