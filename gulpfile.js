var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('scss',function(){
	return gulp.src('./src/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css'))
})

gulp.task('watch',() => {
	return gulp.watch('./src/scss/*.scss',gulp.series('scss'))
})
gulp.task('server',function(){
	return gulp.src('./src')
	.pipe(server({
		port:3700,
		proxies : [
			{source:'/classify/api/iconlist',target:'http://169.254.226.51:3000/classify/api/iconlist'},
			{source:'/classify/api/getClassify',target:'http://169.254.226.51:3000/classify/api/getClassify'},
			{source:'/users/api/icon',target:'http://169.254.226.51:3000/users/api/icon'},
			{source:'/classify/api/addClassify',target:'http://169.254.226.51:3000/classify/api/addClassify'},


		]
	}))
})

gulp.task('default',gulp.series('scss','server','watch'))