const {
    override,
    addWebpackPlugin,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    adjustWorkbox
} = require('customize-cra');

const paths = require('../paths');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
// In development, we always serve from the root. This makes config easier.
const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : isEnvDevelopment && '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = override(
    // progress
    addWebpackPlugin(new ProgressBarPlugin()),

    // ignore
    addWebpackPlugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)),

    // hashed module
    addWebpackPlugin(new webpack.HashedModuleIdsPlugin()),

    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    // In development, this will be an empty string.
    addWebpackPlugin(new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw)),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    addWebpackPlugin(new webpack.DefinePlugin(env.stringified)),

    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),

    // disable eslint in webpack
    disableEsLint(),

    // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

    // adjust the underlying workbox
    adjustWorkbox(wb =>
        Object.assign(wb, {
            skipWaiting: true,
            exclude: (wb.exclude || []).concat("index.html")
        })
    )
);
