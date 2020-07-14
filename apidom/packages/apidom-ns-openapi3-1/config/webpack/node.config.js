'use strict';

const path = require('path');
const { nonMinimizeTrait, minimizeTrait } = require('./traits.config');

const node = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/namespace.ts'],
  target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ns-openapi3-1.node.js',
    libraryTarget: 'umd',
    library: 'apidom',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
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

const nodeMin = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/namespace.ts'],
  target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ns-openapi3-1.node.min.js',
    libraryTarget: 'umd',
    library: 'apidom',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
  },
  module: {
    rules: [
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

module.exports = [node, nodeMin];
