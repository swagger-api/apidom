import { Element, transclude } from 'apidom';
import stampit from 'stampit';
import { ReferenceElement, visit } from 'apidom-ns-openapi-3-1';
import { hasIn, pathSatisfies } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';

import { ReferenceOptions as IReferenceOptions } from './types';
import parse from './parse';
import * as url from './util/url';
import { evaluate, uriToPointer } from './selectors/json-pointer';

// 1. - gather all Reference Objects
// 2. - for each Reference Object
//    2.1. - look at the $ref property
//    2.2. - translate the $ref JSON Pointer into absolute URI JSON Pointer
//    2.3. - resolve the absolute URI JSON Pointer against data
//    2.4. - if resolved data is again a Reference (Like) Object repeat from 2.1

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const DereferenceVisitor = stampit({
  props: {
    baseURI: '',
    element: null,
    indirections: [],
  },
  init({ baseURI, element, indirections = [] }) {
    this.baseURI = baseURI;
    this.element = element;
    this.indirections = indirections;
  },
  methods: {
    async reference(referenceElement: ReferenceElement) {
      const uri = referenceElement.$ref.toValue();

      // if only hash is provided, reference is considered to be internal
      if (url.getHash(uri) === uri) {
        return this.referenceInternal(referenceElement);
      }
      // everything else is treated as an external reference
      return this.referenceExternal(referenceElement);
    },

    async referenceInternal(referenceElement: ReferenceElement) {
      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(referenceElement.$ref.toValue());
      let fragment = evaluate(jsonPointer, this.element);

      // detect direct or circular reference
      if (this.indirections.includes(fragment)) {
        throw new Error('Recursive JSON Pointer detected');
      }

      // dive deep into the fragment
      const visitor = DereferenceVisitor({
        baseURI: this.baseURI,
        element: this.element,
        indirections: [...this.indirections],
      });
      await visitAsync(fragment, visitor);

      /**
       * Re-evaluate the JSON Pointer against the element as the fragment could
       * have been another reference and the previous deep dive into fragment
       * dereferenced it.
       */
      fragment = evaluate(jsonPointer, this.element);

      // override description and summary (outer has higher priority then inner)
      const hasDescription = pathSatisfies(isNotUndefined, ['description'], referenceElement);
      const hasSummary = pathSatisfies(isNotUndefined, ['summary'], referenceElement);
      if (hasDescription || hasSummary) {
        fragment = fragment.clone();

        if (hasDescription && hasIn('description', fragment)) {
          // @ts-ignore
          fragment.description = referenceElement.description;
        }
        if (hasSummary && hasIn('summary', fragment)) {
          // @ts-ignore
          fragment.summary = referenceElement.summary;
        }
      }

      // transclude the element for a fragment
      this.element = transclude(referenceElement, fragment, this.element);

      this.indirections.pop();
    },

    async referenceExternal(referenceElement: ReferenceElement) {
      this.indirections.push(referenceElement);

      const uri = referenceElement.$ref.toValue();
      const uriWithoutHash = url.stripHash(uri);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;
      const baseURI = url.resolve(this.baseURI, sanitizedURI);
      const parseResult = await parse(baseURI, this.options);
      const { first: element } = parseResult;
      const jsonPointer = uriToPointer(uri);
      // @ts-ignore
      const fragment = evaluate(jsonPointer, element);

      // dive deep into the fragment
      const visitor = DereferenceVisitor({
        baseURI,
        element,
        indirections: [...this.indirections],
      });
      await visitAsync(fragment, visitor);

      this.indirections.pop();
    },
  },
});

// eslint-disable-next-line import/prefer-default-export
export const dereferenceApiDOM = async <T extends Element>(
  element: T,
  options: IReferenceOptions,
): Promise<T> => {
  const visitor = DereferenceVisitor({ baseURI: options.resolve.baseURI, element });
  await visitAsync(element, visitor, { state: { options } });

  return element;
};
