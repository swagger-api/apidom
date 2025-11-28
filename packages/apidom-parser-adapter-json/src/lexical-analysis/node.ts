import Parser, { Language, Tree } from 'tree-sitter';
import JSONLanguage from 'tree-sitter-json';

const parser = new Parser();
parser.setLanguage(JSONLanguage as Language);

/**
 * Lexical Analysis of source string using TreeSitter.
 * This is Node.js version of TreeSitters Lexical Analysis.
 * @public
 */
const analyze = async (source: string): Promise<Tree> => {
  return parser.parse(source);
};

export default analyze;
