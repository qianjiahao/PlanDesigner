var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint');



gulp.task('scripts', function() {
	return gulp.src('public/controller/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// jshint : check the js code is standard or not 

gulp.task('connect', function() {
	connect.server({
		root: './',
		livereload: true
	});
});

// front-end server in brower

gulp.task('public', function() {

	gulp.src('public/**')
		.pipe(connect.reload());
});

// reload the brower if it has been any changed

gulp.task('watch', function() {

	gulp.watch('public/**', ['public']);

	gulp.watch('public/controller/*.js', ['scripts']);
});

// keep watch the target directory


gulp.task('default', ['connect', 'watch']);

// run the gulp with default command 'default'