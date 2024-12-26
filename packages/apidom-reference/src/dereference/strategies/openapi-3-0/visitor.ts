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
  RefElement,
  Namespace,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  getNodeType,
  keyMap,
  ReferenceElement,
  ExampleElement,
  LinkElement,
  OperationElement,
  PathItemElement,
  isReferenceElement,
  isOperationElement,
  isPathItemElement,
  isReferenceLikeElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError.ts';
import MaximumResolveDepthError from '../../../errors/MaximumResolveDepthError.ts';
import * as url from '../../../util/url.ts';
import parse from '../../../parse/index.ts';
import Reference from '../../../Reference.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import { AncestorLineage } from '../../util.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// initialize element identity manager
const identityManager = new IdentityManager();

/**
 * Custom mutation replacer.
 * @public
 */
export const mutationReplacer = (
  newElement: Element,
  oldElement: Element,
  key: string | number,
  parent: Element | undefined,
) => {
  if (isMemberElement(parent)) {
    parent.value = newElement; // eslint-disable-line no-param-reassign
  } else if (Array.isArray(parent)) {
    parent[key] = newElement; // eslint-disable-line no-param-reassign
  }
};

/**
 * @public
 */
export interface OpenAPI3_0DereferenceVisitorOptions {
  readonly namespace: Namespace;
  readonly reference: Reference;
  readonly options: ReferenceOptions;
  readonly indirections?: Element[];
  readonly ancestors?: AncestorLineage<Element>;
  readonly refractCache?: Map<string, Element>;
}

/**
 * @public
 */
class OpenAPI3_0DereferenceVisitor {
  protected readonly indirections: Element[];

  protected readonly namespace: Namespace;

  protected readonly reference: Reference;

  protected readonly options: ReferenceOptions;

  protected readonly ancestors: AncestorLineage<Element>;

  protected readonly refractCache: Map<string, Element>;

