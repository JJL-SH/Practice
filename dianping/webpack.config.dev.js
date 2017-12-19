const CONFIG = require('./config/config');

const webpack = require('webpack');
const path = require('path');
const url = require('url');
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin');

let webpackConfig = require('./webpack.config');

// source-map配置
webpackConfig.devtool = "source-map";
// 插件配置
webpackConfig.plugins.push(
  // 服务启动打开浏览器
  new openBrowserWebpackPlugin({
    url: url.format({
      protocol: CONFIG.protocol,
      host: CONFIG.host + ':' +CONFIG.port
    })
  })
);
webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
// 配置开发服务
webpackConfig.devServer = {
  inline: true,
  hot: false,
  host: CONFIG.host,
  port: CONFIG.port
}

module.exports = webpackConfig;