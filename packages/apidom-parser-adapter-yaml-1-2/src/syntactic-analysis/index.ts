import { ParseResultElement } from '@swagger-api/apidom-core';

import directAnalyze, { FallbackNeeded, type Tree } from './direct/index.ts';
import indirectAnalyze from './indirect/index.ts';

export type { Tree };

/**
 * Syntactic analysis dispatcher.
 * Attempts the fast direct cursor-based analysis first.
 * Falls back to the indirect two-pass analysis when the document uses
 * YAML features (tags, anchors, aliases) that the direct path cannot handle.
 * @public
 */
const analyze = (cst: Tree, options: { sourceMap?: boolean } = {}): ParseResultElement => {
  try {
    return directAnalyze(cst, options);
  } catch (e) {
    if (e instanceof FallbackNeeded) {
      return indirectAnalyze(cst, options);
    }
    throw e;
  }
};

export default analyze;
