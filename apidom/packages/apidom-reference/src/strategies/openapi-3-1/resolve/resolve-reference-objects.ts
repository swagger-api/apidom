import { transduce, map, mergeDeepRight } from 'ramda';
import { Element, filter } from 'apidom';
import { ReferenceElement } from 'apidom-ns-openapi-3-1';

import * as url from '../../../util/url';
import { isExternalReferenceElement } from '../predicates';
import ReferenceMap from '../../../ReferenceMap';

/**
 * 1.) Compute base URI
 * 2.) Find external Reference elements
 * 3.) For each Reference element:
 *   3.1.) Fetch Reference element content
 *   3.2.) Parse Reference element content
 *   3.3.) Repeat with 1.)
 *
 * 1.) Base URI is either provided from outside or determined by CWD.
 * 2.) Root References are found by using namespace predicates. Tree structure
 *     is created and all non-root References are assigned as direct
 */

/**
 * If the path is a filesystem path, then convert it to a URL.
 *
 * NOTE: According to the JSON Reference spec, these should already be URLs,
 * but, in practice, many people use local filesystem paths instead.
 * So we're being generous here and doing the conversion automatically.
 * This is not intended to be a 100% bulletproof solution.
 * If it doesn't work for your use-case, then use a URL instead.
 */
const sanitizeBaseURI = (baseURI: string): string => {
  return url.isFileSystemPath(baseURI) ? url.fromFileSystemPath(baseURI) : baseURI;
};

const defaultOptions = {
  baseURI: '',
};

/**
 * Find and resolve ReferenceElements into ReferenceMap.
 */
const resolve = <T extends Element>(element: T, options = defaultOptions): ReferenceMap => {
  const mergedOpts = mergeDeepRight(defaultOptions, options);
  const baseURI = url.resolve(url.cwd(), sanitizeBaseURI(mergedOpts.baseURI)); // make it absolut
  const externalRefs = filter(isExternalReferenceElement)(element);
  const transducer = map((ref: ReferenceElement) => url.stripHash(ref.$ref.toValue()));
  const iteratorFn = (acc: ReferenceMap, uri: string) => acc.set(uri);
  const refMap = ReferenceMap();

  refMap.set(baseURI);

  // @ts-ignore
  return transduce(transducer, iteratorFn, refMap, externalRefs);
};

export default resolve;
