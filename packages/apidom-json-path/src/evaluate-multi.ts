import { JSONPath } from 'jsonpath-plus';
import { Element, toValue } from '@swagger-api/apidom-core';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

type JSONPathEvalTuple = [string, Element[]];

type EvaluateMulti = {
  <T extends Element>(paths: string[], element: T): JSONPathEvalTuple[];
  <T extends Element>(paths: string[][], element: T): JSONPathEvalTuple[];
};

/**
 * Evaluates multiple JSONPaths on ApiDOM element.
 */
const evaluateMulti: EvaluateMulti = (paths, element) => {
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

export default evaluateMulti;
