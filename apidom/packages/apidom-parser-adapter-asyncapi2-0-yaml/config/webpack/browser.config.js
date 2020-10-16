'use strict';

const path = require('path');
const { nonMinimizeTrait, minimizeTrait } = require('./traits.config');

const browser = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/adapter-browser.ts'],
  target: 'web',
  node: {
    fs: 'empty',
  },
  performance: {
    maxEntrypointSize: 712000,
    maxAssetSize: 712000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-asyncapi2-0-yaml.browser.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterAsyncApi2_0Yaml',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        loader: 'file-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            rootMode: 'upward',
          },
        },
      },
    ],
  },
  ...nonMinimizeTrait,
};

const browserMin = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/adapter-browser.ts'],
  target: 'web',
  node: {
    fs: 'empty',
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-asyncapi2-0-yaml.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterAsyncApi2_0Yaml',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        loader: 'file-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            rootMode: 'upward',
          },
        },
      },
    ],
  },
  ...minimizeTrait,
};

module.exports = [browser, browserMin];
