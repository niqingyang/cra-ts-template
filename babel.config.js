module.exports = function (api) {
    api.cache(true);

    const presets = [
        "react-app",
        [
            // https://babeljs.io/docs/en/babel-preset-env#usebuiltins
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": "3"
            }
        ]
    ];
    const plugins = [
        "react-hot-loader/babel",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": true
            }
        ],
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": "3",
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}
