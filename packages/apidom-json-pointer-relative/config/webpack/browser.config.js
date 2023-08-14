import path from 'node:path';

import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/index.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 1200000,
    maxAssetSize: 1200000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-json-pointer-relative.browser.js',
    libraryTarget: 'umd',
    library: 'apidomJsonPointerRelative',
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

const browserMin = {
  mode: 'production',
  entry: ['./src/index.ts'],
  target: 'web',
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-json-pointer-relative.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomJsonPointerRelative',
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

export default [browser, browserMin];
