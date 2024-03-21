import stampit from 'stampit';
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
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate as jsonPointerEvaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
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
} from '@swagger-api/apidom-ns-openapi-3-1';

import { isAnchor, uriToAnchor, evaluate as $anchorEvaluate } from './selectors/$anchor';
import { evaluate as uriEvaluate } from './selectors/uri';
import { Reference as IReference, Resolver as IResolver } from '../../../types';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError';
import MaximumResolveDepthError from '../../../errors/MaximumResolveDepthError';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';
import File from '../../../util/File';
import { resolveSchema$refField, maybeRefractToSchemaElement } from './util';
import { AncestorLineage } from '../../util';
import EvaluationJsonSchemaUriError from '../../../errors/EvaluationJsonSchemaUriError';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// initialize element identity manager
const identityManager = IdentityManager();

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1DereferenceVisitor = stampit({
  props: {
    indirections: null,
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

      // register new mutable reference with a refSet
      const mutableReference = Reference({
        uri: baseURI,
        value: cloneDeep(parseResult),
        depth: this.reference.depth + 1,
      });
      refSet.add(mutableReference);

      if (this.options.dereference.immutable) {
        // register new immutable reference with a refSet
        const immutableReference = Reference({
          uri: `immutable://${baseURI}`,
          value: parseResult,
          depth: this.reference.depth + 1,
        });
        refSet.add(immutableReference);
      }

      return mutableReference;
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
      key: string | number,
      parent: Element | undefined,
      path: (string | number)[],
      ancestors: [Element | Element[]],
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
        // skip traversing this reference element and all it's child elements
        return false;
      }
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isExternalReference) {
        // skip traversing this reference element and all it's child elements
        return false;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);
      referencedElement.id = identityManager.identify(referencedElement);

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

      // detect direct or indirect reference
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
        reference.refSet.circular = true;

        if (this.options.dereference.circular === 'error') {
          throw new ApiDOMError('Circular reference detected');
        } else if (this.options.dereference.circular === 'replace') {
          const refElement = new RefElement(referencedElement.id, {
            type: 'reference',
            uri: reference.uri,
            $ref: toValue(referencingElement.$ref),
          });
          const replacer =
            this.options.dereference.strategyOpts['openapi-3-1']?.circularReplacer ??
            this.options.dereference.circularReplacer;
          const replacement = replacer(refElement);

          if (isMemberElement(parent)) {
            parent.value = replacement; // eslint-disable-line no-param-reassign
          } else if (Array.isArray(parent)) {
            parent[key] = replacement; // eslint-disable-line no-param-reassign
          }

          return !parent ? replacement : false;
        }
      }

      /**
       * Dive deep into the fragment.
       *
       * Cases to consider:
       *  1. We're crossing document boundary
       *  2. Fragment is a Reference Object. We need to follow it to get the eventual value
       *  3. We are dereferencing the fragment lazily/eagerly depending on circular mode
       */
      if (
        (isExternalReference ||
          isReferenceElement(referencedElement) ||
          ['error', 'replace'].includes(this.options.dereference.circular)) &&
        !ancestorsLineage.includesCycle(referencedElement)
      ) {
        // append referencing reference to ancestors lineage
        directAncestors.add(referencingElement);

        const visitor = OpenApi3_1DereferenceVisitor({
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
      // annotate fragment with info about original Reference element
      mergedElement.setMetaProperty('ref-fields', {
        $ref: toValue(referencingElement.$ref),
        // @ts-ignore
        description: toValue(referencingElement.description),
        // @ts-ignore
        summary: toValue(referencingElement.summary),
      });
      // annotate fragment with info about origin
      mergedElement.setMetaProperty('ref-origin', reference.uri);
      // annotate fragment with info about referencing element
      mergedElement.setMetaProperty(
        'ref-referencing-element-id',
        cloneDeep(identityManager.identify(referencingElement)),
      );

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
      if (isMemberElement(parent)) {
        parent.value = mergedElement; // eslint-disable-line no-param-reassign
      } else if (Array.isArray(parent)) {
        parent[key] = mergedElement; // eslint-disable-line no-param-reassign
      }

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? mergedElement : false;
    },

    async PathItemElement(
      referencingElement: PathItemElement,
      key: string | number,
      parent: Element | undefined,
      path: (string | number)[],
      ancestors: [Element | Element[]],
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

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic referenced element
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);
      referencedElement.id = identityManager.identify(referencedElement);

      /**
       * Applying semantics to a referenced element if semantics are missing.
       */
      if (isPrimitiveElement(referencedElement)) {
        const cacheKey = `path-item-${toValue(identityManager.identify(referencedElement))}`;

        if (this.refractCache.has(cacheKey)) {
          referencedElement = this.refractCache.get(cacheKey);
        } else {
          referencedElement = PathItemElement.refract(referencedElement);
          this.refractCache.set(cacheKey, referencedElement);
        }
      }

      // detect direct or indirect reference
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
        reference.refSet.circular = true;

        if (this.options.dereference.circular === 'error') {
          throw new ApiDOMError('Circular reference detected');
        } else if (this.options.dereference.circular === 'replace') {
          const refElement = new RefElement(referencedElement.id, {
            type: 'path-item',
            uri: reference.uri,
            $ref: toValue(referencingElement.$ref),
          });
          const replacer =
            this.options.dereference.strategyOpts['openapi-3-1']?.circularReplacer ??
            this.options.dereference.circularReplacer;
          const replacement = replacer(refElement);

          if (isMemberElement(parent)) {
            parent.value = replacement; // eslint-disable-line no-param-reassign
          } else if (Array.isArray(parent)) {
            parent[key] = replacement; // eslint-disable-line no-param-reassign
          }

          return !parent ? replacement : false;
        }
      }

      /**
       * Dive deep into the fragment.
       *
       * Cases to consider:
       *  1. We're crossing document boundary
       *  2. Fragment is a Path Item Object with $ref field. We need to follow it to get the eventual value
       *  3. We are dereferencing the fragment lazily/eagerly depending on circular mode
       */
      if (
        (isExternalReference ||
          (isPathItemElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
          ['error', 'replace'].includes(this.options.dereference.circular)) &&
        !ancestorsLineage.includesCycle(referencedElement)
      ) {
        // append referencing reference to ancestors lineage
        directAncestors.add(referencingElement);

        const visitor = OpenApi3_1DereferenceVisitor({
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
      if (isMemberElement(parent)) {
        parent.value = referencedElement; // eslint-disable-line no-param-reassign
      } else if (Array.isArray(parent)) {
        parent[key] = referencedElement; // eslint-disable-line no-param-reassign
      }

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? referencedElement : undefined;
    },

    async LinkElement(linkElement: LinkElement, key: string | number, parent: Element | undefined) {
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

        operationElement = jsonPointerEvaluate(jsonPointer, reference.value.result);
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

        /**
         * Transclude Link Object containing Operation Object in its meta.
         */
        if (isMemberElement(parent)) {
          parent.value = linkElementCopy; // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = linkElementCopy; // eslint-disable-line no-param-reassign
        }

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
          reference.value.result,
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
        if (isMemberElement(parent)) {
          parent.value = linkElementCopy; // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = linkElementCopy; // eslint-disable-line no-param-reassign
        }

        /**
         * We're at the root of the tree, so we're just replacing the entire tree.
         */
        return !parent ? linkElementCopy : undefined;
      }

      return undefined;
    },

    async ExampleElement(
      exampleElement: ExampleElement,
      key: string | number,
      parent: Element | undefined,
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

      const reference = await this.toReference(toValue(exampleElement.externalValue));

      // shallow clone of the referenced element
      const valueElement = cloneShallow(reference.value.result);
      // annotate operation element with info about origin
      valueElement.setMetaProperty('ref-origin', reference.uri);

      const exampleElementCopy = cloneShallow(exampleElement);
      exampleElementCopy.value = valueElement;

      /**
       * Transclude Example Object containing external value.
       */
      if (isMemberElement(parent)) {
        parent.value = exampleElementCopy; // eslint-disable-line no-param-reassign
      } else if (Array.isArray(parent)) {
        parent[key] = exampleElementCopy; // eslint-disable-line no-param-reassign
      }

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? exampleElementCopy : undefined;
    },

    async SchemaElement(
      referencingElement: SchemaElement,
      key: string | number,
      parent: Element | undefined,
      path: (string | number)[],
      ancestors: [Element | Element[]],
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
      let reference = await this.toReference(url.unsanitize(this.reference.uri));
      let { uri: retrievalURI } = reference;
      const $refBaseURI = resolveSchema$refField(retrievalURI, referencingElement)!;
      const $refBaseURIStrippedHash = url.stripHash($refBaseURI);
      const file = File({ uri: $refBaseURIStrippedHash });
      const isUnknownURI = none((r: IResolver) => r.canRead(file), this.options.resolve.resolvers);
      const isURL = !isUnknownURI;
      let isInternalReference = url.stripHash(this.reference.uri) === $refBaseURI;
      let isExternalReference = !isInternalReference;

      this.indirections.push(referencingElement);

      // determining reference, proper evaluation and selection mechanism
      let referencedElement: any;

      try {
        if (isUnknownURI || isURL) {
          // we're dealing with canonical URI or URL with possible fragment
          retrievalURI = this.toBaseURI($refBaseURI);
          const selector = $refBaseURI;
          const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result);
          referencedElement = uriEvaluate(selector, referenceAsSchema);
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
          const selector = uriToPointer($refBaseURI);
          const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result);
          referencedElement = jsonPointerEvaluate(selector, referenceAsSchema);
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

            reference = await this.toReference(url.unsanitize($refBaseURI));
            const selector = uriToAnchor($refBaseURI);
            const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result);
            referencedElement = $anchorEvaluate(selector, referenceAsSchema);
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

            reference = await this.toReference(url.unsanitize($refBaseURI));
            const selector = uriToPointer($refBaseURI);
            const referenceAsSchema = maybeRefractToSchemaElement(reference.value.result);
            referencedElement = jsonPointerEvaluate(selector, referenceAsSchema);
            referencedElement = maybeRefractToSchemaElement(referencedElement);
            referencedElement.id = identityManager.identify(referencedElement);
          }
        } else {
          throw error;
        }
      }

      // detect direct or indirect reference
      if (referencingElement === referencedElement) {
        throw new ApiDOMError('Recursive Schema Object reference detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // detect second deep dive into the same fragment and avoid it
      if (ancestorsLineage.includes(referencedElement)) {
        reference.refSet.circular = true;

        if (this.options.dereference.circular === 'error') {
          throw new ApiDOMError('Circular reference detected');
        } else if (this.options.dereference.circular === 'replace') {
          const refElement = new RefElement(referencedElement.id, {
            type: 'json-schema',
            uri: reference.uri,
            $ref: toValue(referencingElement.$ref),
          });
          const replacer =
            this.options.dereference.strategyOpts['openapi-3-1']?.circularReplacer ??
            this.options.dereference.circularReplacer;
          const replacement = replacer(refElement);

          if (isMemberElement(parent)) {
            parent.value = replacement; // eslint-disable-line no-param-reassign
          } else if (Array.isArray(parent)) {
            parent[key] = replacement; // eslint-disable-line no-param-reassign
          }

          return !parent ? replacement : false;
        }
      }

      /**
       * Dive deep into the fragment.
       *
       * Cases to consider:
       *  1. We're crossing document boundary
       *  2. Fragment is a Schema Object with $ref field. We need to follow it to get the eventual value
       *  3. We are dereferencing the fragment lazily/eagerly depending on circular mode
       */
      if (
        (isExternalReference ||
          (isSchemaElement(referencedElement) && isStringElement(referencedElement.$ref)) ||
          ['error', 'replace'].includes(this.options.dereference.circular)) &&
        !ancestorsLineage.includesCycle(referencedElement)
      ) {
        // append referencing reference to ancestors lineage
        directAncestors.add(referencingElement);

        const visitor = OpenApi3_1DereferenceVisitor({
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

      // Boolean JSON Schemas
      if (isBooleanJsonSchemaElement(referencedElement as unknown)) {
        const booleanJsonSchemaElement: BooleanElement = cloneDeep(referencedElement);
        // assign unique id to merged element
        booleanJsonSchemaElement.setMetaProperty('id', identityManager.generateId());
        // annotate referenced element with info about original referencing element
        booleanJsonSchemaElement.setMetaProperty('ref-fields', {
          $ref: toValue(referencingElement.$ref),
        });
        // annotate referenced element with info about origin
        booleanJsonSchemaElement.setMetaProperty('ref-origin', reference.uri);
        // annotate fragment with info about referencing element
        booleanJsonSchemaElement.setMetaProperty(
          'ref-referencing-element-id',
          cloneDeep(identityManager.identify(referencingElement)),
        );

        if (isMemberElement(parent)) {
          parent.value = booleanJsonSchemaElement; // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = booleanJsonSchemaElement; // eslint-disable-line no-param-reassign
        }

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
        });
        // annotate fragment with info about origin
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
      if (isMemberElement(parent)) {
        parent.value = referencedElement; // eslint-disable-line no-param-reassign
      } else if (Array.isArray(parent)) {
        parent[key] = referencedElement; // eslint-disable-line no-param-reassign
      }

      /**
       * We're at the root of the tree, so we're just replacing the entire tree.
       */
      return !parent ? referencedElement : undefined;
    },
  },
});

export default OpenApi3_1DereferenceVisitor;
