const {override, addTslintLoader, enableEslintTypescript} = require("customize-cra");

module.exports = override(
    enableEslintTypescript()
);
