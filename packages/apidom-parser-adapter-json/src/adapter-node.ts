import { ParseResultElement } from '@swagger-api/apidom-core';

import lexicalAnalysis from './lexical-analysis/node';
import syntacticAnalysisDirect from './syntactic-analysis/direct';
import syntacticAnalysisIndirect from './syntactic-analysis/indirect';

export { detect, mediaTypes, namespace } from './adapter';
export {
  lexicalAnalysis,
  syntacticAnalysisDirect as syntacticAnalysis,
  syntacticAnalysisDirect,
  syntacticAnalysisIndirect,
};

interface ParseFunctionOptions {
  sourceMap?: boolean;
  syntacticAnalysis?: 'direct' | 'indirect';
}

type ParseFunction = (
  source: string,
  options?: ParseFunctionOptions,
) => Promise<ParseResultElement>;

export const parse: ParseFunction = async (
  source,
  { sourceMap = false, syntacticAnalysis = 'direct' } = {},
) => {
  const cst = await lexicalAnalysis(source);
  let apiDOM;

  if (syntacticAnalysis === 'indirect') {
    apiDOM = syntacticAnalysisIndirect(cst, { sourceMap });
  } else {
    apiDOM = syntacticAnalysisDirect(cst, { sourceMap });
  }

  return apiDOM;
};
