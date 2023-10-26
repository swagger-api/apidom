import { JSONPath } from 'jsonpath-plus';
import { Element, toValue, cloneDeep } from '@swagger-api/apidom-core';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

import EvaluationJsonPathError from './errors/EvaluationJsonPathError';

type Evaluate = {
  <T extends Element>(path: string, element: T): Element[];
  <T extends Element>(path: string[], element: T): Element[];
};

/**
 * Evaluates single JSONPath on ApiDOM element.
 */
const evaluate: Evaluate = (path, element) => {
  try {
    const json = toValue(element);
    const pointers = JSONPath({
      path,
      json,
      resultType: 'pointer',
    }) as string[];

    return pointers.map((pointer) => jsonPointerEvaluate(pointer, element));
  } catch (error: unknown) {
    throw new EvaluationJsonPathError(
      `JSON Path evaluation failed while evaluating "${String(path)}".`,
      { path, element: cloneDeep(element), cause: error },
    );
  }
};

export default evaluate;
