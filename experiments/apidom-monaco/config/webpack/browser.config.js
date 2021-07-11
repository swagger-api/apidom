"use strict";

const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { nonMinimizeTrait } = require("./traits.config");

// host
const host = process.env.HOST || "localhost";

// app directory
const appDirectory = fs.realpathSync(process.cwd());

// gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

process.env.NODE_ENV = "development";

// ApiDOM packages resolution
const apidomPackage = (name) => {
  const pckgPath = [
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "apidom",
    "packages",
    name,
  ];
  const { module } = require(path.resolve(...pckgPath, "package.json"));

  return { [name]: path.resolve(...pckgPath, module) };
};

const browser = {
  mode: "development",
  entry: {
    main: [resolveAppPath("src/polyfills.ts"), resolveAppPath("src/index.ts")],
    "editor.worker": [
      resolveAppPath(
        "node_modules/monaco-editor-core/esm/vs/editor/editor.worker.js"
      ),
    ],
  },
  target: "web",
  node: {
    fs: "empty",
    net: "empty",
  },
  performance: {
    maxEntrypointSize: 3000000,
    maxAssetSize: 3000000,
  },
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === "editor.worker"
        ? "[name].js"
        : "[name].browser.js";
    },
    path: resolveAppPath("dist"),
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js", ".json"],
    alias: {
      ...apidomPackage("apidom"),
      ...apidomPackage("apidom-ast"),
      ...apidomPackage("apidom-ns-asyncapi-2-0"),
      ...apidomPackage("apidom-ns-openapi-3-1"),
      ...apidomPackage("apidom-parser"),
      ...apidomPackage("apidom-parser-adapter-asyncapi-json-2-0"),
      ...apidomPackage("apidom-parser-adapter-openapi-json-3-1"),
      ...apidomPackage("apidom-ls"),
    },
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        loader: "file-loader",
        type: "javascript/auto",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|ttf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./font/[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        include: resolveAppPath("src"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    // re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath("public/index.html"),
    }),
  ],
  devServer: {
    // serve index.html as the base
    contentBase: resolveAppPath("public"),
    // enable compression
    compress: true,
    // enable hot reloading
    hot: true,
    open: true,
    host,
    port: 3001,
    // public path is root of content base
    publicPath: "/",
  },
  ...nonMinimizeTrait,
};

module.exports = [browser];
