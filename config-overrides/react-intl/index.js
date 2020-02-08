const {addBabelPlugin, override, add} = require('customize-cra')
const path = require('path');
const paths = require('../paths');

module.exports = override(
    addBabelPlugin([
        'react-intl-auto',
        {
            removePrefix: 'src.',
            filebase: false
        }
    ]),
    addBabelPlugin([
        'react-intl',
        {
            messagesDir: path.resolve(paths.appBuild, 'locales')
        }
    ]),
    addBabelPlugin([
        'react-intl-extractor',
        {
            extractedFile: path.resolve(paths.appSrc, 'locales/messages/default.json'),
            langFiles: [
                {
                    path: path.resolve(paths.appSrc, 'locales/messages/zh-CN.json'),
                    cleanUpNewMessages: false
                },
                {
                    path: path.resolve(paths.appSrc, 'locales/messages/en-US.json'),
                    cleanUpNewMessages: false
                }
            ]
        }
    ]),
);
