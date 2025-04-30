import { JSONPointerEvaluateError, URIFragmentIdentifier } from '@swaggerexpert/json-pointer';
import { evaluate as baseEvaluate } from '@swaggerexpert/json-pointer/evaluate/realms/apidom';
import { Element, cloneDeep } from '@swagger-api/apidom-core';

import EvaluationJsonPointerError from './errors/EvaluationJsonPointerError.ts';

/**
 * Evaluates JSON Pointer against ApiDOM fragment.
 * @public
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
