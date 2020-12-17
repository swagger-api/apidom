import { transduce, map } from 'ramda';
import { Element, filter } from 'apidom';
import { ReferenceElement } from 'apidom-ns-openapi-3-1';

import * as url from '../../../util/url';
import { isExternalReferenceElement } from '../predicates';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import { mergeWithDefaults } from '../../../options';

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

/**
 * Find and resolve ReferenceElements into ReferenceMap.
 */
const resolve = <T extends Element>(element: T, options = {}): ReferenceSet => {
  const mergedOpts = mergeWithDefaults(options);
  const baseURI = url.resolve(url.cwd(), sanitizeBaseURI(mergedOpts.resolve.baseURI)); // make it absolut
  const externalRefs = filter(isExternalReferenceElement)(element);
  const transducer = map((ref: ReferenceElement) => url.stripHash(ref.$ref.toValue()));
  const iteratorFn = (acc: ReferenceSet, uri: string) =>
    acc.add(Reference({ uri, depth: 0, refSet: acc }));
  const refSet = ReferenceSet();
  const rootReference = Reference({ uri: baseURI, depth: 0, refSet });
  refSet.add(rootReference);

  // @ts-ignore
  return transduce(transducer, iteratorFn, refSet, externalRefs);
};

export default resolve;
