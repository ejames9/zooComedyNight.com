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
run      = require('run-sequence'),
path     = require('path');



//Configure Webpack..
const webpackConfig = {
  entry: './public/js/babel/comedyNight.js',
  output: {
    filename: 'comedyNight.js'
  },
  //Use browserify's 'brfs' module to deal with node's readFileSync() function..
  // module: {
  //   postLoaders: [
  //     {
  //       include: path.resolve(__dirname, 'node_modules/mapbox-gl-shaders'),
  //       loader: 'transform?brfs'
  //     }
  //   ]
  // }
};

//Configure Webpack..
const webpackConfig2 = {
  entry: './public/js/babel/map.js',
  output: {
    filename: 'map.js'
  }
};

//Preprocess Sass
gulp.task('sass', ()=> {
  return gulp.src('./public/css/*.scss')
    // .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(liveload());
});

//Preprocess JS (babel, elementsJS)
gulp.task('prejs', ()=> {
  return gulp.src('./public/js/src/*.js')
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

gulp.task('bundle2', ()=> {
  var
  compiler = gWebpack(webpackConfig2, webpack);
  //Compile..
  return gulp.src('./public/js/babel/map.js')
    .pipe(compiler)
    .pipe(gulp.dest('./public/js/dist'));
});

gulp.task('js', ()=> {
  return run('prejs', 'bundle', 'bundle2');
});

gulp.task('js1', ()=> {
  return run('prejs', 'bundle');
});

gulp.task('js2', ()=> {
  return run('prejs', 'bundle2');
});

//Watch for changes in sass file..
gulp.task('watchSass', ()=> {
  return gulp.watch('./public/css/*.scss', ['sass']);
});

//Watch for changes in JS files..
gulp.task('watchComedyNightJS', ()=> {
  return gulp.watch('./public/js/src/comedyNight.js',  ['js1']);
});

gulp.task('watchMapJS', ()=> {
  return gulp.watch('./public/js/src/map.js',  ['js2']);
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
gulp.task('default', ['sass', 'js', 'develop', 'watchSass', 'watchComedyNightJS', 'watchMapJS']);
