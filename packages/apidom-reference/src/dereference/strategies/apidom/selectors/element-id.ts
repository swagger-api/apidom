import { isUndefined } from 'ramda-adjunct';
import { Element, filter, toValue } from '@swagger-api/apidom-core';

import EvaluationElementIdError from '../../../../errors/EvaluationElementIdError.ts';

const hasElementID = (element: Element): boolean => !!element.id;

/**
 * Evaluates element ID against ApiDOM fragment.
 * @public
 */
export const evaluate = <T extends Element>(elementID: string, element: T): Element | undefined => {
  const { cache } = evaluate;
  // warm the cache
  if (!cache.has(element)) {
    const elementsWithID = filter(hasElementID, element);
    cache.set(element, Array.from(elementsWithID));
  }

  // search for the matching element
  const result = cache.get(element).find((e: Element) => {
    return String(toValue(e.id)) === elementID;
  });

  if (isUndefined(result)) {
    throw new EvaluationElementIdError(`Evaluation failed on element ID: "${elementID}"`);
  }

  return result;
};
evaluate.cache = new WeakMap();

export { EvaluationElementIdError };
