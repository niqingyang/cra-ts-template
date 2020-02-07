const path = require('path');
const paths = require('../paths');
const webpack = require('webpack');
const {override, addWebpackPlugin} = require('customize-cra')

const DllReferencePlugins = Object.keys(require('./webpack.dll.entry')).map(name => {
    return addWebpackPlugin(new webpack.DllReferencePlugin({
        context: '/',
        manifest: require(path.join(paths.appPublic, `/static/js/${name}.manifest.json`))
    }));
});

module.exports = override(
    DllReferencePlugins
);