import { trimCharsStart, isUndefined } from 'ramda-adjunct';
import { Element, find, toValue } from '@swagger-api/apidom-core';
import { isJSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-2020-12';

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
   *  https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.2
   */
  return /^[A-Za-z_][A-Za-z_0-9.-]*$/.test(uri);
};

/**
 * Returns the percent-decoded plain name fragment of the URI.
 * Malformed percent-encoding is returned as is and later rejected by `isAnchor`.
 * @public
 */
export const uriToAnchor = (uri: string): string => {
  const fragment = trimCharsStart('#', getHash(uri));

  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
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
 * Evaluates a JSON Schema plain name fragment against ApiDOM fragment.
 *
 * Both $anchor and $dynamicAnchor define plain name fragments, so a $ref can point
 * at either of them.
 *
 * https://json-schema.org/draft/2020-12/draft-bhutton-json-schema-01.html#section-8.2.2
 * @public
 */
export const evaluate = <T extends Element>(anchor: string, element: T): Element | undefined => {
  const token = parse(anchor);

  const result = find(
    (e) =>
      isJSONSchemaElement(e) &&
      (toValue(e.$anchor) === token || toValue(e.$dynamicAnchor) === token),
    element,
  );

  if (isUndefined(result)) {
    throw new EvaluationJsonSchema$anchorError(`Evaluation failed on token: "${token}"`);
  }

  // @ts-ignore
  return result;
};

export { EvaluationJsonSchema$anchorError, InvalidJsonSchema$anchorError };
export { default as JsonSchema$anchorError } from '../../../../errors/JsonSchema$anchorError.ts';
