'use strict';

const path = require('path');
const { nonMinimizeTrait, minimizeTrait } = require('./traits.config');

const browser = {
  mode: 'production',
  entry: ['./src/index.ts'],
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
    filename: 'apidom-ls.browser.js',
    libraryTarget: 'umd',
    library: 'apidomLs',
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
  entry: ['./src/index.ts'],
  target: 'web',
  node: {
    fs: 'empty',
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ls.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomLs',
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
