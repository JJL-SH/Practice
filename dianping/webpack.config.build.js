const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const imageminWebpackPlugin = require('imagemin-webpack-plugin').default;

let webpackConfig = require('./webpack.config');

// 插件配置
webpackConfig.plugins.push(
  // 清空打包目录
  new cleanWebpackPlugin(['dist'])
);
webpackConfig.plugins.push(
  // 图片压缩
  new imageminWebpackPlugin({
    // disabled: process.env.NODE_ENV !== 'production',
    pngquant: {
      quality: '95-100'
    }
  })
)

module.exports = webpackConfig;
