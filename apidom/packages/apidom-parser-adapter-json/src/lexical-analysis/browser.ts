import './browser-patch';

import Parser, { Tree } from 'web-tree-sitter';
// @ts-ignore
import treeSitterJson from 'tree-sitter-json/tree-sitter-json.wasm';

/**
 * We initialize the WebTreeSitter as soon as we can.
 */
const parserP = (async () => {
  await Parser.init();
  await Parser.Language.load(treeSitterJson);

  return new Parser();
})();

/**
 * Lexical Analysis of source string using WebTreeSitter.
 * This is WebAssembly version of TreeSitters Lexical Analysis.
 */
const analyze = async (source: string): Promise<Tree> => {
  const parser = await parserP;
  return parser.parse(source);
};

export default analyze;
