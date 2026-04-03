import { ParseResultElement } from '@swagger-api/apidom-core';
import { Tree as WebTree } from 'web-tree-sitter';

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

  let cst: WebTree | null = null;

  try {
    cst = await lexicalAnalysis(source);
    const isError = cst.rootNode.type !== 'ERROR';

    return isError;
  } catch {
    return false;
  } finally {
    if (cst !== null) {
      cst.delete();
    }
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
  let cst: WebTree | null = null;
  try {
    cst = await lexicalAnalysis(source);
    if (syntacticAnalysis === 'indirect') {
      return syntacticAnalysisIndirect(cst, { sourceMap });
    }
    return syntacticAnalysisDirect(cst, { sourceMap });
  } finally {
    if (cst !== null) {
      cst.delete();
    }
  }
};
