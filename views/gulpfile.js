const {src, dest, series, parallel} = require('gulp');
// series 供多個 Task 執行，parallel 供多個 Task 同時執行。


// const babel  = require('gulp-babel');
const sass = require('gulp-sass'); 
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const tinypng = require('gulp-tinypng');
sass.compiler = require('node-sass');

// function compileJs(){
//     return src('src/*.js')  // 抓到來源
//     .pipe(babel())          // babel 編譯
//     .pipe(dest('dist'))     // 壓縮前檔案先存進 dist 資料夾
//     .pipe(uglify())         // 壓縮檔案
//     .pipe(rename({extname: '.min.js'})) // 將壓縮檔案改名為 .min.js
//     .pipe(dest('dist'))                 // 壓縮過的檔案存進 dist 資料夾
//     // From src('路由') pipe to dest('路由')
// }

function compileCSS() {
    return src('./css/src/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest('./css'));
}


exports.compileCSS = compileCSS  // 個別執行任務，cli 輸入 `gulp compileCSS`
// exports.default = parallel(compileJs, compileCSS)

exports.default = parallel(compileCSS)
// 匯出一個名叫  default 的 function