import { propEq, none } from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import {
  isElement,
  isPrimitiveElement,
  isStringElement,
  isMemberElement,
  isObjectElement,
  IdentityManager,
  visit,
  find,
  cloneShallow,
  cloneDeep,
  toValue,
  Element,
  RefElement,
  BooleanElement,
  Namespace,
  MemberElement,
  StringElement,
  ObjectElement,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import {
  evaluate as jsonPointerEvaluate,
  URIFragmentIdentifier,
} from '@swagger-api/apidom-json-pointer/modern';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  PathItemElement,
  LinkElement,
  OperationElement,
  ExampleElement,
  SchemaElement,
  isPathItemElement,
  isReferenceElement,
  isSchemaElement,
  isOperationElement,
  isBooleanJsonSchemaElement,
  OpenApi3_2Element,
} from '@swagger-api/apidom-ns-openapi-3-2';

import { isAnchor, uriToAnchor, evaluate as $anchorEvaluate } from './selectors/$anchor.ts';
import { evaluate as uriEvaluate } from './selectors/uri.ts';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError.ts';
import MaximumResolveDepthError from '../../../errors/MaximumResolveDepthError.ts';
import * as url from '../../../util/url.ts';
import parse from '../../../parse/index.ts';
import Reference from '../../../Reference.ts';
import ReferenceSet from '../../../ReferenceSet.ts';
import File from '../../../File.ts';
import Resolver from '../../../resolve/resolvers/Resolver.ts';
import { resolveSchema$refField, maybeRefractToSchemaElement } from './util.ts';
import { AncestorLineage } from '../../util.ts';
import EvaluationJsonSchemaUriError from '../../../errors/EvaluationJsonSchemaUriError.ts';
import type { ReferenceOptions } from '../../../options/index.ts';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// initialize element identity manager
const identityManager = new IdentityManager();

/**
 * Checks if a URI is absolute (has a scheme).
 * @param uri - The URI to check
 * @returns true if the URI is absolute, false otherwise
 */
const isAbsoluteURI = (uri: string): boolean => {
  try {
    const parsedUrl = new URL(uri);
    // URL constructor succeeds only for absolute URLs
    return !!parsedUrl.protocol;
  } catch {
    // If URL parsing fails, it's a relative URI
    return false;
  }
};

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
export interface OpenAPI3_2DereferenceVisitorOptions {
  readonly namespace: Namespace;
  readonly reference: Reference;
  readonly options: ReferenceOptions;
  readonly indirections?: Element[];
  readonly ancestors?: AncestorLineage<Element>;
  readonly refractCache?: Map<string, Element>;
  readonly allOfDiscriminatorMapping?: Map<string, Element[]>;
  readonly $selfValue?: string;
}

/**
 * @public
 */
class OpenAPI3_2DereferenceVisitor {
  protected readonly indirections: Element[];

  protected readonly namespace: Namespace;

  protected readonly reference: Reference;

  protected readonly options: ReferenceOptions;

  protected readonly ancestors: AncestorLineage<Element>;

  protected readonly refractCache: Map<string, Element>;

  protected readonly allOfDiscriminatorMapping: Map<string, Element[]>;

  protected $selfValue: string | undefined;

