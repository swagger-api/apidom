import { tail } from 'ramda';
import { isString } from 'ramda-adjunct';
// @ts-ignore
import treeSitterWasm from 'web-tree-sitter/tree-sitter.wasm';

// patch fetch() to let emscripten load the WASM file
const realFetch = window.fetch;
window.fetch = (...args) => {
  // @ts-ignore
  if (isString(args[0]) && args[0].endsWith('/tree-sitter.wasm')) {
    // @ts-ignore
    return realFetch.apply(window, [treeSitterWasm, tail(args)]);
  }
  return realFetch.apply(window, args);
};
