import { isInteger } from 'ramda-adjunct';
import { Element, isObjectElement, isArrayElement } from '@swagger-api/apidom-core';

import parse from './parse';
import { EvaluationJsonPointerError } from './errors';

// evaluates JSON Pointer against ApiDOM fragment
const evaluate = <T extends Element>(pointer: string, element: T): Element => {
  const tokens = parse(pointer);

  return tokens.reduce((acc, token) => {
    if (isObjectElement(acc)) {
      // @ts-ignore
      if (!acc.hasKey(token)) {
        throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
      }
      // @ts-ignore
      return acc.get(token);
    }

    if (isArrayElement(acc)) {
      if (!(token in acc.content) || !isInteger(Number(token))) {
        throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
      }
      // @ts-ignore
      return acc.get(Number(token));
    }

    throw new EvaluationJsonPointerError(`Evaluation failed on token: "${token}"`);
  }, element);
};

export default evaluate;
