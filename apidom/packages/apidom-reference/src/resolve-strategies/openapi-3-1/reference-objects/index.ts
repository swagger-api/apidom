import stampit from 'stampit';
import { propEq, pathOr, flatten } from 'ramda';
import { Element, ObjectElement, ParseResultElement, filter } from 'apidom';
import { ReferenceElement } from 'apidom-ns-openapi-3-1';

import ResolveStrategy from '../../ResolveStrategy';
import {
  ReferenceOptions as IReferenceOptions,
  ReferenceSet as IReferenceSet,
  ResolveStrategy as IResolveStrategy,
  File as IFile,
} from '../../../types';
import * as url from '../../../util/url';
import parse from '../../../parse';
import { merge as mergeOptions } from '../../../options/util';
import Reference from '../../../Reference';
import { isExternalReferenceElement, isExternalReferenceLikeElement } from './predicates';
import ReferenceSet from '../../../ReferenceSet';

const ReferenceObjectsResolveStrategy: stampit.Stamp<IResolveStrategy> = stampit(
  ResolveStrategy,
).init(function ReferenceObjectsResolveStrategy() {
  /**
   * Private API.
   */

  /**
   * Resolves the given JSON Reference, and then crawls the resulting value.
   * The promise resolves once all JSON references in the object have been resolved,
   * including nested references that are contained in externally-referenced files.
   */
  const resolveReferenceObject = async (
    element: ObjectElement | ReferenceElement,
    refSet: IReferenceSet,
    depth = 0,
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
    const reference = Reference({ uri: withoutHash, depth, refSet, value: parseResult });
    const passThruOptions = mergeOptions(options, { resolve: { baseURI: withoutHash } });

    refSet.add(reference);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return flatten(await Promise.all(crawl(parseResult, refSet, depth + 1, passThruOptions)));
  };

  /**
   * Recursively crawls the given element, and resolves any external Reference Object like element.
   * Returns an array of promises. There will be one promise for each Reference like Object.
   */
  const crawl = <T extends Element>(
    element: T,
    refSet: IReferenceSet,
    depth = 0,
    options: IReferenceOptions,
  ): Promise<ParseResultElement | ParseResultElement[]>[] => {
    let promises: Promise<ParseResultElement | ParseResultElement[]>[] = [];
    const externalReferenceLikeObjects = filter(isExternalReferenceLikeElement)(element);

    for (const externalReferenceLikeObject of externalReferenceLikeObjects) {
      const resolved = resolveReferenceObject(externalReferenceLikeObject, refSet, depth, options);
      promises = promises.concat(resolved);
    }

    return promises;
  };

  /**
   * Public API.
   */

  this.canResolve = function canResolve(file: IFile) {
    return [
      'application/vnd.oai.openapi;version=3.1.0',
      'application/vnd.oai.openapi+json;version=3.1.0',
    ].includes(file.mediaType);
  };

  this.resolve = async function resolve(file: IFile, options: IReferenceOptions) {
    const { parseResult: element } = file;
    const externalReferenceObjects = filter(isExternalReferenceElement)(element);
    const refSet = ReferenceSet();
    const rootReference = Reference({ uri: file.uri, depth: 0, refSet, value: element });
    const passThruOptions = mergeOptions(options, {
      resolve: { baseURI: file.uri },
      parse: { mediaType: 'application/json' },
    });

    // manually add root reference
    refSet.add(rootReference);

    // nothing to resolve, so exit early
    if (!options.resolve.external) {
      return refSet;
    }

    // resolve all found Reference Object elements
    for (const externalReferenceObject of externalReferenceObjects) {
      // eslint-disable-next-line no-await-in-loop
      await resolveReferenceObject(externalReferenceObject, refSet, 1, passThruOptions);
    }

    return refSet;
  };
});

export default ReferenceObjectsResolveStrategy;