  constructor({
    reference,
    namespace,
    options,
    indirections = [],
    ancestors = new AncestorLineage(),
    refractCache = new Map(),
  }: OpenAPI3_0DereferenceVisitorOptions) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
  }

  protected toBaseURI(uri: string): string {
    return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
  }

  protected async toReference(uri: string): Promise<Reference> {
    // detect maximum depth of resolution
    if (this.reference.depth >= this.options.resolve.maxDepth) {
      throw new MaximumResolveDepthError(
        `Maximum resolution depth of ${this.options.resolve.maxDepth} has been exceeded by file "${this.reference.uri}"`,
      );
    }

    const baseURI = this.toBaseURI(uri);
    const { refSet } = this.reference as { refSet: ReferenceSet };

    // we've already processed this Reference in past
    if (refSet.has(baseURI)) {
      return refSet.find(propEq(baseURI, 'uri'))!;
    }

    const parseResult = await parse(url.unsanitize(baseURI), {
      ...this.options,
      parse: { ...this.options.parse, mediaType: 'text/plain' },
    });

    // register new mutable reference with a refSet
    const mutableReference = new Reference({
      uri: baseURI,
      value: cloneDeep(parseResult),
      depth: this.reference.depth + 1,
    });
    refSet.add(mutableReference);

    if (this.options.dereference.immutable) {
      // register new immutable reference with a refSet
      const immutableReference = new Reference({
        uri: `immutable://${baseURI}`,
        value: parseResult,
        depth: this.reference.depth + 1,
      });
      refSet.add(immutableReference);
    }

    return mutableReference;
  }

  protected toAncestorLineage(
    ancestors: (Element | Element[] | undefined)[],
  ): [AncestorLineage<Element>, Set<Element>] {
    /**
     * Compute full ancestors lineage.
     * Ancestors are flatten to unwrap all Element instances.
     */
    const directAncestors = new Set<Element>(ancestors.filter(isElement));
    const ancestorsLineage = new AncestorLineage(...this.ancestors, directAncestors);

    return [ancestorsLineage, directAncestors];
  }

  public async ReferenceElement(
    referencingElement: ReferenceElement,
    key: string | number,
    parent: Element | undefined,
    path: (string | number)[],
    ancestors: [Element | Element[]],
    link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
  ) {
    // skip current referencing element as it's already been access
    if (this.indirections.includes(referencingElement)) {
      return false;
    }

    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

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
    let referencedElement = evaluate(jsonPointer, reference.value.result as Element);
    referencedElement.id = identityManager.identify(referencedElement);

    /**
     * Applying semantics to a referenced element if semantics are missing.
     */
    if (isPrimitiveElement(referencedElement)) {
      const referencedElementType = toValue(referencingElement.meta.get('referenced-element'));
      const cacheKey = `${referencedElementType}-${toValue(identityManager.identify(referencedElement))}`;

      if (this.refractCache.has(cacheKey)) {
        referencedElement = this.refractCache.get(cacheKey)!;
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
    if (referencingElement === referencedElement) {
      throw new ApiDOMError('Recursive Reference Object detected');
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      throw new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        throw new ApiDOMError('Circular reference detected');
      } else if (this.options.dereference.circular === 'replace') {
        const refElement = new RefElement(referencedElement.id, {
          type: 'reference',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref),
        });
        const replacer =
          this.options.dereference.strategyOpts['openapi-3-0']?.circularReplacer ??
          this.options.dereference.circularReplacer;
        const replacement = replacer(refElement);

        link.replaceWith(replacement, mutationReplacer);

        return !parent ? replacement : false;
      }
    }

    /**
     * Dive deep into the fragment.
     *
     * Cases to consider:
     *  1. We're crossing document boundary
     *  2. Fragment is from non-entry document
     *  3. Fragment is a Reference Object. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonEntryDocument = url.stripHash(reference.refSet!.rootRef!.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if (
      (isExternalReference ||
        isNonEntryDocument ||
        isReferenceElement(referencedElement) ||
        shouldDetectCircular) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);

      const visitor = new OpenAPI3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
    }

    this.indirections.pop();

    /**
     * Creating a new version of referenced element to avoid modifying the original one.
     */
    const mergedElement = cloneShallow(referencedElement);
    // assign unique id to merged element
    mergedElement.setMetaProperty('id', identityManager.generateId());
    // annotate referenced element with info about original referencing element
    mergedElement.setMetaProperty('ref-fields', {
      $ref: toValue(referencingElement.$ref),
    });
    // annotate fragment with info about origin
    mergedElement.setMetaProperty('ref-origin', reference.uri);
    // annotate fragment with info about referencing element
    mergedElement.setMetaProperty(
      'ref-referencing-element-id',
      cloneDeep(identityManager.identify(referencingElement)),
    );

    /**
     * Transclude referencing element with merged referenced element.
     */
    link.replaceWith(mergedElement, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? mergedElement : false;
  }

  public async PathItemElement(
    referencingElement: PathItemElement,
    key: string | number,
    parent: Element | undefined,
    path: (string | number)[],
    ancestors: [Element | Element[]],
    link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
  ) {
    // ignore PathItemElement without $ref field
    if (!isStringElement(referencingElement.$ref)) {
      return undefined;
    }

    // skip current referencing element as it's already been access
    if (this.indirections.includes(referencingElement)) {
      return false;
    }

    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

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
    let referencedElement = evaluate(jsonPointer, reference.value.result as Element);
    referencedElement.id = identityManager.identify(referencedElement);

    /**
     * Applying semantics to a referenced element if semantics are missing.
     */
    if (!isPathItemElement(referencedElement)) {
      const cacheKey = `path-item-${toValue(identityManager.identify(referencedElement))}`;

      if (this.refractCache.has(cacheKey)) {
        referencedElement = this.refractCache.get(cacheKey)!;
      } else {
        referencedElement = PathItemElement.refract(referencedElement);
        this.refractCache.set(cacheKey, referencedElement);
      }
    }

    // detect direct or circular reference
    if (referencingElement === referencedElement) {
      throw new ApiDOMError('Recursive Path Item Object reference detected');
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      throw new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        throw new ApiDOMError('Circular reference detected');
      } else if (this.options.dereference.circular === 'replace') {
        const refElement = new RefElement(referencedElement.id, {
          type: 'path-item',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref),
        });
        const replacer =
          this.options.dereference.strategyOpts['openapi-3-0']?.circularReplacer ??
          this.options.dereference.circularReplacer;
        const replacement = replacer(refElement);

        link.replaceWith(replacement, mutationReplacer);

        return !parent ? replacement : undefined;
      }
    }

    /**
     * Dive deep into the fragment.
     *
     * Cases to consider:
     *  1. We're crossing document boundary
     *  2. Fragment is from non-entry document
     *  3. Fragment is a Path Item Object with $ref field. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonEntryDocument = url.stripHash(reference.refSet!.rootRef!.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if (
      (isExternalReference ||
        isNonEntryDocument ||
        (isPathItemElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
        shouldDetectCircular) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);

      const visitor = new OpenAPI3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
    }

    this.indirections.pop();

    /**
     * Creating a new version of Path Item by merging fields from referenced Path Item with referencing one.
     */
    if (isPathItemElement(referencedElement)) {
      const mergedElement = new PathItemElement(
        [...referencedElement.content] as any,
        cloneDeep(referencedElement.meta),
        cloneDeep(referencedElement.attributes),
      );
      // assign unique id to merged element
      mergedElement.setMetaProperty('id', identityManager.generateId());
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

      referencedElement = mergedElement;
    }

    /**
     * Transclude referencing element with merged referenced element.
     */
    link.replaceWith(referencedElement, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? referencedElement : undefined;
  }

  public async LinkElement(
    linkElement: LinkElement,
    key: string | number,
    parent: Element | undefined,
    path: (string | number)[],
    ancestors: [Element | Element[]],
    link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
  ) {
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

    let operationElement: Element | undefined;

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

      operationElement = evaluate(jsonPointer, reference.value.result as Element);
      // applying semantics to a referenced element
      if (isPrimitiveElement(operationElement)) {
        const cacheKey = `operation-${toValue(identityManager.identify(operationElement))}`;

        if (this.refractCache.has(cacheKey)) {
          operationElement = this.refractCache.get(cacheKey)!;
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

      /**
       * Transclude Link Object containing Operation Object in its meta.
       */
      link.replaceWith(linkElementCopy, mutationReplacer);

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? linkElementCopy : undefined;
    }

    if (isStringElement(linkElement.operationId)) {
      const operationId = toValue(linkElement.operationId);
      const reference = await this.toReference(url.unsanitize(this.reference.uri));
      operationElement = find(
        (e) =>
          isOperationElement(e) && isElement(e.operationId) && e.operationId.equals(operationId),
        reference.value.result as Element,
      );
      // OperationElement not found by its operationId
      if (isUndefined(operationElement)) {
        throw new ApiDOMError(`OperationElement(operationId=${operationId}) not found.`);
      }

      const linkElementCopy = cloneShallow(linkElement);
      linkElementCopy.operationId?.meta.set('operation', operationElement);

      /**
       * Transclude Link Object containing Operation Object in its meta.
       */
      link.replaceWith(linkElementCopy, mutationReplacer);

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? linkElementCopy : undefined;
    }

    return undefined;
  }

  public async ExampleElement(
    exampleElement: ExampleElement,
    key: string | number,
    parent: Element | undefined,
    path: (string | number)[],
    ancestors: [Element | Element[]],
    link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
  ) {
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
    const valueElement = cloneShallow(reference.value.result as Element);
    // annotate operation element with info about origin
    valueElement.setMetaProperty('ref-origin', reference.uri);

    const exampleElementCopy = cloneShallow(exampleElement);
    exampleElementCopy.value = valueElement;

    /**
     * Transclude Example Object containing external value.
     */
    link.replaceWith(exampleElementCopy, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? exampleElementCopy : undefined;
  }
}

export default OpenAPI3_0DereferenceVisitor;
