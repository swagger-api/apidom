import stampit from 'stampit';
import { propEq } from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import {
  isPrimitiveElement,
  isStringElement,
  isMemberElement,
  isElement,
  IdentityManager,
  visit,
  find,
  cloneShallow,
  cloneDeep,
  toValue,
  Element,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  ExampleElement,
  LinkElement,
  OperationElement,
  PathItemElement,
  isOperationElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import { Reference as IReference } from '../../../types';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError';
import MaximumResolveDepthError from '../../../errors/MaximumResolveDepthError';
import { AncestorLineage } from '../../util';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// initialize element identity manager
const identityManager = IdentityManager();

/**
 * Predicate for detecting if element was created by merging referencing
 * element with particular element identity with a referenced element.
 */
const wasReferencedBy =
  <T extends Element, U extends Element>(referencingElement: T) =>
  (element: U) =>
    element.meta.hasKey('ref-referencing-element-id') &&
    element.meta
      .get('ref-referencing-element-id')
      .equals(toValue(identityManager.identify(referencingElement)));

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0DereferenceVisitor = stampit({
  props: {
    indirections: [],
    namespace: null,
    reference: null,
    options: null,
    ancestors: null,
    refractCache: null,
  },
  init({
    indirections = [],
    reference,
    namespace,
    options,
    ancestors = new AncestorLineage(),
    refractCache = new Map(),
  }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
  },
  methods: {
    toBaseURI(uri: string): string {
      return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
    },

    async toReference(uri: string): Promise<IReference> {
      // detect maximum depth of resolution
      if (this.reference.depth >= this.options.resolve.maxDepth) {
        throw new MaximumResolveDepthError(
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

    toAncestorLineage(ancestors) {
      /**
       * Compute full ancestors lineage.
       * Ancestors are flatten to unwrap all Element instances.
       */
      const directAncestors = new Set<Element>(ancestors.filter(isElement));
      const ancestorsLineage = new AncestorLineage(...this.ancestors, directAncestors);

      return [ancestorsLineage, directAncestors];
    },

    async ReferenceElement(
      referencingElement: ReferenceElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.includesCycle(referencingElement)) {
        return false;
      }

      const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
      const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
      const isExternalReference = !isInternalReference;

      // ignore resolving internal Reference Objects
      if (!this.options.resolve.internal && isInternalReference) {
        // skip traversing this reference element
        return false;
      }
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isExternalReference) {
        // skip traversing this reference element
        return false;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(referencedElement)) {
        const referencedElementType = toValue(referencingElement.meta.get('referenced-element'));
        const cacheKey = `${referencedElementType}-${toValue(identityManager.identify(referencedElement))}`;

        if (this.refractCache.has(cacheKey)) {
          referencedElement = this.refractCache.get(cacheKey);
        } else if (isReferenceLikeElement(referencedElement)) {
          // handling indirect references
          referencedElement = ReferenceElement.refract(referencedElement);
          referencedElement.setMetaProperty('referenced-element', referencedElementType);
          this.refractCache.set(cacheKey, referencedElement);
        } else {
          // handling direct references
          const ElementClass = this.namespace.getElementClass(referencedElementType);
          referencedElement = ElementClass.refract(referencedElement);
          this.refractCache.set(cacheKey, referencedElement);
        }
      }

      // detect direct or circular reference
      if (this.indirections.includes(referencedElement)) {
        throw new ApiDOMError('Recursive Reference Object detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);

      // dive deep into the fragment
      const visitor = OpenApi3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        ancestors: ancestorsLineage,
        refractCache: this.refractCache,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);

      this.indirections.pop();

      const mergeAndAnnotateReferencedElement = <T extends Element>(refedElement: T): T => {
        const copy = cloneShallow(refedElement);

        // annotate referenced element with info about original referencing element
        copy.setMetaProperty('ref-fields', {
          // @ts-ignore
          $ref: toValue(referencingElement.$ref),
        });
        // annotate fragment with info about origin
        copy.setMetaProperty('ref-origin', reference.uri);
        // annotate fragment with info about referencing element
        copy.setMetaProperty(
          'ref-referencing-element-id',
          cloneDeep(identityManager.identify(referencingElement)),
        );

        return copy;
      };

      // attempting to create cycle
      if (
        ancestorsLineage.includes(referencingElement) ||
        ancestorsLineage.includes(referencedElement)
      ) {
        const replaceWith =
          ancestorsLineage.findItem(wasReferencedBy(referencingElement)) ??
          mergeAndAnnotateReferencedElement(referencedElement);
        if (isMemberElement(parent)) {
          parent.value = replaceWith; // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = replaceWith; // eslint-disable-line no-param-reassign
        }
        return false;
      }

      // transclude referencing element with merged referenced element
      return mergeAndAnnotateReferencedElement(referencedElement);
    },

    async PathItemElement(
      referencingElement: PathItemElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      // ignore PathItemElement without $ref field
      if (!isStringElement(referencingElement.$ref)) {
        return undefined;
      }

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.includesCycle(referencingElement)) {
        return false;
      }

      const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
      const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
      const isExternalReference = !isInternalReference;

      // ignore resolving internal Path Item Objects
      if (!this.options.resolve.internal && isInternalReference) {
        // skip traversing this Path Item element but traverse all it's child elements
        return undefined;
      }
      // ignore resolving external Path Item Objects
      if (!this.options.resolve.external && isExternalReference) {
        // skip traversing this Path Item element but traverse all it's child elements
        return undefined;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic referenced element
      let referencedElement = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a referenced element
      if (isPrimitiveElement(referencedElement)) {
        const cacheKey = `pathItem-${toValue(identityManager.identify(referencedElement))}`;

        if (this.refractCache.has(cacheKey)) {
          referencedElement = this.refractCache.get(cacheKey);
        } else {
          referencedElement = PathItemElement.refract(referencedElement);
          this.refractCache.set(cacheKey, referencedElement);
        }
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

      // append referencing path item to ancestors lineage
      directAncestors.add(referencingElement);

      // dive deep into the referenced element
      const visitor: any = OpenApi3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        ancestors: ancestorsLineage,
        refractCache: this.refractCache,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      // remove referencing path item from ancestors lineage
      directAncestors.delete(referencingElement);

      this.indirections.pop();

      const mergeAndAnnotateReferencedElement = <T extends Element>(
        refedElement: T,
      ): PathItemElement => {
        // merge fields from referenced Path Item with referencing one
        const mergedElement = new PathItemElement(
          [...refedElement.content] as any,
          cloneDeep(referencedElement.meta),
          cloneDeep(referencedElement.attributes),
        );
        // existing keywords from referencing PathItemElement overrides ones from referenced element
        referencingElement.forEach((value: Element, keyElement: Element, item: Element) => {
          mergedElement.remove(toValue(keyElement));
          mergedElement.content.push(item);
        });
        mergedElement.remove('$ref');

        // annotate referenced element with info about original referencing element
        mergedElement.setMetaProperty('ref-fields', {
          $ref: toValue(referencingElement.$ref),
        });
        // annotate referenced element with info about origin
        mergedElement.setMetaProperty('ref-origin', reference.uri);
        // annotate fragment with info about referencing element
        mergedElement.setMetaProperty(
          'ref-referencing-element-id',
          cloneDeep(identityManager.identify(referencingElement)),
        );

        return mergedElement;
      };

      // attempting to create cycle
      if (
        ancestorsLineage.includes(referencingElement) ||
        ancestorsLineage.includes(referencedElement)
      ) {
        const replaceWith =
          ancestorsLineage.findItem(wasReferencedBy(referencingElement)) ??
          mergeAndAnnotateReferencedElement(referencedElement);
        if (isMemberElement(parent)) {
          parent.value = replaceWith; // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = replaceWith; // eslint-disable-line no-param-reassign
        }
        return false;
      }

      // transclude referencing element with merged referenced element
      return mergeAndAnnotateReferencedElement(referencedElement);
    },

    async LinkElement(linkElement: LinkElement) {
      // ignore LinkElement without operationRef or operationId field
      if (!isStringElement(linkElement.operationRef) && !isStringElement(linkElement.operationId)) {
        return undefined;
      }

      // operationRef and operationId fields are mutually exclusive
      if (isStringElement(linkElement.operationRef) && isStringElement(linkElement.operationId)) {
        throw new ApiDOMError(
          'LinkElement operationRef and operationId fields are mutually exclusive.',
        );
      }

      let operationElement: any;

      if (isStringElement(linkElement.operationRef)) {
        // possibly non-semantic referenced element
        const jsonPointer = uriToPointer(toValue(linkElement.operationRef));
        const retrievalURI = this.toBaseURI(toValue(linkElement.operationRef));
        const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
        const isExternalReference = !isInternalReference;

        // ignore resolving internal Operation Object reference
        if (!this.options.resolve.internal && isInternalReference) {
          // skip traversing this Link element but traverse all it's child elements
          return undefined;
        }
        // ignore resolving external Operation Object reference
        if (!this.options.resolve.external && isExternalReference) {
          // skip traversing this Link element but traverse all it's child elements
          return undefined;
        }

        const reference = await this.toReference(toValue(linkElement.operationRef));

        operationElement = evaluate(jsonPointer, reference.value.result);
        // applying semantics to a referenced element
        if (isPrimitiveElement(operationElement)) {
          const cacheKey = `operation-${toValue(identityManager.identify(operationElement))}`;

          if (this.refractCache.has(cacheKey)) {
            operationElement = this.refractCache.get(cacheKey);
          } else {
            operationElement = OperationElement.refract(operationElement);
            this.refractCache.set(cacheKey, operationElement);
          }
        }
        // create shallow clone to be able to annotate with metadata
        operationElement = cloneShallow(operationElement);
        // annotate operation element with info about origin
        operationElement.setMetaProperty('ref-origin', reference.uri);

        const linkElementCopy = cloneShallow(linkElement);
        linkElementCopy.operationRef?.meta.set('operation', operationElement);
        return linkElementCopy;
      }

      if (isStringElement(linkElement.operationId)) {
        const operationId = toValue(linkElement.operationId);
        const reference = await this.toReference(url.unsanitize(this.reference.uri));
        operationElement = find(
          (e) =>
            isOperationElement(e) && isElement(e.operationId) && e.operationId.equals(operationId),
          reference.value.result,
        );
        // OperationElement not found by its operationId
        if (isUndefined(operationElement)) {
          throw new ApiDOMError(`OperationElement(operationId=${operationId}) not found.`);
        }

        const linkElementCopy = cloneShallow(linkElement);
        linkElementCopy.operationId?.meta.set('operation', operationElement);
        return linkElementCopy;
      }

      return undefined;
    },

    async ExampleElement(
      exampleElement: ExampleElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage] = this.toAncestorLineage([...ancestors, parent]);

      // ignore ExampleElement without externalValue field
      if (!isStringElement(exampleElement.externalValue)) {
        return undefined;
      }

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.includesCycle(exampleElement)) {
        return false;
      }

      // value and externalValue fields are mutually exclusive
      if (exampleElement.hasKey('value') && isStringElement(exampleElement.externalValue)) {
        throw new ApiDOMError(
          'ExampleElement value and externalValue fields are mutually exclusive.',
        );
      }

      const retrievalURI = this.toBaseURI(toValue(exampleElement.externalValue));
      const isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
      const isExternalReference = !isInternalReference;

      // ignore resolving external Example Objects
      if (!this.options.resolve.internal && isInternalReference) {
        // skip traversing this Example element but traverse all it's child elements
        return undefined;
      }
      // ignore resolving external Example Objects
      if (!this.options.resolve.external && isExternalReference) {
        // skip traversing this Example element but traverse all it's child elements
        return undefined;
      }

      const reference = await this.toReference(toValue(exampleElement.externalValue));

      // shallow clone of the referenced element
      const valueElement = cloneShallow(reference.value.result);
      // annotate operation element with info about origin
      valueElement.setMetaProperty('ref-origin', reference.uri);

      const exampleElementCopy = cloneShallow(exampleElement);
      exampleElementCopy.value = valueElement;
      return exampleElementCopy;
    },
  },
});

export default OpenApi3_0DereferenceVisitor;
