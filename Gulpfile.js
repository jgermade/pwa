/* global process */

let gulp = require('gulp');
let webpack  = require('webpack-stream');
let eslint			= require('gulp-eslint');

let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;

// let uglify   = require('gulp-uglify');
// let source = require('vinyl-source-stream');
// let streamify = require('gulp-streamify');

let livereload	= require('gulp-livereload');

let PUBLIC_PATH = 'public';

let gulpHtmlVersion = require('gulp-html-version');

console.log('APP_BUILD', process.env.APP_BUILD );

var is_prod = process.env.APP_BUILD === 'prod',
		build_prefix = ( is_prod ? '-prod' : '' ),
		webpack_config = require('./webpack.config');

function _extend(o, data) {
	var scope = Object.create(o);
	for( var key in data ) o[key] = data[key];
	return scope;
}

// function uglify () {
// 	console.log('uglify', this, arguments);
// }

gulp.task('lint', () =>
	gulp.src('app/{,**/}*.js').pipe( eslint(require('./.eslintrc')) )
);

gulp.task('js-app', () =>
	gulp.src('app/app.js')
		.pipe( webpack( _extend(webpack_config, { output: { filename: 'app.js' } }) ) )
		// .pipe( rename('app.js') ) // required for uglify
		// .pipe( uglify() )
		.pipe( gulp.dest(PUBLIC_PATH + '/scripts') )
		.pipe( livereload() )
);

gulp.task('js-sw', () =>
	gulp.src('app/sw.js')
		.pipe( webpack( _extend(webpack_config, { output: { filename: 'sw.js' } }) ) )
		// .pipe( rename('sw.js') ) // required for uglify
		// .pipe( uglify() )
		.pipe( gulp.dest(PUBLIC_PATH + '/scripts') )
		.pipe( livereload() )
);

gulp.task('scripts', gulp.series('js-app', 'js-sw') );

// gulp.task('index', () =>
// 	gulp.src('app/index.html')
// 		.pipe(gulp.dest(PUBLIC_PATH))
// 		.pipe(livereload())
// );

gulp.task('index', () =>
	gulp.src('app/index.html')
		.pipe(gulpHtmlVersion({
			paramName: 'build',
			paramType: 'timestamp',
			suffix: ['css', 'js', 'jpg']
		}))
		.pipe(gulp.dest(PUBLIC_PATH))
		.pipe(livereload())
);

gulp.task('build', gulp.parallel('index', 'scripts') );

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(['./app/{,**/}*.{js,html}'], gulp.series('lint', 'build'));
});

gulp.task('default', gulp.series( 'lint', 'build', 'watch' ) );
