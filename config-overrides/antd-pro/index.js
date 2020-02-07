const path = require('path');
const paths = require('../paths');
const {override, fixBabelImports, addWebpackPlugin} = require('customize-cra');
// AntD 主题插件
// https://github.com/mzohaibqc/antd-theme-webpack-plugin
// https://www.npmjs.com/package/antd-pro-merge-less
const MergeLessPlugin = require('antd-pro-merge-less');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV == "development";

// 将所有 less 合并为一个供 themePlugin使用
const outFile = path.join(paths.appPath, '/.temp/ant-design-pro.less');
const stylesDir = path.join(paths.appPath, '/src/');


module.exports = override(
    // 按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        //style: 'css',
        style: true,
    }),
    // 1.0.0
    addWebpackPlugin(new MergeLessPlugin({
        stylesDir,
        outFile,
    })),
    // 1.2.0
    addWebpackPlugin(new AntDesignThemePlugin({
        antDir: path.join(paths.appPath, './node_modules/antd'),
        stylesDir,
        varFile: path.join(paths.appPath, './node_modules/antd/lib/style/themes/default.less'),
        mainLessFile: outFile,
        // themeVariables: ['@primary-color'],
        indexFileName: 'index.html',
        generateOne: true,
        lessUrl: 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js',
    }))
);