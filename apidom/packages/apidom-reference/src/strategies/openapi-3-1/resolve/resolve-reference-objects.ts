import { transduce, map, propEq, pathOr, flatten } from 'ramda';
import { Element, ObjectElement, ParseResultElement, filter } from 'apidom';
import { ReferenceElement } from 'apidom-ns-openapi-3-1';

import * as url from '../../../util/url';
import { isExternalReferenceElement, isExternalReferenceLikeElement } from '../predicates';
import ReferenceSet from '../../../ReferenceSet';
import Reference from '../../../Reference';
import { mergeWithDefaults } from '../../../options';
import {
  ReferenceSet as IReferenceSet,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import parse from '../../../parse';

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
 * Resolves the given JSON Reference, and then crawls the resulting value.
 * The promise resolves once all JSON references in the object have been resolved,
 * including nested references that are contained in externally-referenced files.
 */
export const resolveReferenceObject = async (
  element: ObjectElement | ReferenceElement,
  refSet: IReferenceSet,
  options: IReferenceOptions,
): Promise<ParseResultElement | ParseResultElement[]> => {
  const $ref = element.get('$ref').toValue();
  const resolvedURI = url.resolve(options.resolve.baseURI, $ref);
  const withoutHash = url.stripHash(resolvedURI);

  // return early if we already recognize this reference
  if (refSet.has(withoutHash)) {
    const reference = refSet.find(propEq('uri', withoutHash));
    return pathOr(new ParseResultElement(), ['value'], reference);
  }

  // parse the file and register with reference set
  const parseResult = await parse(withoutHash, options);
  const reference = Reference({ uri: withoutHash, depth: 0, refSet, value: parseResult });

  refSet.add(reference);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return flatten(await Promise.all(crawl(parseResult, refSet, options)));
};

/**
 * Recursively crawls the given element, and resolves any external Reference Object like element.
 * Returns an array of promises. There will be one promise for each Reference like Object.
 */
const crawl = <T extends Element>(
  element: T,
  refSet: IReferenceSet,
  options: IReferenceOptions,
): Promise<ParseResultElement | ParseResultElement[]>[] => {
  let promises: Promise<ParseResultElement | ParseResultElement[]>[] = [];
  const externalReferenceLikeObjects = filter(isExternalReferenceLikeElement)(element);

  for (const externalReferenceLikeObject of externalReferenceLikeObjects) {
    const resolved = resolveReferenceObject(externalReferenceLikeObject, refSet, options);
    promises = promises.concat(resolved);
  }

  return promises;
};

/**
 * Find and resolve ReferenceElements into ReferenceMap.
 */
const resolve = <T extends Element>(element: T, options = {}): IReferenceSet => {
  const mergedOpts = mergeWithDefaults(options);
  const baseURI = url.resolve(url.cwd(), sanitizeBaseURI(mergedOpts.resolve.baseURI)); // make it absolute
  const externalReferenceObjects = filter(isExternalReferenceElement)(element);
  const transducer = map((ref: ReferenceElement) => url.stripHash(ref.$ref.toValue()));
  const iteratorFn = (acc: IReferenceSet, uri: string) =>
    acc.add(Reference({ uri, depth: 0, refSet: acc }));
  const refSet = ReferenceSet();
  const rootReference = Reference({ uri: baseURI, depth: 0, refSet, value: element });
  refSet.add(rootReference);

  // @ts-ignore
  return transduce(transducer, iteratorFn, refSet, externalReferenceObjects);
};

export default resolve;
