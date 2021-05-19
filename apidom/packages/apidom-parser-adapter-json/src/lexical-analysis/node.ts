import Parser, { Tree } from 'tree-sitter';
// @ts-ignore
import JSONLanguage from 'tree-sitter-json';

const parser = new Parser();
parser.setLanguage(JSONLanguage);

/**
 * Lexical Analysis of source string using TreeSitter.
 * This is Node.js version of TreeSitters Lexical Analysis.
 */
const analyze = async (source: string): Promise<Tree> => {
  return parser.parse(source);
};

export default analyze;
