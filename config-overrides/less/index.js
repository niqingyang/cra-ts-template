const {override} = require('customize-cra');

// CSS Module Local Ident
// antdpro /config/config.js
// 使用固定值 localIdentName: '[name]__[local]__[hash:base64:5]' 会导致 less 在页面中无法修改部分样式的主题色
const slash = require('slash2');
const getlocalIdentName = (context, localIdentName, localName) => {
    if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
    ) {
        return localName;
    }
    const match = context.resourcePath.match(/src(.*)/);
    if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
    }
    return localName;
}

const addLessLoader = (loaderOptions = {}) => config => {
    const mode = process.env.NODE_ENV === "development" ? "dev" : "prod";

    // Need these for production mode, which are copied from react-scripts
    const publicPath = require("react-scripts/config/paths").servedPath;
    const shouldUseRelativeAssetPaths = publicPath === "./";
    const shouldUseSourceMap = mode === "prod" && process.env.GENERATE_SOURCEMAP !== "false";
    const lessRegex = /\.less$/;
    const lessModuleRegex = /\.module\.less$/;
    const localIdentName = loaderOptions.localIdentName || "[path][name]__[local]--[hash:base64:5]";

    const getLessLoader = cssOptions => {
        return [
            mode === "dev"
                ? require.resolve("style-loader")
                : {
                    loader: require("mini-css-extract-plugin").loader,
                    options: Object.assign(
                        {},
                        shouldUseRelativeAssetPaths ? {publicPath: "../../"} : undefined
                    )
                },
            {
                loader: require.resolve("css-loader"),
                options: cssOptions
            },
            {
                loader: require.resolve("postcss-loader"),
                options: {
                    ident: "postcss",
                    plugins: () => [
                        require("postcss-flexbugs-fixes"),
                        require("postcss-preset-env")({
                            autoprefixer: {
                                flexbox: "no-2009"
                            },
                            stage: 3
                        })
                    ],
                    sourceMap: shouldUseSourceMap
                }
            },
            {
                loader: require.resolve("less-loader"),
                options: Object.assign(loaderOptions, {
                    source: shouldUseSourceMap
                })
            }
        ];
    };

    const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;

    // Insert less-loader as the penultimate item of loaders (before file-loader)
    // css-loader 3 配置已改变
    // https://github.com/rails/webpacker/issues/2197
    loaders.splice(
        loaders.length - 1,
        0,
        {
            test: lessRegex,
            exclude: lessModuleRegex,
            use: getLessLoader({
                importLoaders: 2,
                modules: {
                    getLocalIdent: getlocalIdentName
                }
            }),
            sideEffects: mode === "prod"
        },
        {
            test: lessModuleRegex,
            use: getLessLoader({
                importLoaders: 2,
                modules: {
                    getLocalIdent: getlocalIdentName
                }
            })
        }
    );

    return config;
};

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        // 变量
        modifyVars: {'@var': '#1DA57A'},
    })
);
