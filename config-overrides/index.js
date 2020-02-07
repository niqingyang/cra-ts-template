const {override} = require('customize-cra');

const addWebpackPlugin = require('./webpack-plugin');
const addWebpackDllPlugin = require('./webpack-dll');
const addEslint = require('./eslint');
const addLessLoader = require('./less');
const addAntdPro = require('./antd-pro');
const addAlias = require('./alias');
const addTypeScript = require('./ts');
const addReactIntl = require('./react-intl');

module.exports = override(
    addEslint,
    addWebpackPlugin,
    addWebpackDllPlugin,
    addLessLoader,
    addAntdPro,
    addAlias,
    // addTypeScript,
    addReactIntl
);
