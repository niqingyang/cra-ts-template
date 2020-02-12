const {override, addBabelPresets, addBabelPlugins} = require("customize-cra");

module.exports = override(
    ...addBabelPresets(
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'usage',
                'corejs': '3'
            }
        ]
    ),
    ...addBabelPlugins(
        'react-hot-loader/babel',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        '@babel/plugin-proposal-json-strings',
        [
            '@babel/plugin-proposal-class-properties',
            {
                'loose': true
            }
        ],
        [
            '@babel/plugin-transform-runtime',
            {
                'absoluteRuntime': false,
                'corejs': '3',
                'helpers': true,
                'regenerator': true,
                'useESModules': false
            }
        ]
    )
);
