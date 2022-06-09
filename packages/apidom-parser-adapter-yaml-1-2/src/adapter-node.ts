import { ParseResultElement } from '@swagger-api/apidom-core';

import lexicalAnalysis from './lexical-analysis/node';
import syntacticAnalysis from './syntactic-analysis/index';

export { mediaTypes, namespace } from './adapter';
export { lexicalAnalysis, syntacticAnalysis };

export const detect = async (source: string): Promise<boolean> => {
  try {
    const cst = await lexicalAnalysis(source);
    return cst.rootNode.type !== 'ERROR';
  } catch {
    return false;
  }
};

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
