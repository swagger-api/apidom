import stampit from 'stampit';
import { propEq, values, has, pipe, none } from 'ramda';
import { allP } from 'ramda-adjunct';
import { isPrimitiveElement, isStringElement, visit } from '@swagger-api/apidom-core';
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
  isReferenceElementExternal,
  isSchemaElement,
  isPathItemElement,
  isPathItemElementExternal,
  isLinkElementExternal,
} from '@swagger-api/apidom-ns-openapi-3-1';

import { Reference as IReference, Resolver as IResolver } from '../../../types';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';
import File from '../../../util/File';
import { evaluate as jsonPointerEvaluate, uriToPointer } from '../../../selectors/json-pointer';
import { evaluate as uriEvaluate } from '../../../dereference/strategies/openapi-3-1/selectors/uri';
import { refractToSchemaElement, resolveInherited$id } from './util';
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
      const uriWithoutHash = url.stripHash(uri);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;

      return url.resolve(this.reference.uri, sanitizedURI);
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
        return refSet.find(propEq('uri', baseURI));
      }

      const parseResult = await parse(baseURI, {
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
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referenceElement)) {
        return false;
      }

      const uri = referenceElement.$ref.toValue();
      const baseURI = this.toBaseURI(uri);

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

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isPathItemElementExternal(pathItemElement)) {
        return undefined;
      }

      const uri = pathItemElement.$ref.toValue();
      const baseURI = this.toBaseURI(uri);

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

      // ignore resolving external Path Item Elements
      if (!this.options.resolve.external && isLinkElementExternal(linkElement)) {
        return undefined;
      }

      // operationRef and operationId are mutually exclusive
      if (isStringElement(linkElement.operationRef) && isStringElement(linkElement.operationId)) {
        throw new Error('LinkElement operationRef and operationId are mutually exclusive.');
      }

      if (isLinkElementExternal(linkElement)) {
        const uri = linkElement.operationRef.toValue();
        const baseURI = this.toBaseURI(uri);

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

      // ignore resolving ExampleElement externalValue
      if (!this.options.resolve.external && isStringElement(exampleElement.externalValue)) {
        return undefined;
      }

      // value and externalValue fields are mutually exclusive
      if (exampleElement.hasKey('value') && isStringElement(exampleElement.externalValue)) {
        throw new Error('ExampleElement value and externalValue fields are mutually exclusive.');
      }

      const uri = exampleElement.externalValue.toValue();
      const baseURI = this.toBaseURI(uri);

      if (!has(baseURI, this.crawlingMap)) {
        this.crawlingMap[baseURI] = this.toReference(uri);
      }

      return undefined;
    },

    SchemaElement(schemaElement: SchemaElement) {
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

      // compute Reference object using rules around $id and $ref keywords
      const baseURI = resolveInherited$id(this.reference.uri, schemaElement);
      const file = File({ uri: baseURI });
      const isUnknownURI = none((r: IResolver) => r.canRead(file), this.options.resolve.resolvers);
      const isExternal = this.reference.uri !== baseURI && !isUnknownURI;

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isExternal) {
        // mark current referencing schema as visited
        this.visited.add(schemaElement);
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      if (!has(baseURI, this.crawlingMap)) {
        this.crawlingMap[baseURI] = isUnknownURI ? this.reference : this.toReference(baseURI);
      }
      this.crawledElements.push(schemaElement);

      return undefined;
    },

    async crawlReferenceElement(referenceElement: ReferenceElement) {
      // @ts-ignore
      const reference = await this.toReference(referenceElement.$ref.toValue());

      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(referenceElement.$ref.toValue());

      // possibly non-semantic fragment
      let fragment = jsonPointerEvaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(fragment)) {
        const referencedElementType = referenceElement.meta.get('referenced-element').toValue();

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
        throw new Error('Recursive JSON Pointer detected');
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
      const reference = await this.toReference(pathItemElement.$ref.toValue());

      this.indirections.push(pathItemElement);

      const jsonPointer = uriToPointer(pathItemElement.$ref.toValue());

      // possibly non-semantic fragment
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(referencedElement)) {
        referencedElement = PathItemElement.refract(referencedElement);
      }

      // detect direct or indirect reference
      if (this.indirections.includes(referencedElement)) {
        throw new Error('Recursive JSON Pointer detected');
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
      // compute Reference object using rules around $id and $ref keywords
      const base$idURI = resolveInherited$id(this.reference.uri, referencingElement);
      const baseURI = this.toBaseURI(base$idURI);
      const file = File({ uri: baseURI });
      const isUnknownURI = none((r: IResolver) => r.canRead(file), this.options.resolve.resolvers);
      const reference = isUnknownURI ? this.reference : await this.toReference(base$idURI);

      this.indirections.push(referencingElement);

      // determining proper evaluation and selection mechanism
      const $refValue = referencingElement.$ref?.toValue();
      let evaluate: any;
      let selector: string;
      if (isUnknownURI) {
        // we're dealing with canonical URI with possible fragment
        evaluate = uriEvaluate;
        selector = url.resolve(reference.uri, $refValue);
      } else if (isAnchor(uriToAnchor($refValue))) {
        // we're dealing with JSON Schema $anchor here
        evaluate = $anchorEvaluate;
        selector = uriToAnchor($refValue);
      } else {
        // we're assuming here that we're dealing with JSON Pointer here
        evaluate = jsonPointerEvaluate;
        selector = uriToPointer($refValue);
      }

      // possibly non-semantic fragment
      let referencedElement;

      if (isPrimitiveElement(reference.value.result)) {
        // applying semantics to entire parsing result due to $schema and $id behavior of inheritance
        // @ts-ignore
        referencedElement = evaluate(selector, refractToSchemaElement(reference.value.result));
      } else {
        // here we're assuming that result reference.value.result is already Schema Element
        referencedElement = evaluate(selector, reference.value.result);
      }

      // mark current referencing schema as visited
      this.visited.add(referencingElement);

      // detect direct or indirect reference
      if (this.indirections.includes(referencedElement)) {
        throw new Error('Recursive JSON Pointer detected');
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
