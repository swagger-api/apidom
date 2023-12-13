import path from 'node:path';

import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/adapter.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 1800000,
    maxAssetSize: 1800000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-workflows-json-1.browser.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterWorkflowsJson1',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
    fallback: {
      fs: false,
      path: false,
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
  entry: ['./src/adapter.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 280000,
    maxAssetSize: 280000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-workflows-json-1.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterWorkflowsJson1',
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json'],
    fallback: {
      fs: false,
      path: false,
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
