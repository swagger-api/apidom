import path from 'node:path';
import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/adapter.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 2200000,
    maxAssetSize: 2200000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-api-design-systems-json.browser.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterApiDesignSystemsJson',
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
    maxEntrypointSize: 330000,
    maxAssetSize: 330000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-api-design-systems-json.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterApiDesignSystemsJson',
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
