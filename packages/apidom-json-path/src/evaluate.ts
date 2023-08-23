import { JSONPath } from 'jsonpath-plus';
import { Element, toValue } from '@swagger-api/apidom-core';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

type Evaluate = {
  <T extends Element>(path: string, element: T): Element[];
  <T extends Element>(path: string[], element: T): Element[];
};

/**
 * Evaluates single JSONPath on ApiDOM element.
 */
const evaluate: Evaluate = (path, element) => {
  const json = toValue(element);
  const pointers = JSONPath({
    path,
    json,
    resultType: 'pointer',
  }) as string[];

  return pointers.map((pointer) => jsonPointerEvaluate(pointer, element));
};

export default evaluate;
