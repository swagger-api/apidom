import stampit from 'stampit';
import { propEq, values, has, pipe } from 'ramda';
import { allP } from 'ramda-adjunct';
import { isPrimitiveElement, isStringElement, visit, toValue } from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  getNodeType,
  isReferenceElement,
  isReferenceLikeElement,
  isPathItemElement,
  keyMap,
  ReferenceElement,
  PathItemElement,
  LinkElement,
  ExampleElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import { Reference as IReference } from '../../../types';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError';
import MaximumResolverDepthError from '../../../errors/MaximumResolverDepthError';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0ResolveVisitor = stampit({
  props: {
    indirections: [],
    namespace: null,
    reference: null,
    crawledElements: null,
    crawlingMap: null,
    options: null,
  },
  init({ reference, namespace, indirections = [], options }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.crawledElements = [];
    this.crawlingMap = {};
    this.options = options;
  },
  methods: {
    toBaseURI(uri: string): string {
      return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
    },

    async toReference(uri: string): Promise<IReference> {
      // detect maximum depth of resolution
      if (this.reference.depth >= this.options.resolve.maxDepth) {
        throw new MaximumResolverDepthError(
          `Maximum resolution depth of ${this.options.resolve.maxDepth} has been exceeded by file "${this.reference.uri}"`,
        );
      }

      const baseURI = this.toBaseURI(uri);
      const { refSet } = this.reference;

      // we've already processed this Reference in past
      if (refSet.has(baseURI)) {
        return refSet.find(propEq(baseURI, 'uri'));
      }

      const parseResult = await parse(url.unsanitize(baseURI), {
        ...this.options,
        parse: { ...this.options.parse, mediaType: 'text/plain' },
      });

      // register new Reference with ReferenceSet
      const reference = Reference({
        uri: baseURI,
        value: parseResult,
        depth: this.reference.depth + 1,
      });

      refSet.add(reference);

      return reference;
    },

    ReferenceElement(referenceElement: ReferenceElement) {
      const uri = toValue(referenceElement.$ref);
      const baseURI = this.toBaseURI(uri);

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== baseURI) {
        return undefined;
      }

      if (!has(baseURI, this.crawlingMap)) {
        this.crawlingMap[baseURI] = this.toReference(uri);
      }
      this.crawledElements.push(referenceElement);

      return undefined;
    },

    PathItemElement(pathItemElement: PathItemElement) {
      // ignore PathItemElement without $ref field
      if (!isStringElement(pathItemElement.$ref)) {
        return undefined;
      }

      const uri = toValue(pathItemElement.$ref);
      const baseURI = this.toBaseURI(uri);

      // ignore resolving external Path Item Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== baseURI) {
        return undefined;
      }

      if (!has(baseURI, this.crawlingMap)) {
        this.crawlingMap[baseURI] = this.toReference(uri);
      }
      this.crawledElements.push(pathItemElement);

      return undefined;
    },

    LinkElement(linkElement: LinkElement) {
      // ignore LinkElement without operationRef or operationId field
      if (!isStringElement(linkElement.operationRef) && !isStringElement(linkElement.operationId)) {
        return undefined;
      }

      // operationRef and operationId are mutually exclusive
      if (isStringElement(linkElement.operationRef) && isStringElement(linkElement.operationId)) {
        throw new ApiDOMError('LinkElement operationRef and operationId are mutually exclusive.');
      }

      if (isStringElement(linkElement.operationRef)) {
        const uri = toValue(linkElement.operationRef);
        const baseURI = this.toBaseURI(uri);

        // ignore resolving LinkElement.operationRef
        if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== baseURI) {
          return undefined;
        }

        if (!has(baseURI, this.crawlingMap)) {
          this.crawlingMap[baseURI] = this.toReference(uri);
        }
      }

      return undefined;
    },

    ExampleElement(exampleElement: ExampleElement) {
      // ignore ExampleElement without externalValue field
      if (!isStringElement(exampleElement.externalValue)) {
        return undefined;
      }

      // value and externalValue fields are mutually exclusive
      if (exampleElement.hasKey('value') && isStringElement(exampleElement.externalValue)) {
        throw new ApiDOMError(
          'ExampleElement value and externalValue fields are mutually exclusive.',
        );
      }

      const uri = toValue(exampleElement.externalValue);
      const baseURI = this.toBaseURI(uri);

      // ignore resolving ExampleElement externalValue
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== baseURI) {
        return undefined;
      }

      if (!has(baseURI, this.crawlingMap)) {
        this.crawlingMap[baseURI] = this.toReference(uri);
      }

      return undefined;
    },

    async crawlReferenceElement(referenceElement: ReferenceElement) {
      // @ts-ignore
      const reference = await this.toReference(toValue(referenceElement.$ref));

      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(toValue(referenceElement.$ref));

      // possibly non-semantic fragment
      let fragment = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(fragment)) {
        const referencedElementType = toValue(referenceElement.meta.get('referenced-element'));

        if (isReferenceLikeElement(fragment)) {
          // handling indirect references
          fragment = ReferenceElement.refract(fragment);
          fragment.setMetaProperty('referenced-element', referencedElementType);
        } else {
          // handling direct references
          const ElementClass = this.namespace.getElementClass(referencedElementType);
          fragment = ElementClass.refract(fragment);
        }
      }

      // detect direct or circular reference
      if (this.indirections.includes(fragment)) {
        throw new ApiDOMError('Recursive Reference Object detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // dive deep into the fragment
      const visitor = OpenApi3_0ResolveVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
      });
      await visitAsync(fragment, visitor, { keyMap, nodeTypeGetter: getNodeType });
      await visitor.crawl();

      this.indirections.pop();
    },

    async crawlPathItemElement(pathItemElement: PathItemElement) {
      // @ts-ignore
      const reference = await this.toReference(toValue(pathItemElement.$ref));

      this.indirections.push(pathItemElement);

      const jsonPointer = uriToPointer(toValue(pathItemElement.$ref));

      // possibly non-semantic fragment
      let referencedElement = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(referencedElement)) {
        referencedElement = PathItemElement.refract(referencedElement);
      }

      // detect direct or indirect reference
      if (this.indirections.includes(referencedElement)) {
        throw new ApiDOMError('Recursive Path Item Object reference detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // dive deep into the fragment
      const visitor: any = OpenApi3_0ResolveVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
      });
      await visitAsync(referencedElement, visitor, { keyMap, nodeTypeGetter: getNodeType });
      await visitor.crawl();

      this.indirections.pop();
    },

    async crawl() {
      /**
       * Synchronize all parallel resolutions in this place.
       * After synchronization happened we can be sure that refSet
       * contains resolved Reference objects.
       */
      await pipe(values, allP)(this.crawlingMap);
      this.crawlingMap = null;

      /* eslint-disable no-await-in-loop */
      for (const element of this.crawledElements) {
        if (isReferenceElement(element)) {
          await this.crawlReferenceElement(element);
        } else if (isPathItemElement(element)) {
          await this.crawlPathItemElement(element);
        }
      }
      /* eslint-enabled */
    },
  },
});

export default OpenApi3_0ResolveVisitor;
