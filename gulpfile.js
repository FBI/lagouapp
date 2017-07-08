var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

//配置文件路径
var app = {
    srcPath : 'src/',
    devPath : 'built/',
    prdPath : 'dist/'
}
//注册拷贝文件的任务
gulp.task('lib',function(){
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
        .pipe($.connect.reload())//通知服务器自动刷新浏览器
});

gulp.task('html',function(){
    gulp.src(app.srcPath + '/**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload())
});

gulp.task('json',function(){
    gulp.src(app.srcPath +'data/**/*.json')
        .pipe(gulp.dest(app.devPath +'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        .pipe($.connect.reload())
});

//注册编译 压缩less文件任务
gulp.task('less',function(){
    gulp.src(app.srcPath + 'style/index.less')
        .pipe($.less())//编译
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())//压缩
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload())
})

//注册合并 压缩js文件任务
gulp.task('js',function(){
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload())
})

//注册图片压缩任务
gulp.task('img',function(){
    gulp.src(app.srcPath + 'image/**/*')
        .pipe(gulp.dest(app.devPath + 'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'image'))
        .pipe($.connect.reload())
})

//构建总任务
gulp.task('build',['lib','html','json','less','js','img'])

//注册清除built dist目录文件任务
gulp.task('clean',function(){
    gulp.src([app.devPath,app.prdPath])
    .pipe($.clean())
})

//注册service任务
gulp.task('service',['build'],function(){
    //启动服务
    $.connect.server({
        root : [app.devPath],//默认从开发目录起始读取
        livereload : true,//自动刷新浏览器，低版本ie不支持
        port : 1234
    })
    open('http://localhost:1234')//服务启动后自动刷新浏览器，加载页面内容
})


gulp.watch('bower_components/**/*.js',['lib']);
gulp.watch(app.srcPath + '/**/*.html',['html']);
gulp.watch(app.srcPath +'data/**/*.json',['json']);
gulp.watch(app.srcPath + 'style/index.less',['less']);
gulp.watch(app.srcPath + 'script/**/*.js',['js']);
gulp.watch(app.srcPath + 'image/**/*',['img']);

gulp.task('default',['service']);/*需要启动service任务的时候，不需要再写gulp service
可以直接写gulp，gulp就是这里的default任务，而default，又是依赖service的，所以就直接
启动service任务了*/