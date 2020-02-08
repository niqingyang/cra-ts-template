module.exports = {
    extends: [
        'alloy',
        'alloy/react',
        'alloy/typescript',
    ],
    env: {
        // Your environments (which contains several predefined global variables)
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
        REACT_APP_ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
        page: true
    },
    rules: {
        // Customize your rules
        'max-params': 0,
        'react/jsx-no-useless-fragment': 0,
        'no-useless-catch': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        'no-param-reassign': 0,
        '@typescript-eslint/consistent-type-assertions': 0,
        '@typescript-eslint/prefer-optional-chain': 0,
        'no-eq-null': 0,
        'eqeqeq': 0
    }
};
