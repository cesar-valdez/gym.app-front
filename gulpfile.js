var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

//CSS
var nib = require('nib');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat-css');
var minify = require('gulp-minify-css');

//JS 
var uglify=require('gulp-uglify');
//modules of bower
var browserify=require('browserify'); //hacer funcionar los require del frontend como si fuese backend
var debowerify=require('debowerify');


//JADE
var jade = require('gulp-jade');

//clean
var clean = require('gulp-rimraf');


//borrar la carpeta dep cada vez que se corra gulp
gulp.task('clean', function(){
	return gulp.src('./dep', {read: false})
	.pipe(clean({force: true}));
});

//minifica el archivo js
gulp.task('js-vendor', function() {
  return browserify({
    entries: './dev/vendor.js', //punto de entrada js
    transform: debowerify //transformaciones
  })
  .bundle()
  .pipe(source('vendor.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dep/js'))
	.pipe(livereload())
});

gulp.task('js', function() {
  return browserify({
    entries: './dev/index.js'
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./dep/js'))
  .pipe(livereload())
});

//compila codigo stylus y lo minifica
gulp.task('styl', function() {
  return gulp.src('./dev/styl/app.styl') 
    .pipe(stylus({ 
      use: nib(),
      'include css': true
    })) 
    .pipe(concat('app.css'))
    .pipe(minify())
    .pipe(gulp.dest('./dep/css'))
    .pipe(livereload())
})

//compila codigo jade y minifica html
gulp.task('jade', function () {
  return gulp.src('./dev/**/*.jade')
  .pipe(jade({
    //pretty: true
  }))
  .pipe(gulp.dest('./dep'))
  .pipe(livereload());
});

gulp.task('img', function () {
  return gulp.src(['./dev/img/*.jpg','./dev/img/*.png'])
  .pipe(gulp.dest('./dep/img'))
  .pipe(livereload());
});

gulp.task('fonts', function () {
  return gulp.src(['./dev/styl/fonts/*.*'])
  .pipe(gulp.dest('./dep/css/fonts'))
  .pipe(livereload());
});

//observar los cambios y cada cambio borra dep
gulp.task('watch', ['clean'], function(){
  livereload.listen()
  gulp.watch('./dev/**/**/**/*.styl', ['styl']);
  gulp.watch('./dev/**/**/**/*.jade', ['jade']);
  gulp.watch('./dev/**/**/**/*.js', ['js']);
  gulp.watch(['./dev/img/*.png','./dev/img/*.jpg'], ['img']);
})



//efectuar tarea - gulp
gulp.task('default', ['watch'], function(){
  gulp.start('styl', 'js', 'jade', 'img','fonts', 'js-vendor');
})