/*
 * @Author: yuanhao
 * @Date: 2022-05-30 14:26:36
 * @LastEditTime: 2022-07-01 20:57:08
 * @LastEditors: yuanhao
 * @Description: 
 * @FilePath: \jw-base\vue.config.js
 */
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
module.exports = {
    publicPath: '/',
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components'),
                '@v': path.resolve(__dirname, './src/views'),
                '@a': path.resolve(__dirname, './src/assets'),
                '@p': path.resolve(__dirname, './public'),
            } // 别名配置
        }
    },
    css: {
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin(跟热加载冲突)
        sourceMap: true, // 开启 CSS source maps
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }, // css预设器配置项
        requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
    },
    //反向代理
    devServer: {
        // 环境配置
        host: '0.0.0.0',
        port: 8010,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
    }
}
