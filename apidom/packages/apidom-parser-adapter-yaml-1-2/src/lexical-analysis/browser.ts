import './browser-patch';

import Parser, { Tree } from 'web-tree-sitter';
// @ts-ignore
import treeSitterYaml from 'tree-sitter-yaml/tree-sitter-yaml.wasm';

/**
 * We initialize the WebTreeSitter as soon as we can.
 */
const parserP = (async () => {
  await Parser.init();
  await Parser.Language.load(treeSitterYaml);

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
