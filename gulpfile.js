//----------------------------------------------------------------------
//  モード
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");

const plumber = require("gulp-plumber");
const sassGlob = require("gulp-sass-glob-use-forward");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");

//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
function buildCss(done) {
  src("./src/assets/css/style.scss")
    .pipe(plumber())                        // watch中にエラーが発生してもwatchが止まらないようにする
    .pipe(sassGlob())                       // glob機能を使って@useや@forwardを省略する
    .pipe(sass({outputStyle: 'compressed' })) // sassのコンパイルをする
    .pipe(autoprefixer())                   // ベンダープレフィックスを自動付与する
    .pipe(dest("./dist/assets/css"));

  done();
}

//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
exports.buildCss = series(buildCss);


const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require('imagemin-pngquant');

//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
function imagemin(done) {
  src("./src/assets/images/**")
    .pipe(
      imageMin([
        pngquant({
            quality: [.60, .70], // 画質
            speed: 1 // スピード
        }),
        imageMin.svgo(),
        imageMin.optipng(),
        mozjpeg({ quality: 80 }), // 画質
        imageMin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(dest("./dist/assets/images/"));
  done();
}

//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
exports.imagemin = imagemin;


const del = require('del');

// distの画像全削除
function clean(done) {
    del(["./dist/**"]);
    done();
}

exports.clean = clean;