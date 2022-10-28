import path from 'node:path';

import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/index.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 2100000,
    maxAssetSize: 2100000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ns-api-design-systems.browser.js',
    libraryTarget: 'umd',
    library: 'apidomNsApiDesignSystems',
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
  performance: {
    maxEntrypointSize: 280000,
    maxAssetSize: 280000,
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'apidom-ns-api-design-systems.browser.min.js',
    libraryTarget: 'umd',
    library: 'apidomNsApiDesignSystems',
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
