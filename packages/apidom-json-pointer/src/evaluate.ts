import { isInteger } from 'ramda-adjunct';
import { Element, isObjectElement, isArrayElement, cloneDeep } from '@swagger-api/apidom-core';

import parse from './parse.ts';
import EvaluationJsonPointerError from './errors/EvaluationJsonPointerError.ts';

/**
 * Evaluates JSON Pointer against ApiDOM fragment.
 * @public
 */
const evaluate = <T extends Element>(pointer: string, element: T): Element => {
  let tokens: string[];

  try {
    tokens = parse(pointer);
  } catch (error: unknown) {
    throw new EvaluationJsonPointerError(
      `JSON Pointer evaluation failed while parsing the pointer "${pointer}".`,
      {
        pointer,
        element: cloneDeep(element),
        cause: error,
      },
    );
  }

  return tokens.reduce((acc, token, tokenPosition) => {
    if (isObjectElement(acc)) {
      // @ts-ignore
      if (!acc.hasKey(token)) {
        throw new EvaluationJsonPointerError(
          `JSON Pointer evaluation failed while evaluating token "${token}" against an ObjectElement`,
          {
            pointer,
            tokens,
            failedToken: token,
            failedTokenPosition: tokenPosition,
            element: cloneDeep(acc),
          },
        );
      }
      // @ts-ignore
      return acc.get(token);
    }

    if (isArrayElement(acc)) {
      if (!(token in acc.content) || !isInteger(Number(token))) {
        throw new EvaluationJsonPointerError(
          `JSON Pointer evaluation failed while evaluating token "${token}" against an ArrayElement`,
          {
            pointer,
            tokens,
            failedToken: token,
            failedTokenPosition: tokenPosition,
            element: cloneDeep(acc),
          },
        );
      }
      // @ts-ignore
      return acc.get(Number(token));
    }

    throw new EvaluationJsonPointerError(
      `JSON Pointer evaluation failed while evaluating token "${token}" against an unexpected Element`,
      {
        pointer,
        tokens,
        failedToken: token,
        failedTokenPosition: tokenPosition,
        element: cloneDeep(acc),
      },
    );
  }, element);
};

export default evaluate;
