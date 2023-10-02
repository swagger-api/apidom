import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq, none } from 'ramda';
import { isUndefined, isNotUndefined } from 'ramda-adjunct';
import {
  isElement,
  isPrimitiveElement,
  isStringElement,
  isMemberElement,
  visit,
  Element,
  find,
  cloneShallow,
  cloneDeep,
  toValue,
} from '@swagger-api/apidom-core';
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
  isReferenceElementExternal,
  isPathItemElementExternal,
  isLinkElementExternal,
  isOperationElement,
  isBooleanJsonSchemaElement,
} from '@swagger-api/apidom-ns-openapi-3-1';

import { isAnchor, uriToAnchor, evaluate as $anchorEvaluate } from './selectors/$anchor';
import { evaluate as uriEvaluate } from './selectors/uri';
import { Reference as IReference, Resolver as IResolver } from '../../../types';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';
import File from '../../../util/File';
import {
  resolveSchema$refField,
  maybeRefractToSchemaElement,
} from '../../../resolve/strategies/openapi-3-1/util';
import { AncestorLineage } from '../../util';
import EvaluationJsonSchemaUriError from './selectors/uri/errors/EvaluationJsonSchemaUriError';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

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

    toAncestorLineage(ancestors) {
      /**
       * Compute full ancestors lineage.
       * Ancestors are flatten to unwrap all Element instances.
       */
      const directAncestors = new WeakSet(ancestors.filter(isElement));
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

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referencingElement)) {
        return false;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const { uri: retrievalURI } = reference;
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
        throw new Error('Recursive Reference Object detected');
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
        const copy = cloneDeep(refedElement);

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

        // override description and summary (outer has higher priority then inner)
        const hasDescription = pathSatisfies(isNotUndefined, ['description'], referencingElement);
        const hasSummary = pathSatisfies(isNotUndefined, ['summary'], referencingElement);

        if (hasDescription && hasIn('description', refedElement)) {
          // @ts-ignore
          copy.description = referencingElement.description;
        }
        if (hasSummary && hasIn('summary', refedElement)) {
          // @ts-ignore
          copy.summary = referencingElement.summary;
        }

        return copy;
      };

      // attempting to create cycle
      if (ancestorsLineage.includes(referencedElement)) {
        if (isMemberElement(parent)) {
          parent.value = mergeAndAnnotateReferencedElement(referencedElement); // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = mergeAndAnnotateReferencedElement(referencedElement); // eslint-disable-line no-param-reassign
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

      // ignore resolving external Path Item Elements
      if (!this.options.resolve.external && isPathItemElementExternal(referencingElement)) {
        return undefined;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const { uri: retrievalURI } = reference;
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
        throw new Error('Recursive Path Item Object reference detected');
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

        return mergedElement;
      };

      // attempting to create cycle
      if (ancestorsLineage.includes(referencedElement)) {
        if (isMemberElement(parent)) {
          parent.value = mergeAndAnnotateReferencedElement(referencedElement); // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = mergeAndAnnotateReferencedElement(referencedElement); // eslint-disable-line no-param-reassign
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

      // ignore resolving external Path Item Elements
      if (!this.options.resolve.external && isLinkElementExternal(linkElement)) {
        return undefined;
      }

      // operationRef and operationId fields are mutually exclusive
      if (isStringElement(linkElement.operationRef) && isStringElement(linkElement.operationId)) {
        throw new Error('LinkElement operationRef and operationId fields are mutually exclusive.');
      }

      let operationElement: any;

      if (isStringElement(linkElement.operationRef)) {
        // possibly non-semantic referenced element
        const jsonPointer = uriToPointer(toValue(linkElement.operationRef));
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
          (e) => isOperationElement(e) && e.operationId.equals(operationId),
          reference.value.result,
        );
        // OperationElement not found by its operationId
        if (isUndefined(operationElement)) {
          throw new Error(`OperationElement(operationId=${operationId}) not found.`);
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

      // ignore resolving ExampleElement externalValue
      if (!this.options.resolve.external && isStringElement(exampleElement.externalValue)) {
        return undefined;
      }

      // value and externalValue fields are mutually exclusive
      if (exampleElement.hasKey('value') && isStringElement(exampleElement.externalValue)) {
        throw new Error('ExampleElement value and externalValue fields are mutually exclusive.');
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
      const isExternal = isURL && retrievalURI !== $refBaseURIStrippedHash;

      // ignore resolving external Schema Objects
      if (!this.options.resolve.external && isExternal) {
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

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
            reference = await this.toReference(url.unsanitize($refBaseURI));
            retrievalURI = reference.uri;
            const selector = uriToAnchor($refBaseURI);
            referencedElement = $anchorEvaluate(
              selector,
              // @ts-ignore
              maybeRefractToSchemaElement(reference.value.result),
            );
          } else {
            // we're assuming here that we're dealing with JSON Pointer here
            reference = await this.toReference(url.unsanitize($refBaseURI));
            retrievalURI = reference.uri;
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
        throw new Error('Recursive Schema Object reference detected');
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

        return mergedElement;
      };

      // attempting to create cycle
      if (ancestorsLineage.includes(referencedElement)) {
        if (isMemberElement(parent)) {
          parent.value = mergeAndAnnotateReferencedElement(referencedElement); // eslint-disable-line no-param-reassign
        } else if (Array.isArray(parent)) {
          parent[key] = mergeAndAnnotateReferencedElement(referencedElement); // eslint-disable-line no-param-reassign
        }

        return false;
      }

      // transclude referencing element with merged referenced element
      return mergeAndAnnotateReferencedElement(referencedElement);
    },
  },
});

export default OpenApi3_1DereferenceVisitor;
