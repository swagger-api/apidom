import Parser, { Tree } from 'tree-sitter';
// @ts-ignore
import YAMLLanguage from '@tree-sitter-grammars/tree-sitter-yaml';

const parser = new Parser();
parser.setLanguage(YAMLLanguage);

/**
 * Lexical Analysis of source string using TreeSitter.
 * This is Node.js version of TreeSitters Lexical Analysis.
 */
const analyze = async (source: string): Promise<Tree> => {
  return parser.parse(source);
};

export default analyze;
