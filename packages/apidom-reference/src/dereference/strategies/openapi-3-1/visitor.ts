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
import {
  resolveSchema$refField,
  maybeRefractToSchemaElement,
} from '../../../resolve/strategies/openapi-3-1/util';
import { AncestorLineage } from '../../util';
import EvaluationJsonSchemaUriError from '../../../errors/EvaluationJsonSchemaUriError';

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
const OpenApi3_1DereferenceVisitor = stampit({
  props: {
    indirections: null,
    namespace: null,
    reference: null,
    options: null,
    ancestors: null,
  },
  init({ indirections = [], reference, namespace, options, ancestors = new AncestorLineage() }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = new AncestorLineage(...ancestors);
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

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
        // skip traversing this reference element and all it's child elements
        return false;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(referencedElement)) {
        const referencedElementType = toValue(referencingElement.meta.get('referenced-element'));

        if (isReferenceLikeElement(referencedElement)) {
          // handling indirect references
          referencedElement = ReferenceElement.refract(referencedElement);
          referencedElement.setMetaProperty('referenced-element', referencedElementType);
        } else {
          // handling direct references
          const ElementClass = this.namespace.getElementClass(referencedElementType);
          referencedElement = ElementClass.refract(referencedElement);
        }
      }

      // detect direct or indirect reference
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
      const visitor: any = OpenApi3_1DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        ancestors: ancestorsLineage,
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

        // annotate fragment with info about original Reference element
        copy.setMetaProperty('ref-fields', {
          $ref: toValue(referencingElement.$ref),
          // @ts-ignore
          description: toValue(referencingElement.description),
          // @ts-ignore
          summary: toValue(referencingElement.summary),
        });
        // annotate fragment with info about origin
        copy.setMetaProperty('ref-origin', reference.uri);
        // annotate fragment with info about referencing element
        copy.setMetaProperty(
          'ref-referencing-element-id',
          cloneDeep(identityManager.identify(referencingElement)),
        );

        // override description and summary (outer has higher priority then inner)
        if (isObjectElement(refedElement)) {
          if (referencingElement.hasKey('description') && 'description' in refedElement) {
            // @ts-ignore
            copy.remove('description');
            // @ts-ignore
            copy.set('description', referencingElement.get('description'));
          }
          if (referencingElement.hasKey('summary') && 'summary' in refedElement) {
            // @ts-ignore
            copy.remove('summary');
            // @ts-ignore
            copy.set('summary', referencingElement.get('summary'));
          }
        }

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

      // transclude the element for a fragment
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

      // ignore resolving external Path Item Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
        // skip traversing this Path Item element but traverse all it's child elements
        return undefined;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic referenced element
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);

      // applying semantics to a referenced element
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

      // append referencing path item to ancestors lineage
      directAncestors.add(referencingElement);

      // dive deep into the referenced element
      const visitor: any = OpenApi3_1DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        ancestors: ancestorsLineage,
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
          cloneDeep(refedElement.meta),
          cloneDeep(refedElement.attributes),
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

        // ignore resolving external Operation Object reference
        if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
          // skip traversing this Link element but traverse all it's child elements
          return undefined;
        }

        const reference = await this.toReference(toValue(linkElement.operationRef));

        operationElement = jsonPointerEvaluate(jsonPointer, reference.value.result);
        // applying semantics to a referenced element
        if (isPrimitiveElement(operationElement)) {
          operationElement = OperationElement.refract(operationElement);
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

      // ignore resolving external Example Objects
      if (!this.options.resolve.external && url.stripHash(this.reference.uri) !== retrievalURI) {
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

    async SchemaElement(
      referencingElement: SchemaElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      // skip current referencing schema as $ref keyword was not defined
      if (!isStringElement(referencingElement.$ref)) {
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.includesCycle(referencingElement)) {
        return false;
      }

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
      let referencedElement: any;

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

      // append referencing schema to ancestors lineage
      directAncestors.add(referencingElement);

      // dive deep into the fragment
      const visitor: any = OpenApi3_1DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        ancestors: ancestorsLineage,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      // remove referencing schema from ancestors lineage
      directAncestors.delete(referencingElement);

      this.indirections.pop();

      // Boolean JSON Schemas
      if (isBooleanJsonSchemaElement(referencedElement)) {
        const booleanJsonSchemaElement = cloneDeep(referencedElement);
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

        return booleanJsonSchemaElement;
      }

      const mergeAndAnnotateReferencedElement = <T extends Element>(
        refedElement: T,
      ): SchemaElement => {
        // Schema Object - merge keywords from referenced schema with referencing schema
        const mergedElement = new SchemaElement(
          [...refedElement.content] as any,
          cloneDeep(refedElement.meta),
          cloneDeep(refedElement.attributes),
        );
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

      return mergeAndAnnotateReferencedElement(referencedElement);
    },
  },
});

export default OpenApi3_1DereferenceVisitor;
