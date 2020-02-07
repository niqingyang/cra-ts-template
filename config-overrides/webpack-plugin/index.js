const {
    override,
    addWebpackPlugin,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    adjustWorkbox
} = require('customize-cra');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');

module.exports = override(
    // progress
    addWebpackPlugin(new ProgressBarPlugin()),

    // ignore
    addWebpackPlugin(new IgnorePlugin(/^\.\/locale$/, /moment$/)),

    // hashed module
    addWebpackPlugin(new HashedModuleIdsPlugin()),

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