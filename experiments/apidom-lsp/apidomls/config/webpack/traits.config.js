"use strict";

const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const nonMinimizeTrait = {
  optimization: {
    minimize: false,
    usedExports: false,
    concatenateModules: false,
  },
};

module.exports = {
  nonMinimizeTrait,
};
