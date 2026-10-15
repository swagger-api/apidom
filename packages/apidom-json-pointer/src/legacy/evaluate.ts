import { JSONPointerEvaluateError, URIFragmentIdentifier } from '@swaggerexpert/json-pointer';
import { Element, cloneDeep } from '@swagger-api/apidom-core';

import baseEvaluate from '../evaluate.ts';
import EvaluationJsonPointerError from './errors/EvaluationJsonPointerError.ts';

/**
 * Evaluates JSON Pointer against ApiDOM fragment.
 * @public
 * @deprecated
 */
const evaluate = <T extends Element>(pointer: string, element: T): Element => {
  try {
    return baseEvaluate(element, URIFragmentIdentifier.from(pointer));
  } catch (error: unknown) {
    if (error instanceof JSONPointerEvaluateError) {
      throw new EvaluationJsonPointerError(error.message, {
        pointer,
        tokens: error.referenceTokens,
        failedToken: error.referenceToken,
        failedTokenPosition: error.referenceTokenPosition,
        element: cloneDeep(element),
        cause: error,
      });
    }

    throw new EvaluationJsonPointerError((error as Error).message, {
      pointer,
      element: cloneDeep(element),
      cause: error,
    });
  }
};

export default evaluate;
