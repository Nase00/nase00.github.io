/* eslint-env node, mocha */

const context = require.context('./', true, /spec\.js(x|)?$/);
context.keys().forEach(context);
