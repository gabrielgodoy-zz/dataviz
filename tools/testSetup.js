// Tests are placed alongside files under test.
// This file does the following:
// 1. Registers babel for transpiling the code for testing
// 2. Disables Webpack-specific features that Mocha doesn't understand.

/* eslint-disable no-var */
// This assures dev config (which includes
// hot module reloading code) doesn't apply for tests
process.env.NODE_ENV = 'test';

// Register babel so that it will transpile ES6 to ES5 before tests run
require('babel-register')();

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = () => null;
require.extensions['.styl'] = () => null;
require.extensions['.sass'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;
