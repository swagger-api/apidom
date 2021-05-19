import { ParseResultElement } from 'apidom';

import lexicallyAnalyze from './lexical-analysis/browser';
import syntacticallyAnalyzeDirectly from './syntactic-analysis/direct';
import syntacticallyAnalyzeIndirectly from './syntactic-analysis/indirect';

export { detect, mediaTypes, namespace } from './adapter';

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
  const cst = await lexicallyAnalyze(source);
  let apiDOM;

  if (syntacticAnalysis === 'indirect') {
    apiDOM = syntacticallyAnalyzeIndirectly(cst, { sourceMap });
  } else {
    apiDOM = syntacticallyAnalyzeDirectly(cst, { sourceMap });
  }

  return apiDOM;
};
