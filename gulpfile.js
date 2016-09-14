var gulp       = require('gulp');
var concat 	   = require('gulp-concat');
var cleanCSS   = require('gulp-clean-css');
var clean      = require('gulp-rimraf');
var notify 	   = require('gulp-notify');
var rename     = require('gulp-rename');

// DEBUG
gulp.task('dbg', function() {
	gulp.src(
		[ 
			'./items/grid.css',
			'./items/grid-responsive.css'
		])
	.pipe(concat('lamp.css'))
	.pipe(gulp.dest('./dist'))
	.pipe(notify("CSS debug publish."));
});

// MINIFY
gulp.task('min', function() {
	return gulp.src(
		[ 
			'./items/grid.css',
			'./items/grid-responsive.css'
		])
		.pipe(concat('lamp.min.css'))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist'))
		.pipe(notify("CSS minified publish."));
});

// CLEAN DIRECTORY
gulp.task('clean', function() {
    gulp.src('./dist/**/*.css', {
    	read: false
    })
    .pipe(clean())
    .pipe(notify("Pasta de publicação limpa!"));
});


gulp.task('default', function() {
	gulp.start(
		'clean',
		'dbg',
		'min'
	);

	// Watch CSS
	gulp.watch('./items/**/*.css', function(evt) {
		gulp.run('clean', 'dbg', 'min');
	});
});