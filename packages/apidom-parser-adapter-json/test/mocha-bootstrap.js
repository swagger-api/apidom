/* eslint-disable */
require('@babel/register')({ extensions: ['.js', '.ts'], rootMode: 'upward' });

/**
 * Configure snapshot testing.
 */
const chai = require('chai');
const { jestSnapshotPlugin, addSerializer } = require('mocha-chai-jest-snapshot');

const jestApiDOMSerializer = require('../../../scripts/jest-serializer-apidom');
const jestStringSerializer = require('../../../scripts/jest-serializer-string');

chai.use(jestSnapshotPlugin());
addSerializer(jestApiDOMSerializer);
addSerializer(jestStringSerializer);

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
