const {override, enableEslintTypescript} = require("customize-cra");

module.exports = override(
    enableEslintTypescript()
);
