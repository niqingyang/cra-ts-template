const path = require('path');
const webpack = require('webpack');
const paths = require('../paths');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: require('./webpack.dll.entry'),
    output: {
        path: path.join(paths.appPublic, '/static/js'), // 文件输出的路径
        filename: "[name].js",
        library: "[name]_dll_[hash]" // 生成一个变量名供 dllreference 调用要与 dllPlugin.name 保持一致
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            name: "[name]_dll_[hash]",
            path: path.join(paths.appPublic, '/static/js/[name].manifest.json'),// 生成manifest.json文件的路径
            context: __dirname
        })
    ]
}