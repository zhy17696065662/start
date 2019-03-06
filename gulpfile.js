var gulp=require('gulp');
var server=require('gulp-webserver');

gulp.task('server',function(){
    return gulp.src('./src/')
    .pipe(server({
        port:8888,
        open:true,
        livereload:true,
        proxies:[
            {
                source:'/find',
                target:'http://192.168.0.88:3000/find'
            }
        ]
    }))
})