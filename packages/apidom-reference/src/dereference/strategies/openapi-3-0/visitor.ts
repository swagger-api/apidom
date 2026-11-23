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
  ObjectElement,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, URIFragmentIdentifier } from '@swagger-api/apidom-json-pointer/modern';
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
  OpenApi3_0Element,
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
 * Input of the `strategyOpts['openapi-3-0'].fragmentTransformer` option.
 * @public
 */
export interface FragmentTransformerInput {
  /** The referenced fragment, as found in its document (generic or semantic ApiDOM). */
  readonly fragment: Element;
  /** The root element of the document that contains the fragment. */
  readonly document: Element;
  /** The resolved URI of the reference, including its fragment. */
  readonly uri: string;
  /** The OpenAPI 3.0 element type the fragment is referenced as (e.g. `schema`, `parameter`, `pathItem`). */
  readonly referencedElementType: string;
}

/**
 * Transforms a referenced fragment before it is refracted and transcluded.
 * Returning a generic element lets the dereference refract it as `referencedElementType`.
 * @public
 */
export type FragmentTransformer = (input: FragmentTransformerInput) => Element | Promise<Element>;

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
  readonly errorContext?: Element[];
  readonly errorPropagationCache?: Map<Element, unknown[]>;
  readonly pendingPropagations?: Array<{ referencingElement: Element; referencedElement: Element }>;
  readonly skippedReferences?: Set<Element>;
  readonly skipsExternalLocally?: boolean;
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

  protected readonly errorContext: Element[];

  protected readonly errorPropagationCache: Map<Element, unknown[]> = new Map();

  protected readonly pendingPropagations: Array<{
    referencingElement: Element;
    referencedElement: Element;
  }> = [];

  /**
   * Reference and Path Item elements a visitor deliberately left unresolved (because of
   * `resolve.internal` / `resolve.external`). Shared with nested visitors so a visitor with a
   * different base URI never re-resolves them, e.g. when an inlined Path Item is traversed again.
   */
  protected readonly skippedReferences: Set<Element>;

  /**
   * Whether external resolution is disabled only for this nested visit (`skipNestedExternal`).
   */
  protected readonly skipsExternalLocally: boolean;

  constructor({
    reference,
    namespace,
    options,
    indirections = [],
    ancestors = new AncestorLineage(),
    refractCache = new Map(),
    errorContext = [],
    errorPropagationCache = new Map(),
    pendingPropagations = [],
    skippedReferences = new Set(),
    skipsExternalLocally = false,
  }: OpenAPI3_0DereferenceVisitorOptions) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
    this.errorContext = errorContext;
    this.errorPropagationCache = errorPropagationCache;
    this.pendingPropagations = pendingPropagations;
    this.skippedReferences = skippedReferences;
    this.skipsExternalLocally = skipsExternalLocally;
  }

  /**
   * Records a reference this visitor leaves unresolved, and, outside the entry document, the
   * document it is written in (`ref-origin`), which inlining would otherwise lose. An external
   * reference skipped only because of `skipNestedExternal` is not recorded: the visit of its own
   * position may resolve it.
   */
  protected markSkipped(element: Element, isExternalReference: boolean): void {
    if (isExternalReference && this.skipsExternalLocally) return;
    this.skippedReferences.add(element);
    if (this.reference !== this.reference.refSet?.rootRef && !element.meta.hasKey('ref-origin')) {
      element.setMetaProperty('ref-origin', this.reference.uri);
    }
  }

  /**
   * Whether the nested visit of a referenced fragment has external resolution disabled only
   * because of `skipNestedExternal`.
   */
  protected nestedSkipsExternalLocally(referencingElement: ObjectElement): boolean {
    return (
      this.skipsExternalLocally ||
      (this.options.resolve.external &&
        !this.getNestedVisitorOptions(referencingElement).resolve.external)
    );
  }

  /**
   * Whether a reference into the document being traversed is followed although external
   * resolution is disabled: `skipNestedExternal` only skips other documents, also when
   * `internalScope: 'entry'` classifies the reference as external.
   */
  protected followsWithinDocument(retrievalURI: string): boolean {
    return this.skipsExternalLocally && url.stripHash(this.reference.uri) === retrievalURI;
  }

  protected popErrorContext(el: Element) {
    if (this.errorContext[this.errorContext.length - 1] === el) {
      this.errorContext.pop();
    } else {
      for (let i = this.errorContext.length - 1; i >= 0; i -= 1) {
        if (this.errorContext[i] === el) {
          this.errorContext.splice(i, 1);
          break;
        }
      }
    }
  }

  protected runPropagationPass(): boolean {
    let anyPropagated = false;

    this.pendingPropagations.forEach(({ referencingElement, referencedElement }) => {
      const errorsToPropagate = this.errorPropagationCache.get(referencedElement);

      if (Array.isArray(errorsToPropagate) && errorsToPropagate.length > 0) {
        errorsToPropagate.forEach((error) => {
          const existing = this.errorPropagationCache.get(referencingElement);

          if (!existing?.includes(error)) {
            this.options.dereference.dereferenceOpts?.errors.push({
              error,
              refEl: referencingElement,
            });

            if (existing) {
              existing.push(error);
            } else {
              this.errorPropagationCache.set(referencingElement, [error]);
            }

            anyPropagated = true;
          }
        });
      }
    });

    return anyPropagated;
  }

  protected propagateErrors(): void {
    while (this.runPropagationPass()) {
      // repeat until no new errors are propagated (handles transitive chains)
    }
    this.pendingPropagations.length = 0;
  }

  protected handleDereferenceError(
    error: unknown,
    refEl: Element,
    opts?: { directAncestors?: Set<Element>; isExternalReference?: boolean },
  ) {
    if (this.options.dereference.dereferenceOpts?.continueOnError) {
      const { directAncestors, isExternalReference = false } = opts ?? {};
      const skipNestedExternal =
        this.options.dereference.dereferenceOpts?.skipNestedExternal ?? false;
      const skipPropagation = isExternalReference && skipNestedExternal;

      if (directAncestors && !skipPropagation) {
        for (const ancestor of directAncestors) {
          const existing = this.errorPropagationCache.get(ancestor);
          if (existing) {
            existing.push(error);
          } else {
            this.errorPropagationCache.set(ancestor, [error]);
          }
        }
      }

      this.options.dereference.dereferenceOpts?.errors.push({ error, refEl });

      if (!skipPropagation) {
        const affected = new Set<Element>(this.errorContext);
        affected.delete(refEl);

        this.popErrorContext(refEl);

        for (const el of affected) {
          this.options.dereference.dereferenceOpts?.errors.push({ error, refEl: el });
        }
      }

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

  /**
   * Records a Link or Example left unresolved, only with `internalScope: 'entry'`, where an
   * inlined Path Item would otherwise have it resolved again against the entry document.
   */
  protected markSkippedInEntryScope(element: Element, isExternalReference: boolean): void {
    if (this.options.dereference.strategyOpts['openapi-3-0']?.internalScope !== 'entry') return;
    this.markSkipped(element, isExternalReference);
  }

  protected toBaseURI(uri: string): string {
    return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
  }

  /**
   * The resolved URI of a `$ref`: its retrieval URI followed by the `$ref`'s fragment, if any.
   */
  protected toReferenceURI(retrievalURI: string, $ref: string): string {
    const hashIndex = $ref.indexOf('#');
    return hashIndex === -1 ? retrievalURI : `${retrievalURI}${$ref.slice(hashIndex)}`;
  }

  /**
   * Determines whether a retrieval URI is internal for the purpose of the
   * `resolve.internal` and `resolve.external` options.
   *
   * By default (`internalScope: 'document'`) a reference is internal when it points into
   * the document currently being traversed. With `internalScope: 'entry'` only references
   * pointing into the entry document are internal, so references internal to external
   * documents are treated as external.
   */
  protected isInternalRetrievalURI(retrievalURI: string): boolean {
    const internalScope = this.options.dereference.strategyOpts['openapi-3-0']?.internalScope;
    const entryURI = this.reference.refSet?.rootRef?.uri;

    if (internalScope === 'entry' && typeof entryURI === 'string') {
      return url.stripHash(entryURI) === retrievalURI;
    }

    return url.stripHash(this.reference.uri) === retrievalURI;
  }

  /**
   * Applies the optional `strategyOpts['openapi-3-0'].fragmentTransformer` to a referenced fragment.
   * The result is cached per referenced URI and element type, so every fragment is transformed
   * once, and repeated (including circular) references resolve to the same transformed element.
   */
  protected async transformFragment(
    fragment: Element,
    reference: Reference,
    uri: string,
    referencedElementType: string,
  ): Promise<Element> {
    const fragmentTransformer: FragmentTransformer | undefined =
      this.options.dereference.strategyOpts['openapi-3-0']?.fragmentTransformer;

    if (typeof fragmentTransformer !== 'function') {
      return fragment;
    }

    // keyed by URI: the element at a URI is replaced once the references inside it are resolved
    const cacheKey = `fragment-transformer-${referencedElementType}-${uri}`;

    if (this.refractCache.has(cacheKey)) {
      return this.refractCache.get(cacheKey)!;
    }

    const transformed = await fragmentTransformer({
      fragment,
      document: reference.value.result as Element,
      uri,
      referencedElementType,
    });
    // a copy of the fragment carries its identity, which the caches keyed by identity would mix up
    if (
      transformed !== fragment &&
      transformed.meta.hasKey('id') &&
      toValue(transformed.id) === toValue(fragment.id)
    ) {
      transformed.setMetaProperty('id', identityManager.generateId());
    }
    transformed.id = identityManager.identify(transformed);
    this.refractCache.set(cacheKey, transformed);

    return transformed;
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

  public readonly OpenApi3_0Element = {
    leave: (
      openApi3_0Element: OpenApi3_0Element,
      key: string | number,
      parent: Element | undefined,
    ) => {
      if (!this.options.dereference.dereferenceOpts?.continueOnError) {
        return undefined;
      }

      this.propagateErrors();

      return !parent ? openApi3_0Element : undefined;
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

    // skip referencing element another visitor deliberately left unresolved
    if (this.skippedReferences.has(referencingElement)) {
      return false;
    }

    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

    const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
    const isInternalReference = this.isInternalRetrievalURI(retrievalURI);
    const isExternalReference = !isInternalReference;

    // ignore resolving internal Reference Objects
    if (!this.options.resolve.internal && isInternalReference) {
      this.markSkipped(referencingElement, false);
      // skip traversing this reference element
      return false;
    }
    // ignore resolving external Reference Objects
    if (
      !this.options.resolve.external &&
      isExternalReference &&
      !this.followsWithinDocument(retrievalURI)
    ) {
      this.markSkipped(referencingElement, true);
      // skip traversing this reference element
      return false;
    }

    let reference: Reference;

    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

    this.indirections.push(referencingElement);

    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);

    let referencedElement;

    try {
      // possibly non-semantic fragment
      referencedElement = evaluate<Element>(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }
    referencedElement.id = identityManager.identify(referencedElement);
    const fragment = referencedElement;

    try {
      referencedElement = await this.transformFragment(
        referencedElement,
        reference,
        this.toReferenceURI(retrievalURI, toValue(referencingElement.$ref)),
        toValue(referencingElement.meta.get('referenced-element')),
      );
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    // a transformed fragment is a new element, which the traversal of its document never reaches
    const isTransformed = referencedElement !== fragment;

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
      const error = new ApiDOMError('Recursive Reference Object detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, {
          directAncestors,
          isExternalReference,
        });
      }

      if (this.options.dereference.circular === 'replace') {
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
        isTransformed ||
        isReferenceElement(referencedElement) ||
        shouldDetectCircular) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);
      this.errorContext.push(referencingElement);

      const visitor = new OpenAPI3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
        errorContext: this.errorContext,
        errorPropagationCache: this.errorPropagationCache,
        pendingPropagations: this.pendingPropagations,
        skippedReferences: this.skippedReferences,
        skipsExternalLocally: this.nestedSkipsExternalLocally(referencingElement),
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, {
          directAncestors,
          isExternalReference,
        });
      }

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
      this.popErrorContext(referencingElement);
    } else if (this.options.dereference.dereferenceOpts?.continueOnError) {
      this.pendingPropagations.push({ referencingElement, referencedElement });
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

    // the copy of a reference left unresolved stays unresolved, and keeps the document it is written in
    if (this.skippedReferences.has(referencedElement)) {
      const origin = referencedElement.meta.get('ref-origin');
      if (origin !== undefined) mergedElement.setMetaProperty('ref-origin', toValue(origin));
      this.skippedReferences.add(mergedElement);
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

    // skip referencing element another visitor deliberately left unresolved
    if (this.skippedReferences.has(referencingElement)) {
      return undefined;
    }

    const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

    const retrievalURI = this.toBaseURI(toValue(referencingElement.$ref));
    const isInternalReference = this.isInternalRetrievalURI(retrievalURI);
    const isExternalReference = !isInternalReference;

    // ignore resolving internal Path Item Objects
    if (!this.options.resolve.internal && isInternalReference) {
      this.markSkipped(referencingElement, false);
      // skip traversing this Path Item element but traverse all it's child elements
      return undefined;
    }
    // ignore resolving external Path Item Objects
    if (
      !this.options.resolve.external &&
      isExternalReference &&
      !this.followsWithinDocument(retrievalURI)
    ) {
      this.markSkipped(referencingElement, true);
      // skip traversing this Path Item element but traverse all it's child elements
      return undefined;
    }

    let reference: Reference;

    try {
      reference = await this.toReference(toValue(referencingElement.$ref));
    } catch (error) {
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

    this.indirections.push(referencingElement);

    const jsonPointer = URIFragmentIdentifier.fromURIReference($refBaseURI);

    let referencedElement;

    try {
      // possibly non-semantic referenced element
      referencedElement = evaluate<Element>(reference.value.result, jsonPointer);
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }
    referencedElement.id = identityManager.identify(referencedElement);
    const fragment = referencedElement;

    try {
      referencedElement = await this.transformFragment(
        referencedElement,
        reference,
        this.toReferenceURI(retrievalURI, toValue(referencingElement.$ref)),
        'pathItem',
      );
    } catch (error) {
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    const isTransformed = referencedElement !== fragment;

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
      const error = new ApiDOMError('Recursive Path Item Object reference detected');
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    // detect maximum depth of dereferencing
    if (this.indirections.length > this.options.dereference.maxDepth) {
      const error = new MaximumDereferenceDepthError(
        `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
      );
      this.indirections.pop();
      return this.handleDereferenceError(error, referencingElement, {
        directAncestors,
        isExternalReference,
      });
    }

    // detect second deep dive into the same fragment and avoid it
    if (ancestorsLineage.includes(referencedElement)) {
      reference.refSet!.circular = true;

      if (this.options.dereference.circular === 'error') {
        const error = new ApiDOMError('Circular reference detected');
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, {
          directAncestors,
          isExternalReference,
        });
      }

      if (this.options.dereference.circular === 'replace') {
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
    // with internalScope 'entry', a reference back into the entry document is internal, but its
    // children must still be resolved against the entry document
    const isCrossingDocument = url.stripHash(this.reference.uri) !== retrievalURI;
    if (
      (isExternalReference ||
        isCrossingDocument ||
        isNonEntryDocument ||
        isTransformed ||
        (isPathItemElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
        shouldDetectCircular) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);
      this.errorContext.push(referencingElement);

      const visitor = new OpenAPI3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
        errorContext: this.errorContext,
        errorPropagationCache: this.errorPropagationCache,
        pendingPropagations: this.pendingPropagations,
        skippedReferences: this.skippedReferences,
        skipsExternalLocally: this.nestedSkipsExternalLocally(referencingElement),
      });
      try {
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });
      } catch (error) {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, {
          directAncestors,
          isExternalReference,
        });
      }

      // remove referencing reference from ancestors lineage
      directAncestors.delete(referencingElement);
      this.popErrorContext(referencingElement);
    } else if (this.options.dereference.dereferenceOpts?.continueOnError) {
      this.pendingPropagations.push({ referencingElement, referencedElement });
    }

    this.indirections.pop();

    // with internalScope 'entry', a referenced Path Item left unresolved keeps its own `$ref`, and
    // the document it is written in
    const skippedTarget =
      this.options.dereference.strategyOpts['openapi-3-0']?.internalScope === 'entry' &&
      isPathItemElement(referencedElement) &&
      this.skippedReferences.has(referencedElement)
        ? referencedElement
        : undefined;

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

    if (skippedTarget !== undefined && isPathItemElement(referencedElement)) {
      referencedElement.set('$ref', skippedTarget.get('$ref'));
      const origin = skippedTarget.meta.get('ref-origin');
      if (origin !== undefined) referencedElement.setMetaProperty('ref-origin', toValue(origin));
      this.skippedReferences.add(referencedElement);
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
    // skip LinkElement dereferencing when disabled
    if (this.options.dereference.strategyOpts['openapi-3-0']?.dereferenceLinks === false) {
      return undefined;
    }

    // ignore LinkElement without operationRef or operationId field
    if (!isStringElement(linkElement.operationRef) && !isStringElement(linkElement.operationId)) {
      return undefined;
    }

    // skip LinkElement another visitor deliberately left unresolved
    if (this.skippedReferences.has(linkElement)) {
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
      const jsonPointer = URIFragmentIdentifier.fromURIReference(toValue(linkElement.operationRef));
      const retrievalURI = this.toBaseURI(toValue(linkElement.operationRef));
      const isInternalReference = this.isInternalRetrievalURI(retrievalURI);
      const isExternalReference = !isInternalReference;

      // ignore resolving internal Operation Object reference
      if (!this.options.resolve.internal && isInternalReference) {
        this.markSkippedInEntryScope(linkElement, false);
        // skip traversing this Link element but traverse all it's child elements
        return undefined;
      }
      // ignore resolving external Operation Object reference
      if (!this.options.resolve.external && isExternalReference) {
        this.markSkippedInEntryScope(linkElement, true);
        // skip traversing this Link element but traverse all it's child elements
        return undefined;
      }

      let reference: Reference;

      try {
        reference = await this.toReference(toValue(linkElement.operationRef));
        operationElement = evaluate<Element>(reference.value.result, jsonPointer);
      } catch (error) {
        return this.handleDereferenceError(error, linkElement, { isExternalReference });
      }

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
    // skip ExampleElement dereferencing when disabled
    if (this.options.dereference.strategyOpts['openapi-3-0']?.dereferenceExamples === false) {
      return undefined;
    }

    // ignore ExampleElement without externalValue field
    if (!isStringElement(exampleElement.externalValue)) {
      return undefined;
    }

    // skip ExampleElement another visitor deliberately left unresolved
    if (this.skippedReferences.has(exampleElement)) {
      return undefined;
    }

    // value and externalValue fields are mutually exclusive
    if (exampleElement.hasKey('value') && isStringElement(exampleElement.externalValue)) {
      const error = new ApiDOMError(
        'ExampleElement value and externalValue fields are mutually exclusive.',
      );
      return this.handleDereferenceError(error, exampleElement);
    }

    const retrievalURI = this.toBaseURI(toValue(exampleElement.externalValue));
    const isInternalReference = this.isInternalRetrievalURI(retrievalURI);
    const isExternalReference = !isInternalReference;

    // ignore resolving external Example Objects
    if (!this.options.resolve.internal && isInternalReference) {
      this.markSkippedInEntryScope(exampleElement, false);
      // skip traversing this Example element but traverse all it's child elements
      return undefined;
    }
    // ignore resolving external Example Objects
    if (!this.options.resolve.external && isExternalReference) {
      this.markSkippedInEntryScope(exampleElement, true);
      // skip traversing this Example element but traverse all it's child elements
      return undefined;
    }

    let reference: Reference;

    try {
      reference = await this.toReference(toValue(exampleElement.externalValue));
    } catch (error) {
      return this.handleDereferenceError(error, exampleElement, { isExternalReference });
    }

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
