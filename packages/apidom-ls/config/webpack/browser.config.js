import path from 'node:path';
import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/index.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 8000000,
    maxAssetSize: 8000000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ls.browser.js',
    libraryTarget: 'umd',
    library: 'apidomLs',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
    fallback: {
      fs: false,
      path: false,
      util: false,
    },
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
  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2500000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ls.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomLs',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
    fallback: {
      fs: false,
      path: false,
      util: false,
    },
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

export default [browser, browserMin];
