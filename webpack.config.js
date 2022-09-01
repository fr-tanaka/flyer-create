const path = require('path');

const js = {
  // モードの設定
  mode: 'production',

  // エントリーポイントの設定
  entry: `./src/assets/js/index.js`,

  // ファイルの出力設定
  output: {
    // 出力するファイル名
    filename: "assets/js/bundle.js",

    //  出力先のパス
    path: path.resolve(__dirname, "dist"),
  },
};

module.exports = [
  js,

];

