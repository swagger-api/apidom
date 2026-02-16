import { ParseResultElement } from '@swagger-api/apidom-core';

import lexicalAnalysis from './lexical-analysis/browser.ts';
import syntacticAnalysis from './syntactic-analysis/indirect/index.ts';

export { mediaTypes, namespace } from './adapter.ts';
export type { YamlMediaTypes } from './media-types.ts';
export type { Tree } from './syntactic-analysis/indirect/index.ts';
export { lexicalAnalysis, syntacticAnalysis };

/**
 * @public
 */
export const detect = async (source: string): Promise<boolean> => {
  try {
    const cst = await lexicalAnalysis(source);
    const isError = !cst.rootNode.isError;

    cst.delete();

    return isError;
  } catch {
    return false;
  }
};

/**
 * @public
 */
export interface ParseFunctionOptions {
  sourceMap?: boolean;
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
export const parse: ParseFunction = async (source, { sourceMap = false } = {}) => {
  const cst = await lexicalAnalysis(source);
  const syntacticAnalysisResult = syntacticAnalysis(cst, { sourceMap });

  cst.delete();

  return syntacticAnalysisResult;
};
