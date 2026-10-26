import { propEq, none } from 'ramda';
import {
  isElement,
  isStringElement,
  isMemberElement,
  isObjectElement,
  IdentityManager,
  visit,
  cloneDeep,
  toValue,
  Element,
  RefElement,
  BooleanElement,
  Namespace,
  ObjectElement,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import {
  evaluate as jsonPointerEvaluate,
  URIFragmentIdentifier,
} from '@swagger-api/apidom-json-pointer/modern';
import {
  getNodeType,
  keyMap,
  JSONSchemaElement,
  isJSONSchemaElement,
  isBooleanJsonSchemaElement,
} from '@swagger-api/apidom-ns-json-schema-2020-12';

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
export interface JSONSchema2020_12DereferenceVisitorOptions {
  readonly namespace: Namespace;
  readonly reference: Reference;
  readonly options: ReferenceOptions;
  readonly indirections?: Element[];
  readonly ancestors?: AncestorLineage<Element>;
  readonly refractCache?: Map<string, Element>;
  readonly errorContext?: Element[];
  readonly errorPropagationCache?: Map<Element, unknown[]>;
  readonly pendingPropagations?: Array<{ referencingElement: Element; referencedElement: Element }>;
}

/**
 * Dereferences the $ref keyword of JSON Schema 2020-12 schemas, resolving it against the base
 * URI established by $id and against $anchor and $dynamicAnchor plain name fragments.
 *
 * $dynamicRef is left in place, as in the OpenAPI 3.1 dereference strategy.
 *
 * @public
 */
class JSONSchema2020_12DereferenceVisitor {
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
  }: JSONSchema2020_12DereferenceVisitorOptions) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
    this.refractCache = refractCache;
    this.errorContext = errorContext;
    this.errorPropagationCache = errorPropagationCache;
    this.pendingPropagations = pendingPropagations;
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

  /**
   * Propagates errors collected with `continueOnError` from referenced elements to the
   * elements referencing them. Called once, after the whole document has been traversed.
   */
  public propagateErrors(): void {
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

  /**
   * Visits every schema of the document, including the document root and the schemas
   * of referenced documents.
   */
  public async JSONSchema202012Element(
    referencingElement: JSONSchemaElement,
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
      return this.handleDereferenceError(error, referencingElement, { directAncestors });
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

        // ignore resolving internal schemas
        if (!this.options.resolve.internal && isInternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }
        // ignore resolving external schemas
        if (!this.options.resolve.external && isExternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }
      } else {
        // we're assuming here that we're dealing with JSON Pointer here
        retrievalURI = this.toBaseURI($refBaseURI);
        isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
        isExternalReference = !isInternalReference;

        // ignore resolving internal schemas
        if (!this.options.resolve.internal && isInternalReference) {
          // skip traversing this schema element but traverse all it's child elements
          return undefined;
        }
        // ignore resolving external schemas
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
       * No JSONSchemaElement($id=URL) was found, so we're going to try to resolve
       * the URL and assume the returned response is a JSON Schema.
       */
      if (isURL && error instanceof EvaluationJsonSchemaUriError) {
        if (isAnchor(uriToAnchor($refBaseURI))) {
          // we're dealing with JSON Schema $anchor here
          isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
          isExternalReference = !isInternalReference;

          // ignore resolving internal schemas
          if (!this.options.resolve.internal && isInternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }
          // ignore resolving external schemas
          if (!this.options.resolve.external && isExternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }

          try {
            reference = await this.toReference(url.unsanitize($refBaseURI));
          } catch (toReferenceError) {
            this.indirections.pop();
            return this.handleDereferenceError(toReferenceError, referencingElement, {
              directAncestors,
              isExternalReference,
            });
          }

          const selector = uriToAnchor($refBaseURI);
          const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result as Element);

          try {
            referencedElement = $anchorEvaluate(selector, referenceAsSchema)!;
          } catch (evaluateError) {
            this.indirections.pop();
            return this.handleDereferenceError(evaluateError, referencingElement, {
              directAncestors,
              isExternalReference,
            });
          }

          referencedElement = maybeRefractToSchemaElement(referencedElement);
          referencedElement.id = identityManager.identify(referencedElement);
        } else {
          // we're assuming here that we're dealing with JSON Pointer here
          retrievalURI = this.toBaseURI($refBaseURI);
          isInternalReference = url.stripHash(this.reference.uri) === retrievalURI;
          isExternalReference = !isInternalReference;

          // ignore resolving internal schemas
          if (!this.options.resolve.internal && isInternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }
          // ignore resolving external schemas
          if (!this.options.resolve.external && isExternalReference) {
            // skip traversing this schema element but traverse all it's child elements
            return undefined;
          }

          try {
            reference = await this.toReference(url.unsanitize($refBaseURI));
          } catch (toReferenceError) {
            this.indirections.pop();
            return this.handleDereferenceError(toReferenceError, referencingElement, {
              directAncestors,
              isExternalReference,
            });
          }

          const selector = URIFragmentIdentifier.fromURIReference($refBaseURI);
          const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result as Element);

          try {
            referencedElement = jsonPointerEvaluate(referenceAsSchema, selector);
          } catch (evaluateError) {
            this.indirections.pop();
            return this.handleDereferenceError(evaluateError, referencingElement, {
              directAncestors,
              isExternalReference,
            });
          }

          referencedElement = maybeRefractToSchemaElement(referencedElement);
          referencedElement.id = identityManager.identify(referencedElement);
        }
      } else {
        this.indirections.pop();
        return this.handleDereferenceError(error, referencingElement, {
          directAncestors,
          isExternalReference,
        });
      }
    }

    // detect direct or indirect reference
    if (referencingElement === referencedElement) {
      const error = new ApiDOMError('Recursive JSON Schema reference detected');
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
          type: 'json-schema',
          uri: reference.uri,
          $ref: toValue(referencingElement.$ref),
        });
        const replacer =
          this.options.dereference.strategyOpts['json-schema-2020-12']?.circularReplacer ??
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
     *  3. Fragment is a schema with $ref keyword. We need to follow it to get the eventual value
     *  4. We are dereferencing the fragment lazily/eagerly depending on circular mode
     */
    const isNonRootDocument = url.stripHash(reference.refSet!.rootRef!.uri) !== reference.uri;
    const shouldDetectCircular = ['error', 'replace'].includes(this.options.dereference.circular);
    if (
      (isExternalReference ||
        isNonRootDocument ||
        (isJSONSchemaElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
        shouldDetectCircular) &&
      !ancestorsLineage.includesCycle(referencedElement)
    ) {
      // append referencing reference to ancestors lineage
      directAncestors.add(referencingElement);
      this.errorContext.push(referencingElement);

      const visitor = new JSONSchema2020_12DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.getNestedVisitorOptions(referencingElement),
        refractCache: this.refractCache,
        ancestors: ancestorsLineage,
        errorContext: this.errorContext,
        errorPropagationCache: this.errorPropagationCache,
        pendingPropagations: this.pendingPropagations,
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
    }

    if (this.options.dereference.dereferenceOpts?.continueOnError) {
      this.pendingPropagations.push({ referencingElement, referencedElement });
    }

    this.indirections.pop();

    /**
     * The document root is a schema: when it is the referencing schema, its replacement
     * must stay marked as the result of the parse result.
     */
    const isParseResultRoot = referencingElement.classes.includes('result');

    // Boolean JSON Schemas
    if (isBooleanJsonSchemaElement(referencedElement as unknown)) {
      const booleanJsonSchemaElement: BooleanElement = cloneDeep(referencedElement);
      if (isParseResultRoot) {
        booleanJsonSchemaElement.classes.push('result');
      }
      // assign unique id to merged element
      booleanJsonSchemaElement.setMetaProperty('id', identityManager.generateId());
      // annotate referenced element with info about original referencing element
      booleanJsonSchemaElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
        $refBaseURI,
      });
      // annotate referenced element with info about origin
      booleanJsonSchemaElement.setMetaProperty('ref-origin', reference.uri);
      // annotate fragment with info about referencing element
      booleanJsonSchemaElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

      link.replaceWith(booleanJsonSchemaElement, mutationReplacer);

      return !parent ? booleanJsonSchemaElement : false;
    }

    /**
     * Creating a new version of the schema by merging keywords from the referenced schema with the referencing one.
     */
    if (isJSONSchemaElement(referencedElement)) {
      const mergedElement = new JSONSchemaElement(
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
      if (isParseResultRoot && !mergedElement.classes.includes('result')) {
        mergedElement.classes.push('result');
      }
      // annotate referenced element with info about original referencing element
      mergedElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
        $refBaseURI,
      });
      // annotate fragment with info about origin
      mergedElement.setMetaProperty('ref-origin', reference.uri);
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
}

export default JSONSchema2020_12DereferenceVisitor;
