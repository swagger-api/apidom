/* eslint-disable */

require('regenerator-runtime');
require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

/**
 * JSDOM setup.
 */
require('jsdom-global')();

/**
 * This loader is responsible for loading WASM files in node.js environment.
 */

// WASM documents loader
const WASMLoader = (module, filename) => {
  module.exports = filename;
};

// allow loading of WASM documents
require.extensions['.wasm'] = WASMLoader;
