import './browser-patch';

import Parser, { Tree } from 'web-tree-sitter';

// @ts-ignore
import treeSitterYaml from '../../wasm/tree-sitter-yaml.wasm';

/**
 * We initialize the WebTreeSitter as soon as we can.
 */
const parserP = (async () => {
  await Parser.init();
  const yamlLanguage = await Parser.Language.load(treeSitterYaml);
  const parser = new Parser();

  parser.setLanguage(yamlLanguage);
  return parser;
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
