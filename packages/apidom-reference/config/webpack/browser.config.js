import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/index.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 712000,
    maxAssetSize: 712000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-reference.browser.js',
    libraryTarget: 'umd',
    library: 'apidomReference',
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
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-reference.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomReference',
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

const normalModuleReplacementPlugin = new webpack.NormalModuleReplacementPlugin(
  /util\/btoa\/index-node\.ts/,
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    'src',
    'util',
    'btoa',
    'index-browser.ts',
  ),
);

browser.plugins.push(normalModuleReplacementPlugin);
browserMin.plugins.push(normalModuleReplacementPlugin);

export default [browser, browserMin];
