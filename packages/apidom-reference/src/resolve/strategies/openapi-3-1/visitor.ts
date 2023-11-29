import stampit from 'stampit';
import { propEq, values, has, pipe, none } from 'ramda';
import { allP } from 'ramda-adjunct';
import { isPrimitiveElement, isStringElement, visit, toValue } from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate as jsonPointerEvaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  getNodeType,
  isReferenceElement,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  PathItemElement,
  LinkElement,
  ExampleElement,
  SchemaElement,
  isSchemaElement,
  isPathItemElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

import { Reference as IReference, Resolver as IResolver } from '../../../types';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError';
import MaximumResolverDepthError from '../../../errors/MaximumResolverDepthError';
import EvaluationJsonSchemaUriError from '../../../errors/EvaluationJsonSchemaUriError';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';
import File from '../../../util/File';
import { evaluate as uriEvaluate } from '../../../dereference/strategies/openapi-3-1/selectors/uri';
import { maybeRefractToSchemaElement, resolveSchema$refField } from './util';
import {
  evaluate as $anchorEvaluate,
  isAnchor,
  uriToAnchor,
} from '../../../dereference/strategies/openapi-3-1/selectors/$anchor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1ResolveVisitor = stampit({
  props: {
    indirections: [],
    namespace: null,
    reference: null,
    crawledElements: null,
    crawlingMap: null,
    visited: null,
    options: null,
  },
  init({ reference, namespace, indirections = [], visited = new WeakSet(), options }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.crawledElements = [];
    this.crawlingMap = {};
    this.visited = visited;
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
      const retrievalURI = this.toBaseURI(uri);

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
        // skip traversing this reference element and all it's child elements
        return false;
      }

      if (!has(retrievalURI, this.crawlingMap)) {
        this.crawlingMap[retrievalURI] = this.toReference(uri);
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
      const retrievalURI = this.toBaseURI(uri);

      // ignore resolving external Path Item Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
        // skip traversing this Path Item element but traverse all it's child elements
        return undefined;
      }

      if (!has(retrievalURI, this.crawlingMap)) {
        this.crawlingMap[retrievalURI] = this.toReference(uri);
      }
      this.crawledElements.push(pathItemElement);

      return undefined;
    },

    LinkElement(linkElement: LinkElement) {
      // ignore LinkElement without operationRef or operationId field
      if (!isStringElement(linkElement.operationRef) && !isStringElement(linkElement.operationId)) {
        return undefined;
      }

      const uri = toValue(linkElement.operationRef);
      const retrievalURI = this.toBaseURI(uri);

      // ignore resolving external Path Item Elements
      const isExternal = url.stripHash(this.reference.uri) !== retrievalURI;
      if (!this.options.resolve.external && isExternal) {
        return undefined;
      }

      // operationRef and operationId are mutually exclusive
      if (isStringElement(linkElement.operationRef) && isStringElement(linkElement.operationId)) {
        throw new ApiDOMError('LinkElement operationRef and operationId are mutually exclusive.');
      }

      if (isExternal) {
        if (!has(retrievalURI, this.crawlingMap)) {
          this.crawlingMap[retrievalURI] = this.toReference(uri);
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
      const retrievalURI = this.toBaseURI(uri);

      // ignore resolving external Example Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
        // skip traversing this Example element but traverse all it's child elements
        return undefined;
      }

      if (!has(retrievalURI, this.crawlingMap)) {
        this.crawlingMap[retrievalURI] = this.toReference(uri);
      }

      return undefined;
    },

    async SchemaElement(schemaElement: SchemaElement) {
      /**
       * Skip traversal for already visited schemas and all their child schemas.
       * visit function detects cycles in path automatically.
       */
      if (this.visited.has(schemaElement)) {
        return false;
      }
      // skip current referencing schema as $ref keyword was not defined
      if (!isStringElement(schemaElement.$ref)) {
        // mark current referencing schema as visited
        this.visited.add(schemaElement);
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      // compute baseURI using rules around $id and $ref keywords
      const reference = await this.toReference(url.unsanitize(this.reference.uri));
      let { uri: retrievalURI } = reference;
      const $refBaseURI = resolveSchema$refField(retrievalURI, schemaElement) as string;
      const $refBaseURIStrippedHash = url.stripHash($refBaseURI);
      const file = File({ uri: $refBaseURIStrippedHash });
      const isUnknownURI = none((r: IResolver) => r.canRead(file), this.options.resolve.resolvers);
      const isURL = !isUnknownURI;
      const isExternalURL = (uri: string) => url.stripHash(this.reference.uri) !== uri;

      if (!has($refBaseURIStrippedHash, this.crawlingMap)) {
        try {
          if (isUnknownURI || isURL) {
            this.crawlingMap[$refBaseURIStrippedHash] = reference;
          } else {
            retrievalURI = this.toBaseURI(toValue($refBaseURI));

            // ignore resolving external Schema Objects
            if (!this.options.resolve.external && isExternalURL(retrievalURI)) {
              // skip traversing this schema element but traverse all it's child elements
              this.visited.add(schemaElement);
              return undefined;
            }

            this.crawlingMap[$refBaseURIStrippedHash] = this.toReference(
              url.unsanitize($refBaseURI),
            );
          }
        } catch (error) {
          if (isURL && error instanceof EvaluationJsonSchemaUriError) {
            retrievalURI = this.toBaseURI(url.unsanitize($refBaseURI));

            // ignore resolving external Schema Objects
            if (!this.options.resolve.external && isExternalURL(retrievalURI)) {
              // skip traversing this schema element but traverse all it's child elements
              this.visited.add(schemaElement);
              return undefined;
            }

            this.crawlingMap[$refBaseURIStrippedHash] = this.toReference(
              url.unsanitize($refBaseURI),
            );
          } else {
            throw error;
          }
        }
      }
      this.crawledElements.push(schemaElement);

      return undefined;
    },

    async crawlReferenceElement(referenceElement: ReferenceElement) {
      // @ts-ignore
      const reference = await this.toReference(toValue(referenceElement.$ref));

      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(toValue(referenceElement.$ref));

      // possibly non-semantic fragment
      let fragment = jsonPointerEvaluate(jsonPointer, reference.value.result);

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
      const visitor = OpenApi3_1ResolveVisitor({
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
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);

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
      const visitor: any = OpenApi3_1ResolveVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
      });
      await visitAsync(referencedElement, visitor, { keyMap, nodeTypeGetter: getNodeType });
      await visitor.crawl();

      this.indirections.pop();
    },

    async crawlSchemaElement(referencingElement: SchemaElement) {
      // compute baseURI using rules around $id and $ref keywords
      let reference = await this.toReference(url.unsanitize(this.reference.uri));
      let { uri: retrievalURI } = reference;
      const $refBaseURI = resolveSchema$refField(retrievalURI, referencingElement) as string;
      const $refBaseURIStrippedHash = url.stripHash($refBaseURI);
      const file = File({ uri: $refBaseURIStrippedHash });
      const isUnknownURI = none((r: IResolver) => r.canRead(file), this.options.resolve.resolvers);
      const isURL = !isUnknownURI;
      const isExternalURL = (uri: string) => url.stripHash(this.reference.uri) !== uri;

      this.indirections.push(referencingElement);

      // determining reference, proper evaluation and selection mechanism
      let referencedElement;

      try {
        if (isUnknownURI || isURL) {
          // we're dealing with canonical URI or URL with possible fragment
          const selector = $refBaseURI;
          referencedElement = uriEvaluate(
            selector,
            // @ts-ignore
            maybeRefractToSchemaElement(reference.value.result),
          );
        } else {
          // we're assuming here that we're dealing with JSON Pointer here
          retrievalURI = this.toBaseURI(toValue($refBaseURI));

          // ignore resolving external Schema Objects
          if (!this.options.resolve.external && isExternalURL(retrievalURI)) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }

          reference = await this.toReference(url.unsanitize($refBaseURI));
          const selector = uriToPointer($refBaseURI);
          referencedElement = maybeRefractToSchemaElement(
            // @ts-ignore
            jsonPointerEvaluate(selector, reference.value.result),
          );
        }
      } catch (error) {
        /**
         * No SchemaElement($id=URL) was not found, so we're going to try to resolve
         * the URL and assume the returned response is a JSON Schema.
         */
        if (isURL && error instanceof EvaluationJsonSchemaUriError) {
          if (isAnchor(uriToAnchor($refBaseURI))) {
            // we're dealing with JSON Schema $anchor here
            retrievalURI = this.toBaseURI(toValue($refBaseURI));

            // ignore resolving external Schema Objects
            if (!this.options.resolve.external && isExternalURL(retrievalURI)) {
              // skip traversing this schema element but traverse all it's child elements
              return undefined;
            }

            reference = await this.toReference(url.unsanitize($refBaseURI));
            const selector = uriToAnchor($refBaseURI);
            referencedElement = $anchorEvaluate(
              selector,
              // @ts-ignore
              maybeRefractToSchemaElement(reference.value.result),
            );
          } else {
            // we're assuming here that we're dealing with JSON Pointer here
            retrievalURI = this.toBaseURI(toValue($refBaseURI));

            // ignore resolving external Schema Objects
            if (!this.options.resolve.external && isExternalURL(retrievalURI)) {
              // skip traversing this schema element but traverse all it's child elements
              return undefined;
            }

            reference = await this.toReference(url.unsanitize($refBaseURI));
            const selector = uriToPointer($refBaseURI);
            referencedElement = maybeRefractToSchemaElement(
              // @ts-ignore
              jsonPointerEvaluate(selector, reference.value.result),
            );
          }
        } else {
          throw error;
        }
      }

      // mark current referencing schema as visited
      this.visited.add(referencingElement);

      // detect direct or indirect reference
      if (this.indirections.includes(referencedElement)) {
        throw new ApiDOMError('Recursive Schema Object reference detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // dive deep into the fragment
      const visitor: any = OpenApi3_1ResolveVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        visited: this.visited,
      });
      await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });
      await visitor.crawl();

      this.indirections.pop();

      return undefined;
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
        } else if (isSchemaElement(element)) {
          await this.crawlSchemaElement(element);
        } else if (isPathItemElement(element)) {
          await this.crawlPathItemElement(element);
        }
      }
      /* eslint-enable */
    },
  },
});

export default OpenApi3_1ResolveVisitor;
