import { JSONPath } from 'jsonpath-plus';
import { Element, toValue } from '@swagger-api/apidom-core';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

type Evaluate = {
  <T extends Element>(path: string, element: T): Element[];
  <T extends Element>(path: string[], element: T): Element[];
};

type JSONPathEvalTuple = [string, Element[]];

type EvaluateMulti = {
  <T extends Element>(paths: string[], element: T): JSONPathEvalTuple[];
  <T extends Element>(paths: string[][], element: T): JSONPathEvalTuple[];
};

/**
 * Evaluates single JSONPath on ApiDOM element.
 */
export const evaluate: Evaluate = (path, element) => {
  const json = toValue(element);
  const pointers = JSONPath({
    path,
    json,
    resultType: 'pointer',
  }) as string[];

  return pointers.map((pointer) => jsonPointerEvaluate(pointer, element));
};

/**
 * Evaluates multiple JSONPaths on ApiDOM element.
 */
export const evaluateMulti: EvaluateMulti = (paths, element) => {
  const json = toValue(element);
  const results: JSONPathEvalTuple[] = [];

  for (const path of paths) {
    const pointers = JSONPath({
      path,
      json,
      resultType: 'pointer',
    }) as string[];

    const endPointValues: Element[] = [];
    for (const pointer of pointers) {
      const endPointValue = jsonPointerEvaluate(pointer, element);
      endPointValues.push(endPointValue);
    }

    if (Array.isArray(path)) {
      results.push([JSONPath.toPathString(path), endPointValues]);
    } else {
      results.push([path, endPointValues]);
    }
  }

  return results;
};
