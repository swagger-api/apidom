import { ParseResultElement } from '@swagger-api/apidom-core';

import lexicalAnalysis from './lexical-analysis/browser.ts';
import syntacticAnalysisDirect from './syntactic-analysis/direct/index.ts';
import syntacticAnalysisIndirect from './syntactic-analysis/indirect/index.ts';
import { detectionRegExp } from './adapter.ts';

export { mediaTypes, namespace } from './adapter.ts';
export type { JSONMediaTypes } from './media-types.ts';
export type { Tree } from './syntactic-analysis/indirect/index.ts';
export { detectionRegExp };

export {
  lexicalAnalysis,
  syntacticAnalysisDirect as syntacticAnalysis,
  syntacticAnalysisDirect,
  syntacticAnalysisIndirect,
};

/**
 * @public
 */
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

/**
 * @public
 */
export interface ParseFunctionOptions {
  sourceMap?: boolean;
  syntacticAnalysis?: 'direct' | 'indirect';
}

/**
 * @public
 */
export type ParseFunction = (
  source: string,
  options?: ParseFunctionOptions,
) => Promise<ParseResultElement>;

/**
 * @public
 */
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
