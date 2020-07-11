var { src, dest, watch, series } = require('gulp');
const px2rem = require('gulp-px2rem');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var browserSync = require('browser-sync').create();
var options = {
    rootValue: 62, //根字体大小 （视觉稿/10)
    unitPrecision: 5, //小数点后保留几位
    propertyBlackList: [], //黑名单，哪些属性不需要编译
    propertyWhiteList: [], //白名单，哪些属性需要编译
    replace: true, //是否替换原有属性
    mediaQuery: false, //媒体查询，默认关闭就行了
    minPx: 2 // 小于多少像素的时候 不转rem
};

function abc() {
    return src('sass/*.scss')
        .pipe(sass())
        .pipe(dest('style'));
}

function pxout() {
    return src('./style/*.css')
        .pipe(px2rem(options))
        .pipe(dest('./css/'));
}

function wat() {
    br();
    watch('./sass/*.scss', series(abc, pxout));
    watch(['./*.html', './style/*.css', './js/*.js', './css/*.css']).on('change', browserSync.reload);
}

function br() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
}
exports.sass = wat;