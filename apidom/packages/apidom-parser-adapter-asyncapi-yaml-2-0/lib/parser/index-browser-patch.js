"use strict";

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _treeSitter = _interopRequireDefault(require("web-tree-sitter/tree-sitter.wasm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
// patch fetch() to let emscripten load the WASM file
var realFetch = window.fetch;

window.fetch = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // @ts-ignore
  if ((0, _ramdaAdjunct.isString)(args[0]) && args[0].endsWith('/tree-sitter.wasm')) {
    // @ts-ignore
    return realFetch.apply(window, [_treeSitter["default"], (0, _ramda.tail)(args)]);
  }

  return realFetch.apply(window, args);
};