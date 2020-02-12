const {override} = require('customize-cra');

const addWebpackPlugin = require('./webpack-plugin');
const addWebpackDllPlugin = require('./webpack-dll');
const addEslint = require('./eslint');
const addLessLoader = require('./less');
const addAntdPro = require('./antd-pro');
const addAlias = require('./alias');
const addBabel = require('./babel');
const addReactIntl = require('./react-intl');

module.exports = override(
    addAlias,
    addEslint,
    addAntdPro,
    addLessLoader,
    addReactIntl,
    addWebpackPlugin,
    addWebpackDllPlugin,
    // addBabel
);
