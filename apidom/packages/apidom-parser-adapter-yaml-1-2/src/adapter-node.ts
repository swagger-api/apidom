import { ParseResultElement } from 'apidom';

import lexicallyAnalyze from './lexical-analysis/node';
import syntacticallyAnalyze from './syntactic-analysis';

export { detect, mediaTypes, namespace } from './adapter';

interface ParseFunctionOptions {
  sourceMap?: boolean;
}

type ParseFunction = (
  source: string,
  options?: ParseFunctionOptions,
) => Promise<ParseResultElement>;

export const parse: ParseFunction = async (source, { sourceMap = false } = {}) => {
  const cst = await lexicallyAnalyze(source);
  return syntacticallyAnalyze(cst, { sourceMap });
};
