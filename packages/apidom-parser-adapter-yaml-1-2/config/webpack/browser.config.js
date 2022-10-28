import path from 'node:path';
import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/adapter-browser.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 1300000,
    maxAssetSize: 1300000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-yaml-1-2.browser.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterYaml1_2',
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
  entry: ['./src/adapter-browser.ts'],
  target: 'web',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-parser-adapter-yaml1-2.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomParserAdapterYaml1_2',
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
