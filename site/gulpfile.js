/*
gulpfile.js

gulpfile for zooComedyNight.com web app.
*/


const
gulp     = require('gulp'),
nodemon  = require('gulp-nodemon'),
plumber  = require('gulp-plumber'),
liveload = require('gulp-livereload'),
sass     = require('gulp-sass'),
elemsJS  = require('gulp-elementsjs-interpreter'),
babel    = require('gulp-babel')
webpack  = require('webpack'),
gWebpack = require('gulp-webpack'),
run      = require('run-sequence');

//Configure Webpack..
const webpackConfig = {
  entry: './public/js/babel/comedyNight.js',
  output: {
    filename: 'comedyNight.js'
  }
};

//Preprocess Sass
gulp.task('sass', ()=> {
  return gulp.src('./public/css/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(liveload());
});

//Preprocess JS (babel, elementsJS)
gulp.task('prejs', ()=> {
  return gulp.src('./public/js/src/comedyNight.js')
    .pipe(elemsJS())
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest('./public/js/babel'))
    .pipe(liveload());
});

//Bundle JS..
gulp.task('bundle', ()=> {
  var
  compiler = gWebpack(webpackConfig, webpack);
  //Compile..
  return gulp.src('./public/js/babel/comedyNight.js')
    .pipe(compiler)
    .pipe(gulp.dest('./public/js/dist'));
});

gulp.task('js', ()=> {
  return run('prejs', 'bundle');
});

//Watch for changes in sass file..
gulp.task('watch', ()=> {
  return gulp.watch('./public/css/*.scss', ['sass']);
});

//Watch for changes in JS file..
gulp.task('watchjs', ()=> {
  return gulp.watch('./public/js/src/*.js',  ['js']);
});

//Reload Page on changes to js or html..
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

//Default gulp task..
gulp.task('default', ['sass', 'js', 'develop', 'watch', 'watchjs']);
