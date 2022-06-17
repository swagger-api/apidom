import { ParseResultElement } from '@swagger-api/apidom-core';

import lexicalAnalysis from './lexical-analysis/browser';
import syntacticAnalysisDirect from './syntactic-analysis/direct';
import syntacticAnalysisIndirect from './syntactic-analysis/indirect';
import { detectionRegExp } from './adapter';

export { mediaTypes, namespace } from './adapter';
export { detectionRegExp };

export {
  lexicalAnalysis,
  syntacticAnalysisDirect as syntacticAnalysis,
  syntacticAnalysisDirect,
  syntacticAnalysisIndirect,
};

export const detect = async (source: string): Promise<boolean> => {
  if (!detectionRegExp.test(source)) {
    return false;
  }

  try {
    const cst = await lexicalAnalysis(source);
    return cst.rootNode.type !== 'ERROR';
  } catch {
    return false;
  }
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
