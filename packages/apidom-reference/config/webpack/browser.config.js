import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import { nonMinimizeTrait, minimizeTrait } from './traits.config.js';

const browser = {
  mode: 'production',
  entry: ['./src/index.ts'],
  target: 'web',
  performance: {
    maxEntrypointSize: 3500000,
    maxAssetSize: 3500000,
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
    maxEntrypointSize: 600000,
    maxAssetSize: 600000,
  },
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

const binaryParserReplacer = new webpack.NormalModuleReplacementPlugin(
  /parse\/parsers\/apidom-reference-parser-binary\/index-node\.ts/,
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    'src',
    'parse',
    'parsers',
    'apidom-reference-parser-binary',
    'index-browser.ts',
  ),
);

const fileResolverReplacer = new webpack.NormalModuleReplacementPlugin(
  /resolve\/resolvers\/FileResolver\/index-node\.ts/,
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    'src',
    'resolve',
    'resolvers',
    'FileResolver',
    'index-browser.ts',
  ),
);

browser.plugins.push(binaryParserReplacer, fileResolverReplacer);
browserMin.plugins.push(binaryParserReplacer, fileResolverReplacer);

export default [browser, browserMin];
