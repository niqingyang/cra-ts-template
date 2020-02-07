const {override, addLessLoader} = require('customize-cra')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        // 变量
        modifyVars: {'@var': '#1DA57A'},
    })
);
