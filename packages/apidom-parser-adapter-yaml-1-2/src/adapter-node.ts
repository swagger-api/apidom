import { ParseResultElement } from 'apidom';

import lexicalAnalysis from './lexical-analysis/node';
import syntacticAnalysis from './syntactic-analysis';

export { detect, mediaTypes, namespace } from './adapter';
export { lexicalAnalysis, syntacticAnalysis };

interface ParseFunctionOptions {
  sourceMap?: boolean;
}

type ParseFunction = (
  source: string,
  options?: ParseFunctionOptions,
) => Promise<ParseResultElement>;

export const parse: ParseFunction = async (source, { sourceMap = false } = {}) => {
  const cst = await lexicalAnalysis(source);
  return syntacticAnalysis(cst, { sourceMap });
};
