const {override, addWebpackAlias} = require("customize-cra");
const path = require('path');
const paths = require('../paths');

module.exports = override(
    // add an alias for "ag-grid-react" imports
    addWebpackAlias({
        "@": paths.appSrc,
        ["@hooks"]: path.resolve(paths.appSrc, "/hooks"),
        ["@pages"]: path.resolve(paths.appSrc, "/pages"),
        ["@components"]: path.resolve(paths.appSrc, "/components"),
    }),
);