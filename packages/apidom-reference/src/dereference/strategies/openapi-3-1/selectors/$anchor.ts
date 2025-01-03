import { trimCharsStart, isUndefined } from 'ramda-adjunct';
import { Element, find, toValue } from '@swagger-api/apidom-core';
import { isSchemaElement } from '@swagger-api/apidom-ns-openapi-3-1';

import { getHash } from '../../../../util/url.ts';
import EvaluationJsonSchema$anchorError from '../../../../errors/EvaluationJsonSchema$anchorError.ts';
import InvalidJsonSchema$anchorError from '../../../../errors/InvalidJsonSchema$anchorError.ts';

/**
 * @public
 */
export const isAnchor = (uri: string) => {
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
export const uriToAnchor = (uri: string): string => {
  const hash = getHash(uri);
  return trimCharsStart('#', hash);
};

/**
 * @public
 */
export const parse = (anchor: string): string => {
  if (!isAnchor(anchor)) {
    throw new InvalidJsonSchema$anchorError(anchor);
  }

  return anchor;
};

/**
 * Evaluates JSON Schema $anchor against ApiDOM fragment.
 * @public
 */
export const evaluate = <T extends Element>(anchor: string, element: T): Element | undefined => {
  const token = parse(anchor);

  // @ts-ignore
  const result = find((e) => isSchemaElement(e) && toValue(e.$anchor) === token, element);

  if (isUndefined(result)) {
    throw new EvaluationJsonSchema$anchorError(`Evaluation failed on token: "${token}"`);
  }

  // @ts-ignore
  return result;
};

export { EvaluationJsonSchema$anchorError, InvalidJsonSchema$anchorError };
export { default as JsonSchema$anchorError } from '../../../../errors/JsonSchema$anchorError.ts';
