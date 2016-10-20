/*
Requirement:
  1. gulp-sass          = to compile sass into css.
  2. gulp-csso          = minify css
  3. gulp-autoprefixer  = autoprefix css for other browser
  4. gulp-jshint        = flags suspicious usage in programs written in JavaScript.
  5. gulp-concat        = concatenated js file.
  6. gulp-imagemin      = to compresing the size of image files.
  7. gulp-plumber       = handling error.
  8. gulp-notify        = to show nice growl life notifications upon errors.
  9. browsersync        = stream change and sync browser testing.
  10. gulp-rename       = rename file name
*/

/*
************************************
            Gulp variable
************************************
*/
var gulp       = require ('gulp'),
    sass       = require ('gulp-sass'),
    jshint     = require ('gulp-jshint'),
    concat     = require ('gulp-concat'),
    imagemin   = require ('gulp-imagemin'),
    plumber    = require ('gulp-plumber'),
    notify     = require ('gulp-notify'),
    minCss     = require ('gulp-csso'),
    rename     = require ('gulp-rename'),
    live       = require ('browser-sync').create(),
    autoprefix = require ('gulp-autoprefixer'),
    sourcemaps = require ('gulp-sourcemaps');

/*
************************************
          Plumber variable
************************************
*/
var plumberErrorHandler = { errorHandler: notify.onError( {
  title: 'Gulp',
  message: 'Error: <%= error.message %>'
  })
};

/*
************************************
              Gulp task
************************************
*/
//compiling sass
gulp.task('sass', function() {
  gulp.src('./assets/css/src/sass/**/*.sass')
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefix({
            browsers: ['last 2 versions', '> 5%', 'firefox ESR'],
            cascade: false
        }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(minCss())
    .pipe(rename("theme.min.css"))
    .pipe(gulp.dest('./assets/css'))
    .pipe(live.stream());
});

//combine js file
gulp.task('js', function(){
  gulp.src('assets/js/src/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('theme.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(live.stream());
});

//compress image files
gulp.task('img', function() {
  gulp.src('assets/img/src/*.{png, jpg, gif}')
    .pipe(plumber(plumberErrorHandler))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest('assets/img'))
    .pipe(live.stream());
});

//gulp watch any changes
gulp.task('watch', function() {
  //watch files
  var files = [
      'assets/css/**/*.css',
      'assets/js/src/*.js'
  ];
  // Serve files from the root of this project
    live.init(files, {
        //browser file with php server.
            proxy: "mystore.dev",
            host: "192.168.1.66",
            notify: false
    });

  gulp.watch('assets/css/src/sass/**/*.sass', ['sass']);
  gulp.watch('assets/js/src/*.js', ['js']);
  gulp.watch('assets/img/src/*.{png, jpg, gif}', ['img']);
  gulp.watch('assets/css/**/*.css');
});

//default gulp task
gulp.task('default', ['sass', 'js', 'img', 'watch']);
