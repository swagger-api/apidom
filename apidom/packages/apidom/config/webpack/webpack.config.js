'use strict';

const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const nonMinimizeTrait = {
  optimization: {
    minimize: false,
    usedExports: false,
    concatenateModules: false,
  },
};

const minimizeTrait = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
};

const node = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/index.ts'],
  target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom.node.js',
    libraryTarget: 'umd',
    library: 'apidom',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json']
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
          },
        },
      },
    ],
  },
  ...nonMinimizeTrait,
};

const nodeMin = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/index.ts'],
  target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom.node.min.js',
    libraryTarget: 'umd',
    library: 'apidom',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json']
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
          },
        },
      },
    ],
  },
  ...minimizeTrait,
};

const browser = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/index.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 712000,
    maxAssetSize: 712000
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom.browser.js',
    libraryTarget: 'umd',
    library: 'apidom'
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json']
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
          },
        },
      },
    ],
  },
  ...nonMinimizeTrait,
};

const browserMin = {
  mode: 'production',
  entry: ['./src/polyfills.ts', './src/index.ts'],
  target: 'web',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidom'
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json']
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
          },
        },
      },
    ],
  },
  ...minimizeTrait,
};

module.exports = [
  node,
  nodeMin,
  browser,
  browserMin,
];
