var gulp = require('gulp'),//gulp主组件
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    sh = require('shelljs'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    htmlmin = require('gulp-htmlmin'),
    gulpRemoveHtml = require('gulp-remove-html'),//标签清除，参考：https://www.npmjs.com/package/gulp-remove-html
    removeEmptyLines = require('gulp-remove-empty-lines'),//清除空白行，参考：https://www.npmjs.com/package/gulp-remove-empty-lines
    replace = require('gulp-replace'),//文件名替换，参考：https://www.npmjs.com/package/gulp-replace
    gulpSequence = require('gulp-sequence'),//同步执行，参考：https://github.com/teambition/gulp-sequence
    clean = require('gulp-clean'),//清除文件插件，参考：https://github.com/teambition/gulp-clean
    opn = require('opn'),
    host = 'localhost',
    port = 80,
    buildBasePath = 'dist/',
    srcPath = 'src/';

//删除Build文件
gulp.task('clean:Build', function () {
    return gulp.src('dist/*').pipe(clean());
});

//js
gulp.task('js', function(){
    gulp.src(srcPath + 'js/**/*.js')
        .pipe(gulp.dest(buildBasePath+'js'))//输出到js目录
        .pipe(uglify())//压缩js到一行
        .pipe(gulp.dest(buildBasePath+'js'));//输出到js目录
});

//复制文件夹
gulp.task('copy',  function() {
    gulp.src(srcPath + 'plugins/**/*')
        .pipe(gulp.dest(buildBasePath+'plugins'));
});

gulp.task('copyimg',  function() {
    var imgOption = {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
        use: [pngcrush()] //使用pngquant深度压缩png图片的imagemin插件
    };
    gulp.src(srcPath + 'img/**/*')
        .pipe(imagemin(imgOption))
        .pipe(gulp.dest(buildBasePath+'img'));
});

gulp.task('css', function (){
    gulp.src(srcPath +'css/**/*.css')
        .pipe(minifyCss())//压缩css到一样
        .pipe(gulp.dest(buildBasePath+'css'));//输出到css目录
});

//html压缩
gulp.task('html',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(srcPath + 'page/**/*.html')
        .pipe(gulpRemoveHtml())//清除特定标签
        .pipe(removeEmptyLines({removeComments: true}))//清除空白行
        .pipe(htmlmin(options))
        .pipe(gulp.dest(buildBasePath + 'page'));
});

//html压缩
gulp.task('indexHtml',function(){
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src(srcPath + 'index.html')
        .pipe(gulpRemoveHtml())//清除特定标签
        .pipe(removeEmptyLines({removeComments: true}))//清除空白行
        .pipe(htmlmin(options))
        .pipe(gulp.dest(buildBasePath));
});

/**
 * 使用connect启动一个Web服务器
 **/
gulp.task('connect', function () {
    connect.server({
        root: 'src',
        livereload: true,
        port: port
    });
});

gulp.task('less', function () {
    console.log('less update')
    gulp.src([srcPath + 'less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest(srcPath + 'css'));
});

/**
 * 需要监控的路径
 **/
var watchPath = [srcPath + 'index.html', srcPath + 'css/**/*.css', srcPath + 'page/**/*.html', srcPath + 'img/**/*', srcPath + 'js/**/*.js', srcPath + 'plugins/**/*'];

/**
 * 监控文件的变动
 **/
gulp.task('watch', function () {
    gulp.watch(srcPath + 'less/**/*.less', ['less']);
    gulp.watch(watchPath, ['watchCallback']);
});

/**
 * 监控的回调reload
 **/
gulp.task('watchCallback', function () {
    console.log('other update')
    gulp.src(watchPath)
        .pipe(plumber())
        .pipe(connect.reload());
});

/**
 * 运行项目
 **/
gulp.task('run', function () {
    runSequence(['connect', 'watch'], function () {
        opn('http://' + host);
    });
})

gulp.task('build',function(cb){gulpSequence('clean:Build','copy','less','js','css','copyimg', 'html', 'indexHtml')(cb);});