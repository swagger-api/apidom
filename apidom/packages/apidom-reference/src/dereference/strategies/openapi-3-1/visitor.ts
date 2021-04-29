import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq, reduceRight } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { isPrimitiveElement, isStringElement, visit, Element } from 'apidom';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  SchemaElement,
  isReferenceElementExternal,
  isSchemaElementExternal,
} from 'apidom-ns-openapi-3-1';

import { isAnchor, uriToAnchor, evaluate as $anchorEvaluate } from './selectors/$anchor';
import { Reference as IReference } from '../../../types';
import { evaluate as jsonPointerEvaluate, uriToPointer } from '../../../selectors/json-pointer';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

/**
 * Cached version of SchemaElement.refract.
 */
const refractToSchemaElement = <T extends Element>(element: T) => {
  if (refractToSchemaElement.cache.has(element)) {
    return refractToSchemaElement.cache.get(element);
  }

  const refracted = SchemaElement.refract(element);
  refractToSchemaElement.cache.set(element, refracted);
  return refracted;
};
refractToSchemaElement.cache = new WeakMap();

/**
 * Folding of inherited$id list from right to left using
 * URL resolving mechanism.
 */
const resolveInherited$id = (schemaElement: SchemaElement) =>
  reduceRight(
    ($id: string, acc: string): string => {
      const uriWithoutHash = url.stripHash($id);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;

      return url.resolve(sanitizedURI, acc);
    },
    schemaElement.$ref?.toValue(),
    schemaElement.meta.get('inherited$id').toValue(),
  );

const OpenApi3_1DereferenceVisitor = stampit({
  props: {
    indirections: null,
    visited: null,
    namespace: null,
    reference: null,
    options: null,
  },
  init({ indirections = [], visited = new WeakSet(), reference, namespace, options }) {
    this.indirections = indirections;
    this.visited = visited;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
  },
  methods: {
    async toReference(uri: string): Promise<IReference> {
      // detect maximum depth of resolution
      if (this.reference.depth >= this.options.resolve.maxDepth) {
        throw new MaximumResolverDepthError(
          `Maximum resolution depth of ${this.options.resolve.maxDepth} has been exceeded by file "${this.reference.uri}"`,
        );
      }

      const uriWithoutHash = url.stripHash(uri);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;
      const baseURI = url.resolve(this.reference.uri, sanitizedURI);
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

    async ReferenceElement(referenceElement: ReferenceElement) {
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referenceElement)) {
        return false;
      }

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

      // detect direct or indirect reference
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
      const visitor: any = OpenApi3_1DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
      });
      fragment = await visitAsync(fragment, visitor, { keyMap, nodeTypeGetter: getNodeType });

      fragment = fragment.clone();

      // annotate fragment with info about original Reference element
      fragment.setMetaProperty('ref-fields', {
        $ref: referenceElement.$ref.toValue(),
        // @ts-ignore
        description: referenceElement.description?.toValue(),
        // @ts-ignore
        summary: referenceElement.summary?.toValue(),
      });

      // override description and summary (outer has higher priority then inner)
      const hasDescription = pathSatisfies(isNotUndefined, ['description'], referenceElement);
      const hasSummary = pathSatisfies(isNotUndefined, ['summary'], referenceElement);
      if (hasDescription && hasIn('description', fragment)) {
        // @ts-ignore
        fragment.description = referenceElement.description;
      }
      if (hasSummary && hasIn('summary', fragment)) {
        // @ts-ignore
        fragment.summary = referenceElement.summary;
      }

      this.indirections.pop();

      // transclude the element for a fragment
      return fragment;
    },

    async SchemaElement(referencingElement: SchemaElement) {
      /**
       * Skip traversal for already visited schemas and all their child schemas.
       * visit function detects cycles in path automatically.
       */
      if (this.visited.has(referencingElement)) {
        return false;
      }
      // skip current referencing schema as $ref keyword was not defined
      if (!isStringElement(referencingElement.$ref)) {
        // mark current referencing schema as visited
        this.visited.add(referencingElement);
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isSchemaElementExternal('$ref', referencingElement)) {
        // mark current referencing schema as visited
        this.visited.add(referencingElement);
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      // compute Reference object using rules around $id and $ref keywords
      const uri = resolveInherited$id(referencingElement);
      const reference = await this.toReference(uri);

      this.indirections.push(referencingElement);

      // determining proper evaluation and selection mechanism
      const $refValue = referencingElement.$ref?.toValue();
      let evaluate: any;
      let selector: string;
      if (isAnchor(uriToAnchor($refValue))) {
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
      const visitor: any = OpenApi3_1DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        visited: this.visited,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      this.indirections.pop();

      // merge keywords from referenced schema with referencing schema
      const mergedResult = new SchemaElement(
        // @ts-ignore
        [...referencedElement.content],
        referencedElement.meta.clone(),
        referencedElement.attributes.clone(),
      );
      // existing keywords from referencing schema overrides ones from referenced schema
      referencingElement.forEach((value: Element, key: Element, item: Element) => {
        mergedResult.remove(key.toValue());
        mergedResult.content.push(item);
      });
      mergedResult.remove('$ref');

      // annotate referencing element with info about original referenced element
      mergedResult.setMetaProperty('ref-fields', {
        $ref: referencingElement.$ref?.toValue(),
      });

      // transclude referencing element with merged referenced element
      return mergedResult;
    },
  },
});

export default OpenApi3_1DereferenceVisitor;
