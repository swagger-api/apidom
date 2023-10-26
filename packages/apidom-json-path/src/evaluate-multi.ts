import { JSONPath } from 'jsonpath-plus';
import { Element, toValue, cloneDeep } from '@swagger-api/apidom-core';
import { evaluate as jsonPointerEvaluate } from '@swagger-api/apidom-json-pointer';

import MultiEvaluationJsonPathError from './errors/MultiEvaluationJsonPathError';

type JSONPathEvalTuple = [string, Element[]];

type EvaluateMulti = {
  <T extends Element>(paths: string[], element: T): JSONPathEvalTuple[];
  <T extends Element>(paths: string[][], element: T): JSONPathEvalTuple[];
};

/**
 * Evaluates multiple JSONPaths on ApiDOM element.
 */
const evaluateMulti: EvaluateMulti = (paths, element) => {
  try {
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
  } catch (error: unknown) {
    throw new MultiEvaluationJsonPathError(
      `JSON Path evaluation failed while multi-evaluating "${String(paths)}".`,
      {
        paths,
        element: cloneDeep(element),
        cause: error,
      },
    );
  }
};

export default evaluateMulti;
