"use strict";

const path = require("path");
const { nonMinimizeTrait } = require("./traits.config");

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
  mode: "production",
  entry: ["./src/polyfills.ts", "./src/index.ts"],
  target: "web",
  node: {
    fs: "empty",
  },
  performance: {
    maxEntrypointSize: 3000000,
    maxAssetSize: 3000000,
  },
  output: {
    path: path.resolve("./dist"),
    filename: "apidom-demo.browser.js",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".ts", ".mjs", ".js", ".json"],
    alias: {
      ...apidomPackage("apidom"),
      ...apidomPackage("apidom-ast"),
      ...apidomPackage("apidom-ns-openapi3-1"),
      ...apidomPackage("apidom-parser"),
      ...apidomPackage("apidom-parser-adapter-openapi3-1"),
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
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  ...nonMinimizeTrait,
};

module.exports = [browser];
