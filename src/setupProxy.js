/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-ignore
require('@babel/register');
const fs = require('fs');
const path = require("path");
const proxy = require('http-proxy-middleware');

const appPath = fs.realpathSync(process.cwd());

module.exports = function (app) {

    const mockPaths = [
        path.join(appPath, 'mock')
    ];

    app.use(require("express-hot-mock-middleware").createMiddleware(mockPaths));
};
