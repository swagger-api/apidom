import { isUndefined } from 'ramda-adjunct';
import { Element, find, isStringElement } from 'apidom';
import { isSchemaElement } from 'apidom-ns-openapi-3-1';

import * as url from '../../../../util/url';
import { EvaluationJsonSchemaUriError } from './errors';
import { uriToPointer, evaluate as jsonPointerEvaluate } from '../../../../selectors/json-pointer';
import { isAnchor, uriToAnchor, evaluate as $anchorEvaluate } from './$anchor';

// evaluates JSON Schema $ref containing unknown URI against ApiDOM fragment
// eslint-disable-next-line import/prefer-default-export
export const evaluate = <T extends Element>(uri: string, element: T): Element | undefined => {
  const uriStrippedHash = url.stripHash(uri);
  const result = find(
    // @ts-ignore
    (e) =>
      isSchemaElement(e) &&
      isStringElement(e.$id) &&
      url.stripHash(e.$id.toValue()) === uriStrippedHash,
    element,
  );

  if (isUndefined(result)) {
    throw new EvaluationJsonSchemaUriError(`Evaluation failed on URI: "${uri}"`);
  }

  let fragmentEvaluate;
  let selector;
  if (isAnchor(uriToAnchor(uri))) {
    // we're dealing with JSON Schema $anchor here
    fragmentEvaluate = $anchorEvaluate;
    selector = uriToAnchor(uri);
  } else {
    // we're assuming here that we're dealing with JSON Pointer here
    fragmentEvaluate = jsonPointerEvaluate;
    selector = uriToPointer(uri);
  }

  // @ts-ignore
  return fragmentEvaluate(selector, result);
};
