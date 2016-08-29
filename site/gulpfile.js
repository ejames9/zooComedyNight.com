/*
gulpfile.js

gulpfile for zooComedyNight.com web app.
*/


const
gulp     = require('gulp'),
nodemon  = require('gulp-nodemon'),
plumber  = require('gulp-plumber'),
liveload = require('gulp-livereload'),
sass     = require('gulp-sass');


gulp.task('sass', ()=> {
  gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(liveload());
});

gulp.task('watch', ()=> {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', function() {
  liveload.listen();
  nodemon({
    script: 'bin/www',
       ext: 'js handlebars hbs',
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Express started on/.test(chunk)) {
        liveload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', ['sass', 'develop', 'watch']);
