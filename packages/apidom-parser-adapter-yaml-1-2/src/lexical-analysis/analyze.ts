import Parser, { Tree } from 'web-tree-sitter';
import { ApiDOMError } from '@swagger-api/apidom-error';

let parser: Parser | null = null;
let parserInitLock: Promise<Parser> | null = null;
let currentTree: Tree | null = null;

const createAnalyze =
  (treeSitterYaml: string | Uint8Array) =>
  async (source: string): Promise<Tree> => {
    if (parser === null && parserInitLock === null) {
      // acquire lock
      parserInitLock = Parser.init()
        .then(() => Parser.Language.load(treeSitterYaml))
        .then((yamlLanguage) => {
          const parserInstance = new Parser();
          parserInstance.setLanguage(yamlLanguage);
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
    }

    if (parser === null) {
      throw new ApiDOMError(
        'Error while initializing web-tree-sitter and loading tree-sitter-yaml grammar.',
      );
    }

    if (currentTree !== null) {
      currentTree.delete();
    }
    currentTree = parser.parse(source);

    parser.reset();

    return currentTree;
  };

export default createAnalyze;
