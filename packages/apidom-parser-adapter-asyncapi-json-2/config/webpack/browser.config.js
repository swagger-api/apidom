import path from 'node:path';
import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/adapter.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 2300000,
    maxAssetSize: 2300000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-asyncapi-json-2.browser.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterAsyncApiJson2',
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
    maxEntrypointSize: 350000,
    maxAssetSize: 350000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-asyncapi-json-2.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterAsyncApiJson2',
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
