import './browser-patch.ts';

import Parser, { Tree } from 'web-tree-sitter';
import { ApiDOMError } from '@swagger-api/apidom-error';

// @ts-ignore
import treeSitterYaml from '../../wasm/tree-sitter-yaml.wasm';

let parser: Parser | null = null;
let parserInitLock: Promise<Parser> | null = null;
let currentTree: Tree | null = null;

// clear the old Wasm-allocated tree & reset the parser state
const releaseResources = () => {
  currentTree?.delete();
  parser?.reset();
};

/**
 * Lexical Analysis of source string using WebTreeSitter.
 * This is WebAssembly version of TreeSitters Lexical Analysis.
 *
 * Given JavaScript doesn't support true parallelism, this
 * code should be as lazy as possible and temporal safety should be fine.
 * @public
 */
const analyze = async (source: string): Promise<Tree> => {
  releaseResources();

  if (parser === null && parserInitLock === null) {
    // acquire lock
    parserInitLock = Parser.init()
      .then(() => Parser.Language.load(treeSitterYaml))
      .then((jsonLanguage) => {
        const parserInstance = new Parser();
        parserInstance.setLanguage(jsonLanguage);
        return parserInstance;
      })
      .finally(() => {
        // release lock
        parserInitLock = null;
      });
    parser = await parserInitLock;
  } else if (parser === null && parserInitLock !== null) {
    // await for lock to be released if there is one
    parser = await parserInitLock;
  } else if (parser === null) {
    throw new ApiDOMError(
      'Error while initializing web-tree-sitter and loading tree-sitter-yaml grammar.',
    );
  }

  currentTree = parser.parse(source);
  return currentTree;
};

export default analyze;