  constructor({
    reference,
    namespace,
    options,
    indirections = [],
    ancestors = new AncestorLineage(),
    refractCache = new Map(),
    allOfDiscriminatorMapping = new Map(),
    $selfValue = undefined,
  }: OpenAPI3_2DereferenceVisitorOptions) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
    this.allOfDiscriminatorMapping = allOfDiscriminatorMapping;
    this.$selfValue = $selfValue;
  }

  protected handleDereferenceError(error: unknown, refEl: Element, directAncestors?: Set<Element>) {
    if (this.options.dereference.dereferenceOpts?.continueOnError) {
      if (directAncestors) {
        const ancestorWithRef = [...directAncestors].find(
          (ancestor) =>
            isObjectElement(ancestor) && ancestor.getMetaProperty('ref-referencing-element'),
        );
        if (ancestorWithRef) {
          this.options.dereference.dereferenceOpts?.errors.push({
            error,
            refEl: ancestorWithRef.getMetaProperty('ref-referencing-element'),
          });
        }
      }
      this.options.dereference.dereferenceOpts?.errors.push({ error, refEl });
      return undefined;
    }
    throw error;
  }

  protected getNestedVisitorOptions(referencingElement: ObjectElement): ReferenceOptions {
    return {
      ...this.options,
      resolve: {
        ...this.options.resolve,
        external:
          this.options.dereference?.dereferenceOpts?.skipNestedExternal &&
          toValue(referencingElement.get('$ref')).startsWith('#')
            ? false
            : this.options.resolve.external,
      },
      dereference: {
        ...this.options.dereference,
        dereferenceOpts: {
          ...this.options.dereference?.dereferenceOpts,
          continueOnError: false,
        },
      },
    };
  }

  protected toBaseURI(uri: string): string {
    // Use $self as base URI if present, otherwise fall back to retrieval URI
    let baseUri = this.$selfValue || this.reference.uri;

    // Check if baseUri is hierarchical (can be used for resolving relative URIs)
    // Non-hierarchical URIs like URNs can't be used as base for relative resolution
    if (this.$selfValue) {
      try {
        // Try to create a URL object - this will fail for non-hierarchical URIs
        const testUrl = new URL(this.$selfValue);
        // If successful, check if it has a hierarchical structure (has a hostname or is file://)
        if (!testUrl.hostname && !testUrl.protocol.startsWith('file')) {
          // Non-hierarchical URI (like URN) - fall back to retrieval URI for relative refs
          baseUri = this.reference.uri;
        }
      } catch {
        // URL parsing failed - likely a URN or other non-HTTP(S) URI
        // Fall back to retrieval URI for relative reference resolution
        baseUri = this.reference.uri;
      }
    }

    return url.resolve(baseUri, url.sanitize(url.stripHash(uri)));
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

    // Check if requesting current document (by retrieval URI or $self)
    const isCurrentDocument =
      url.stripHash(uri) === url.stripHash(this.reference.uri) ||
      (this.$selfValue && url.stripHash(baseURI) === url.stripHash(this.$selfValue));

    if (isCurrentDocument) {
      return this.reference;
    }

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

  /**
   * Extract $self value from a Reference's root OpenAPI 3.2 document.
   * Returns the $self value if present and valid, otherwise undefined.
   */
  protected extractSelfFromReference(reference: Reference): string | undefined {
    try {
      // Get the root element from the reference
      const rootElement = reference.value.result;

      // Find the OpenApi3_2Element in the parse result
      let openApiElement: Element | undefined;

      if (rootElement instanceof Element) {
        // Check if root is directly an OpenApi3_2Element
        if (rootElement.element === 'openapi-3-2') {
          openApiElement = rootElement;
        } else {
          // Try to find OpenApi3_2Element in the result (e.g., in ParseResult)
          const found = find(
            (element: Element) => element.element === 'openapi-3-2',
            rootElement,
          );
          if (found) {
            openApiElement = found;
          }
        }
      }

      if (openApiElement && isStringElement((openApiElement as any).$self)) {
        const $self = toValue((openApiElement as any).$self);

        if ($self) {
          // If $self is absolute, use it directly
          if (isAbsoluteURI($self)) {
            return url.sanitize(url.stripHash($self));
          }
          // If $self is relative, resolve it against the reference's URI
          return url.resolve(reference.uri, url.sanitize(url.stripHash($self)));
        }
      }
    } catch {
      // If extraction fails, return undefined to fall back to reference.uri
    }

    return undefined;
  }

  public readonly OpenApi3_2Element = {
    enter: (openApi3_2Element: OpenApi3_2Element) => {
      // Extract $self field if present and use it as base URI for reference resolution
      if (isStringElement(openApi3_2Element.$self)) {
        const $self = toValue(openApi3_2Element.$self);

        if ($self) {
          // If $self is absolute, use it directly
          if (isAbsoluteURI($self)) {
            this.$selfValue = url.sanitize(url.stripHash($self));
          } else {
            // If $self is relative, resolve it against the retrieval URI first
            this.$selfValue = url.resolve(this.reference.uri, url.sanitize(url.stripHash($self)));
          }
        }
      }

      return undefined;
    },
    leave: (
      openApi3_2Element: OpenApi3_2Element,
      key: string | number,
      parent: Element | undefined,
      path: (string | number)[],
      ancestors: [Element | Element[]],
      link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
    ) => {
      if (!this.options.dereference.strategyOpts['openapi-3-2']?.dereferenceDiscriminatorMapping) {
        return undefined;
      }

      const openApi3_2ElementCopy = cloneShallow(openApi3_2Element);
      openApi3_2ElementCopy.setMetaProperty(
        'allOfDiscriminatorMapping',
        Object.fromEntries(this.allOfDiscriminatorMapping),
      );

      link.replaceWith(openApi3_2ElementCopy, mutationReplacer);

      return !parent ? openApi3_2ElementCopy : undefined;
    },
  };

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

    const $refValue = toValue(referencingElement.$ref);
    // Fragment-only references (starting with #) are always internal
    const isFragmentOnly = $refValue.startsWith('#');
    const retrievalURI = this.toBaseURI($refValue);
    const isInternalReference =
      isFragmentOnly ||
      url.stripHash(this.reference.uri) === retrievalURI ||
      (this.$selfValue && url.stripHash(this.$selfValue) === retrievalURI);
    const isExternalReference = !isInternalReference;

    // ignore resolving internal Reference Objects
    if (!this.options.resolve.internal && isInternalReference) {
      // skip traversing this reference element and all it's child elements
      return false;
    }
    // ignore resolving external Reference Objects
    if (!this.options.resolve.external && isExternalReference) {
      // skip traversing this reference element and all it's child elements
      return false;
    }

    let reference: Reference;

    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

    this.indirections.push(referencingElement);

    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);

    let referencedElement;

    try {
      // possibly non-semantic fragment
      referencedElement = jsonPointerEvaluate<Element>(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }
    referencedElement.id = identityManager.identify(referencedElement);

    // applying semantics to a fragment
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

    // detect direct or indirect reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive Reference Object detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }

      if (this.options.dereference.circular === 'replace') {
        const refElement = new RefElement(referencedElement.id, {
          type: 'reference',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref),
        });
        const replacer =
          this.options.dereference.strategyOpts['openapi-3-2']?.circularReplacer ??
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
     *  2. Fragment is from non-root document
     *  3. Fragment is a Reference Object. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonRootDocument = url.stripHash(reference.refSet!.rootRef!.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if (
      (isExternalReference ||
        isNonRootDocument ||
        isReferenceElement(referencedElement) ||
        shouldDetectCircular ||
        this.options.dereference.dereferenceOpts?.continueOnError) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);

      // Extract $self from target document for external references
      const targetSelfValue =
        isExternalReference || isNonRootDocument
          ? this.extractSelfFromReference(reference)
          : this.$selfValue;

      const visitor = new OpenAPI3_2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
        allOfDiscriminatorMapping: this.allOfDiscriminatorMapping,
        $selfValue: targetSelfValue,
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }

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
    // annotate fragment with info about original Reference element
    mergedElement.setMetaProperty('ref-fields', {
      $ref: toValue(referencingElement.$ref),
      // @ts-ignore
      description: toValue(referencingElement.description),
      // @ts-ignore
      summary: toValue(referencingElement.summary),
    });
    // annotate fragment with info about origin (use $self if available)
    const refOriginURI =
      isExternalReference || isNonRootDocument
        ? this.extractSelfFromReference(reference) || reference.uri
        : this.$selfValue || reference.uri;
    mergedElement.setMetaProperty('ref-origin', refOriginURI);
    // annotate fragment with info about referencing element
    mergedElement.setMetaProperty(
      'ref-referencing-element-id',
      cloneDeep(identityManager.identify(referencingElement)),
    );

    if (this.options.dereference.dereferenceOpts?.continueOnError) {
      mergedElement.setMetaProperty('ref-referencing-element', referencingElement);
    }

    // override description and summary (outer has higher priority then inner)
    if (isObjectElement(referencedElement) && isObjectElement(mergedElement)) {
      if (referencingElement.hasKey('description') && 'description' in referencedElement) {
        mergedElement.remove('description');
        mergedElement.set('description', referencingElement.get('description'));
      }
      if (referencingElement.hasKey('summary') && 'summary' in referencedElement) {
        mergedElement.remove('summary');
        mergedElement.set('summary', referencingElement.get('summary'));
      }
    }

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

    const $refValue = toValue(referencingElement.$ref);
    // Fragment-only references (starting with #) are always internal
    const isFragmentOnly = $refValue.startsWith('#');
    const retrievalURI = this.toBaseURI($refValue);
    const isInternalReference =
      isFragmentOnly ||
      url.stripHash(this.reference.uri) === retrievalURI ||
      (this.$selfValue && url.stripHash(this.$selfValue) === retrievalURI);
    const isExternalReference = !isInternalReference;

    // ignore resolving external Path Item Objects
    if (!this.options.resolve.internal && isInternalReference) {
      // skip traversing this Path Item element but traverse all it's child elements
      return undefined;
    }
    // ignore resolving external Path Item Objects
    if (!this.options.resolve.external && isExternalReference) {
      // skip traversing this Path Item element but traverse all it's child elements
      return undefined;
    }

    let reference: Reference;

    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

    this.indirections.push(referencingElement);

    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);

    let referencedElement: Element;

    try {
      // possibly non-semantic referenced element
      referencedElement = jsonPointerEvaluate<Element>(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    referencedElement.id = identityManager.identify(referencedElement);

    /**
     * Applying semantics to a referenced element if semantics are missing.
     */
    if (isPrimitiveElement(referencedElement)) {
      const cacheKey = `path-item-${toValue(identityManager.identify(referencedElement))}`;

      if (this.refractCache.has(cacheKey)) {
        referencedElement = this.refractCache.get(cacheKey)!;
      } else {
        referencedElement = PathItemElement.refract(referencedElement);
        this.refractCache.set(cacheKey, referencedElement);
      }
    }

    // detect direct or indirect reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive Path Item Object reference detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }

      if (this.options.dereference.circular === 'replace') {
        const refElement = new RefElement(referencedElement.id, {
          type: 'path-item',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref),
        });
        const replacer =
          this.options.dereference.strategyOpts['openapi-3-2']?.circularReplacer ??
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
     *  2. Fragment is from non-root document
     *  3. Fragment is a Path Item Object with $ref field. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonRootDocument = url.stripHash(reference.refSet!.rootRef!.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if (
      (isExternalReference ||
        isNonRootDocument ||
        (isPathItemElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
        shouldDetectCircular ||
        this.options.dereference.dereferenceOpts?.continueOnError) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);

      // Extract $self from target document for external references
      const targetSelfValue =
        isExternalReference || isNonRootDocument
          ? this.extractSelfFromReference(reference)
          : this.$selfValue;

      const visitor = new OpenAPI3_2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
        allOfDiscriminatorMapping: this.allOfDiscriminatorMapping,
        $selfValue: targetSelfValue,
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }

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
      // annotate referenced element with info about origin (use $self if available)
      const refOriginURI =
        isExternalReference || isNonRootDocument
          ? this.extractSelfFromReference(reference) || reference.uri
          : this.$selfValue || reference.uri;
      mergedElement.setMetaProperty('ref-origin', refOriginURI);
      // annotate fragment with info about referencing element
      mergedElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

      if (this.options.dereference.dereferenceOpts?.continueOnError) {
        mergedElement.setMetaProperty('ref-referencing-element', referencingElement);
      }

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
      const error = new ApiDOMError(
        'LinkElement operationRef and operationId fields are mutually exclusive.',
      );
      return this.handleDereferenceError(error, linkElement);
    }

    let operationElement: Element | undefined;

    if (isStringElement(linkElement.operationRef)) {
      // possibly non-semantic referenced element
      const operationRefValue = toValue(linkElement.operationRef);
      const jsonPointer = URIFragmentIdentifier.fromURIReference(operationRefValue);
      // Fragment-only references (starting with #) are always internal
      const isFragmentOnly = operationRefValue.startsWith('#');
      const retrievalURI = this.toBaseURI(operationRefValue);
      const isInternalReference =
        isFragmentOnly ||
        url.stripHash(this.reference.uri) === retrievalURI ||
        (this.$selfValue && url.stripHash(this.$selfValue) === retrievalURI);
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

      let reference: Reference;

      try {
        reference = await this.toReference(toValue(linkElement.operationRef));
        operationElement = jsonPointerEvaluate<OperationElement>(
          reference.value.result,
          jsonPointer,
        );
      } catch (error) {
        return this.handleDereferenceError(error, linkElement);
      }

      // Ensure operationElement was resolved
      if (!operationElement) {
        const error = new ApiDOMError('OperationElement could not be resolved.');
        return this.handleDereferenceError(error, linkElement);
      }

      // applying semantics to a referenced element
      let resolvedOperationElement: Element = operationElement;
      if (isPrimitiveElement(resolvedOperationElement)) {
        const cacheKey = `operation-${toValue(identityManager.identify(resolvedOperationElement))}`;

        if (this.refractCache.has(cacheKey)) {
          resolvedOperationElement = this.refractCache.get(cacheKey)!;
        } else {
          resolvedOperationElement = OperationElement.refract(resolvedOperationElement);
          this.refractCache.set(cacheKey, resolvedOperationElement);
        }
      }
      // create shallow clone to be able to annotate with metadata
      resolvedOperationElement = cloneShallow(resolvedOperationElement);
      // annotate operation element with info about origin (use $self if available)
      const refOriginURI =
        isExternalReference
          ? this.extractSelfFromReference(reference) || reference.uri
          : this.$selfValue || reference.uri;
      resolvedOperationElement.setMetaProperty('ref-origin', refOriginURI);

      const linkElementCopy = cloneShallow(linkElement);
      linkElementCopy.operationRef?.meta.set('operation', resolvedOperationElement);

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
      let reference: Reference;

      try {
        reference = await this.toReference(url.unsanitize(this.reference.uri));
      } catch (error) {
        return this.handleDereferenceError(error, linkElement);
      }

      operationElement = find(
        (e) =>
          isOperationElement(e) && isElement(e.operationId) && e.operationId.equals(operationId),
        reference.value.result as Element,
      );
      // OperationElement not found by its operationId
      if (isUndefined(operationElement)) {
        const error = new ApiDOMError(`OperationElement(operationId=${operationId}) not found.`);
        return this.handleDereferenceError(error, linkElement);
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
      const error = new ApiDOMError(
        'ExampleElement value and externalValue fields are mutually exclusive.',
      );
      return this.handleDereferenceError(error, exampleElement);
    }

    const externalValueRef = toValue(exampleElement.externalValue);
    // Fragment-only references (starting with #) are always internal
    const isFragmentOnly = externalValueRef.startsWith('#');
    const retrievalURI = this.toBaseURI(externalValueRef);
    const isInternalReference =
      isFragmentOnly ||
      url.stripHash(this.reference.uri) === retrievalURI ||
      (this.$selfValue && url.stripHash(this.$selfValue) === retrievalURI);
    const isExternalReference = !isInternalReference;

    // ignore resolving internal Example Objects
    if (!this.options.resolve.internal && isInternalReference) {
      // skip traversing this Example element but traverse all it's child elements
      return undefined;
    }
    // ignore resolving external Example Objects
    if (!this.options.resolve.external && isExternalReference) {
      // skip traversing this Example element but traverse all it's child elements
      return undefined;
    }

    let reference: Reference;

    try {
      reference = await this.toReference(toValue(exampleElement.externalValue));
    } catch (error) {
      return this.handleDereferenceError(error, exampleElement);
    }

    // shallow clone of the referenced element
    const valueElement = cloneShallow(reference.value.result as Element);
    // annotate operation element with info about origin (use $self if available)
    const refOriginURI =
      isExternalReference
        ? this.extractSelfFromReference(reference) || reference.uri
        : this.$selfValue || reference.uri;
    valueElement.setMetaProperty('ref-origin', refOriginURI);

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

  public async MemberElement(
    memberElement: MemberElement,
    key: string | number,
    parent: Element | undefined,
    path: (string | number)[],
    ancestors: [Element | Element[]],
    link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
  ) {
    const parentElement = ancestors[ancestors.length - 1];

    // skip current MemberElement if its parent is not a DiscriminatorElement
    if (
      !isObjectElement(parentElement) ||
      !parentElement.classes.contains('discriminator-mapping')
    ) {
      return undefined;
    }

    // skip current MemberElement if discriminator mapping dereferencing option is not enabled
    if (!this.options.dereference.strategyOpts['openapi-3-2']?.dereferenceDiscriminatorMapping) {
      return false;
    }

    // skip current MemberElement if its key or value is not a StringElement
    if (!isStringElement(memberElement.key) || !isStringElement(memberElement.value)) {
      return false;
    }

    // skip current referencing MemberElement as it's already been accessed
    if (this.indirections.includes(memberElement)) {
      return false;
    }

    this.indirections.push(memberElement);

    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);
    const parentSchemaElement = [...directAncestors].findLast(isSchemaElement);
    const ancestorsSchemaIdentifiers = cloneDeep(
      parentSchemaElement!.getMetaProperty('ancestorsSchemaIdentifiers'),
    );

    // get the reference from the MemberElement value
    const memberElementValue = toValue(memberElement.value);
    const namePattern = /^[a-zA-Z0-9\\.\\-_]+$/;
    const memberElementRef = namePattern.test(memberElementValue)
      ? `#/components/schemas/${memberElementValue}`
      : memberElementValue;

    // create SchemaElement with the reference from the MemberElement value
    const schemaElement = new SchemaElement({
      $ref: memberElementRef,
    });
    schemaElement.setMetaProperty('ancestorsSchemaIdentifiers', ancestorsSchemaIdentifiers);

    // append referencing reference to ancestors lineage
    directAncestors.add(schemaElement);

    // For MemberElement (discriminator mapping), we stay in the same document context
    // so we keep using the current $selfValue
    const visitor = new OpenAPI3_2DereferenceVisitor({
      reference: this.reference,
      namespace: this.namespace,
      indirections: [...this.indirections],
      options: this.getNestedVisitorOptions(schemaElement),
      refractCache: this.refractCache,
      ancestors: ancestorsLineage,
      allOfDiscriminatorMapping: this.allOfDiscriminatorMapping,
      $selfValue: this.$selfValue,
    });

    let referencedElement: Element;

    try {
      referencedElement = await visitAsync(schemaElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });
    } catch (error) {
      return this.handleDereferenceError(error, schemaElement, directAncestors);
    }

    // remove referencing reference from ancestors lineage
    directAncestors.delete(schemaElement);
    this.indirections.pop();

    // annotate MemberElement with referenced schema
    const memberElementCopy: MemberElement = cloneShallow(memberElement);
    (memberElementCopy.value as StringElement).setMetaProperty('ref-schema', referencedElement);

    /**
     * Transclude MemberElement containing referenced schema in its meta.
     */
    link.replaceWith(memberElementCopy, mutationReplacer);

    /**
     * We're at the root of the tree, so we're just replacing the entire tree.
     */
    return !parent ? memberElementCopy : undefined;
  }

  public async SchemaElement(
    referencingElement: SchemaElement,
    key: string | number,
    parent: Element | undefined,
    path: (string | number)[],
    ancestors: [Element | Element[]],
    link: { replaceWith: (element: Element, replacer: typeof mutationReplacer) => void },
  ) {
    // skip current referencing schema as $ref keyword was not defined
    if (!isStringElement(referencingElement.$ref)) {
      return undefined;
    }

    // skip current referencing element as it's already been access
    if (this.indirections.includes(referencingElement)) {
      return false;
    }

    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

    // compute baseURI using rules around $id and $ref keywords
    let reference: Reference;

    try {
      reference = await this.toReference(url.unsanitize(this.reference.uri));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    let { uri: retrievalURI } = reference;
    const $refBaseURI = resolveSchema$refField(retrievalURI, referencingElement)!;
    const $refBaseURIStrippedHash = url.stripHash($refBaseURI);
    const file = new File({ uri: $refBaseURIStrippedHash });
    const isUnknownURI = none((r: Resolver) => r.canRead(file), this.options.resolve.resolvers);
    const isURL = !isUnknownURI;
    let isInternalReference = url.stripHash(this.reference.uri) === $refBaseURI;
    let isExternalReference = !isInternalReference;

    this.indirections.push(referencingElement);

    // determining reference, proper evaluation and selection mechanism
    let referencedElement: Element;

    try {
      if (isUnknownURI || isURL) {
        // we're dealing with canonical URI or URL with possible fragment
        retrievalURI = this.toBaseURI($refBaseURI);
        const selector = $refBaseURI;
        const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result as Element);
        referencedElement = uriEvaluate(selector, referenceAsSchema)!;
        referencedElement = maybeRefractToSchemaElement(referencedElement);
        referencedElement.id = identityManager.identify(referencedElement);

        // ignore resolving internal Schema Objects
        if (!this.options.resolve.internal && isInternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }
        // ignore resolving external Schema Objects
        if (!this.options.resolve.external && isExternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }
      } else {
        // we're assuming here that we're dealing with JSON Pointer here
        retrievalURI = this.toBaseURI($refBaseURI);
        isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
        isExternalReference = !isInternalReference;

        // ignore resolving internal Schema Objects
        if (!this.options.resolve.internal && isInternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }
        // ignore resolving external Schema Objects
        if (!this.options.resolve.external && isExternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }

        reference = await this.toReference(url.unsanitize($refBaseURI));
        const selector = URIFragmentIdentifier.fromURIReference($refBaseURI);
        const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result as Element);
        referencedElement = jsonPointerEvaluate(referenceAsSchema, selector);
        referencedElement = maybeRefractToSchemaElement(referencedElement);
        referencedElement.id = identityManager.identify(referencedElement);
      }
    } catch (error) {
      /**
       * No SchemaElement($id=URL) was not found, so we're going to try to resolve
       * the URL and assume the returned response is a JSON Schema.
       */
      if (isURL && error instanceof EvaluationJsonSchemaUriError) {
        if (isAnchor(uriToAnchor($refBaseURI))) {
          // we're dealing with JSON Schema $anchor here
          isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
          isExternalReference = !isInternalReference;

          // ignore resolving internal Schema Objects
          if (!this.options.resolve.internal && isInternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }
          // ignore resolving external Schema Objects
          if (!this.options.resolve.external && isExternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }

          try {
            reference = await this.toReference(url.unsanitize($refBaseURI));
          } catch (toReferenceError) {
            this.indirections.pop();
            return this.handleDereferenceError(
              toReferenceError,
              referencingElement,
              directAncestors,
            );
          }

          const selector = uriToAnchor($refBaseURI);
          const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result as Element);

          try {
            referencedElement = $anchorEvaluate(selector, referenceAsSchema)!;
          } catch (evaluateError) {
            this.indirections.pop();
            return this.handleDereferenceError(evaluateError, referencingElement, directAncestors);
          }

          referencedElement = maybeRefractToSchemaElement(referencedElement);
          referencedElement.id = identityManager.identify(referencedElement);
        } else {
          // we're assuming here that we're dealing with JSON Pointer here
          retrievalURI = this.toBaseURI($refBaseURI);
          isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
          isExternalReference = !isInternalReference;

          // ignore resolving internal Schema Objects
          if (!this.options.resolve.internal && isInternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }
          // ignore resolving external Schema Objects
          if (!this.options.resolve.external && isExternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }

          try {
            reference = await this.toReference(url.unsanitize($refBaseURI));
          } catch (toReferenceError) {
            this.indirections.pop();
            return this.handleDereferenceError(
              toReferenceError,
              referencingElement,
              directAncestors,
            );
          }

          const selector = URIFragmentIdentifier.fromURIReference($refBaseURI);
          const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result as Element);

          try {
            referencedElement = jsonPointerEvaluate(referenceAsSchema, selector);
          } catch (evaluateError) {
            this.indirections.pop();
            return this.handleDereferenceError(evaluateError, referencingElement, directAncestors);
          }

          referencedElement = maybeRefractToSchemaElement(referencedElement);
          referencedElement.id = identityManager.identify(referencedElement);
        }
      } else {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }
    }

    // detect direct or indirect reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive Schema Object reference detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, directAncestors);
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }

      if (this.options.dereference.circular === 'replace') {
        const refElement = new RefElement(referencedElement.id, {
          type: 'json-schema',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref),
        });
        const replacer =
          this.options.dereference.strategyOpts['openapi-3-2']?.circularReplacer ??
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
     *  2. Fragment is from non-root document
     *  3. Fragment is a Schema Object with $ref field. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonRootDocument = url.stripHash(reference.refSet!.rootRef!.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if (
      (isExternalReference ||
        isNonRootDocument ||
        (isSchemaElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
        shouldDetectCircular ||
        this.options.dereference.dereferenceOpts?.continueOnError) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);

      // Extract $self from target document for external references
      const targetSelfValue =
        isExternalReference || isNonRootDocument
          ? this.extractSelfFromReference(reference)
          : this.$selfValue;

      const visitor = new OpenAPI3_2DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
        allOfDiscriminatorMapping: this.allOfDiscriminatorMapping,
        $selfValue: targetSelfValue,
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, directAncestors);
      }

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
    }

    this.indirections.pop();

    // Boolean JSON Schemas
    if (isBooleanJsonSchemaElement(referencedElement as unknown)) {
      const booleanJsonSchemaElement: BooleanElement = cloneDeep(referencedElement);
      // assign unique id to merged element
      booleanJsonSchemaElement.setMetaProperty('id', identityManager.generateId());
      // annotate referenced element with info about original referencing element
      booleanJsonSchemaElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
        $refBaseURI,
      });
      // annotate referenced element with info about origin (use $self if available)
      const refOriginURI =
        isExternalReference
          ? this.extractSelfFromReference(reference) || reference.uri
          : this.$selfValue || reference.uri;
      booleanJsonSchemaElement.setMetaProperty('ref-origin', refOriginURI);
      // annotate fragment with info about referencing element
      booleanJsonSchemaElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

      link.replaceWith(booleanJsonSchemaElement, mutationReplacer);

      return !parent ? booleanJsonSchemaElement : false;
    }

    /**
     * Creating a new version of Schema Object by merging fields from referenced Schema Object with referencing one.
     */
    if (isSchemaElement(referencedElement)) {
      const mergedElement = new SchemaElement(
        [...referencedElement.content] as any,
        cloneDeep(referencedElement.meta),
        cloneDeep(referencedElement.attributes),
      );
      // assign unique id to merged element
      mergedElement.setMetaProperty('id', identityManager.generateId());
      // existing keywords from referencing schema overrides ones from referenced schema
      referencingElement.forEach((value: Element, keyElement: Element, item: Element) => {
        mergedElement.remove(toValue(keyElement));
        mergedElement.content.push(item);
      });
      mergedElement.remove('$ref');
      // annotate referenced element with info about original referencing element
      mergedElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
        $refBaseURI,
      });
      // annotate fragment with info about origin (use $self if available)
      const refOriginURI =
        isExternalReference
          ? this.extractSelfFromReference(reference) || reference.uri
          : this.$selfValue || reference.uri;
      mergedElement.setMetaProperty('ref-origin', refOriginURI);
      // annotate fragment with info about referencing element
      mergedElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

      if (this.options.dereference.dereferenceOpts?.continueOnError) {
        mergedElement.setMetaProperty('ref-referencing-element', referencingElement);
      }

      // creating mapping for allOf discriminator
      if (this.options.dereference.strategyOpts['openapi-3-2']?.dereferenceDiscriminatorMapping) {
        const parentElement = ancestors[ancestors.length - 1];
        const parentSchemaElement = [...directAncestors].findLast(isSchemaElement);
        const parentSchemaElementName = parentSchemaElement?.getMetaProperty('schemaName');
        const mergedElementName = toValue(mergedElement.getMetaProperty('schemaName'));

        if (
          mergedElementName &&
          parentSchemaElementName &&
          // @ts-ignore
          parentElement?.classes?.contains('json-schema-allOf')
        ) {
          const currentMapping = this.allOfDiscriminatorMapping.get(mergedElementName) ?? [];
          currentMapping.push(parentSchemaElement!);
          this.allOfDiscriminatorMapping.set(mergedElementName, currentMapping);
        }
      }

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
}

export default OpenAPI3_2DereferenceVisitor;
