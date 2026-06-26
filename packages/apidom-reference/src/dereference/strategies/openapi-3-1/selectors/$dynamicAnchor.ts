import { trimCharsStart, isUndefined } from 'ramda-adjunct';
import { Element, find, toValue } from '@swagger-api/apidom-core';
import { isSchemaElement } from '@swagger-api/apidom-ns-openapi-3-1';

import { getHash } from '../../../../util/url.ts';
import EvaluationJsonSchema$dynamicAnchorError from '../../../../errors/EvaluationJsonSchema$dynamicAnchorError.ts';
import InvalidJsonSchema$dynamicAnchorError from '../../../../errors/InvalidJsonSchema$dynamicAnchorError.ts';

/**
 * @public
 */
export const isDynamicAnchor = (uri: string) => {
  /**
   *  MUST start with a letter ([A-Za-z]) or underscore ("_"), followed by any number of letters,
   *  digits ([0-9]), hyphens ("-"), underscores ("_"), and periods (".").
   *
   *  https://json-schema.org/draft/2020-12/json-schema-core.html#rfc.section.8.2.2
   */
  return /^[A-Za-z_][A-Za-z_0-9.-]*$/.test(uri);
};

/**
 * @public
 */
export const uriToDynamicAnchor = (uri: string): string => {
  const hash = getHash(uri);
  return trimCharsStart('#', hash);
};

/**
 * @public
 */
export const parse = (anchor: string): string => {
  if (!isDynamicAnchor(anchor)) {
    throw new InvalidJsonSchema$dynamicAnchorError(anchor);
  }

  return anchor;
};

/**
 * Evaluates JSON Schema $dynamicAnchor against ApiDOM fragment.
 * @public
 */
export const evaluate = <T extends Element>(anchor: string, element: T): Element | undefined => {
  const token = parse(anchor);

  // @ts-ignore
  const result = find((e) => isSchemaElement(e) && toValue(e.$dynamicAnchor) === token, element);

  if (isUndefined(result)) {
    throw new EvaluationJsonSchema$dynamicAnchorError(`Evaluation failed on token: "${token}"`);
  }

  // @ts-ignore
  return result;
};

export { EvaluationJsonSchema$dynamicAnchorError, InvalidJsonSchema$dynamicAnchorError };
export { default as JsonSchema$dynamicAnchorError } from '../../../../errors/JsonSchema$dynamicAnchorError.ts';
