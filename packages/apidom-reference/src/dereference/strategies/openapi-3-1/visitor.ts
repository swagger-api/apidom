import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq, none } from 'ramda';
import { isUndefined, isNotUndefined } from 'ramda-adjunct';
import {
  isPrimitiveElement,
  isStringElement,
  visit,
  Element,
  find,
  isElement,
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
  init({ indirections = [], reference, namespace, options, ancestors = [] }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.ancestors = [...ancestors];
  },
  methods: {
    toBaseURI(uri: string): string {
      return url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));
    },

    toAncestorLineage(ancestors) {
      /**
       * Compute full ancestors lineage.
       * Ancestors are flatten to unwrap all Element instances.
       */
      const directAncestors = new WeakSet(ancestors.filter(isElement));
      const ancestorsLineage = [...this.ancestors, directAncestors];

      return [ancestorsLineage, directAncestors];
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

    async ReferenceElement(
      referencingElement: ReferenceElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.some((ancs: WeakSet<Element>) => ancs.has(referencingElement))) {
        // skip processing this schema and all it's child schemas
        return false;
      }

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referencingElement)) {
        return false;
      }

      const reference = await this.toReference(referencingElement.$ref?.toValue());
      const retrievalURI = reference.uri;
      const $refBaseURI = url.resolve(retrievalURI, referencingElement.$ref?.toValue());

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (isPrimitiveElement(referencedElement)) {
        const referencedElementType = referencingElement.meta.get('referenced-element').toValue();

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

      // annotate fragment with info about original Reference element
      referencedElement = referencedElement.clone();
      referencedElement.setMetaProperty('ref-fields', {
        $ref: referencingElement.$ref?.toValue(),
        // @ts-ignore
        description: referencingElement.description?.toValue(),
        // @ts-ignore
        summary: referencingElement.summary?.toValue(),
      });
      // annotate fragment with info about origin
      referencedElement.setMetaProperty('ref-origin', reference.uri);

      // override description and summary (outer has higher priority then inner)
      const hasDescription = pathSatisfies(isNotUndefined, ['description'], referencingElement);
      const hasSummary = pathSatisfies(isNotUndefined, ['summary'], referencingElement);
      if (hasDescription && hasIn('description', referencedElement)) {
        // @ts-ignore
        referencedElement.description = referencingElement.description;
      }
      if (hasSummary && hasIn('summary', referencedElement)) {
        // @ts-ignore
        referencedElement.summary = referencingElement.summary;
      }

      this.indirections.pop();

      // transclude the element for a fragment
      return referencedElement;
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
      if (ancestorsLineage.some((ancs: WeakSet<Element>) => ancs.has(referencingElement))) {
        // skip processing this schema and all it's child schemas
        return false;
      }

      // ignore resolving external Path Item Elements
      if (!this.options.resolve.external && isPathItemElementExternal(referencingElement)) {
        return undefined;
      }

      const reference = await this.toReference(referencingElement.$ref?.toValue());
      const retrievalURI = reference.uri;
      const $refBaseURI = url.resolve(retrievalURI, referencingElement.$ref?.toValue());

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

      // merge fields from referenced Path Item with referencing one
      const mergedResult = new PathItemElement(
        // @ts-ignore
        [...referencedElement.content],
        referencedElement.meta.clone(),
        referencedElement.attributes.clone(),
      );
      // existing keywords from referencing PathItemElement overrides ones from referenced element
      referencingElement.forEach((value: Element, keyElement: Element, item: Element) => {
        mergedResult.remove(keyElement.toValue());
        mergedResult.content.push(item);
      });
      mergedResult.remove('$ref');

      // annotate referenced element with info about original referencing element
      mergedResult.setMetaProperty('ref-fields', {
        $ref: referencingElement.$ref?.toValue(),
      });
      // annotate referenced element with info about origin
      mergedResult.setMetaProperty('ref-origin', reference.uri);

      // transclude referencing element with merged referenced element
      return mergedResult;
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

      // @ts-ignore
      let operationElement;

      if (isStringElement(linkElement.operationRef)) {
        // possibly non-semantic referenced element
        const jsonPointer = uriToPointer(linkElement.operationRef?.toValue());
        const reference = await this.toReference(linkElement.operationRef?.toValue());
        operationElement = jsonPointerEvaluate(jsonPointer, reference.value.result);
        // applying semantics to a referenced element
        if (isPrimitiveElement(operationElement)) {
          operationElement = OperationElement.refract(operationElement);
        }
        // create shallow clone to be able to annotate with metadata
        operationElement = new OperationElement(
          // @ts-ignore
          [...operationElement.content],
          operationElement.meta.clone(),
          operationElement.attributes.clone(),
        );
        // annotate operation element with info about origin
        operationElement.setMetaProperty('ref-origin', reference.uri);
        linkElement.operationRef?.meta.set('operation', operationElement);
      } else if (isStringElement(linkElement.operationId)) {
        const operationId = linkElement.operationId?.toValue();
        operationElement = find(
          (e) => isOperationElement(e) && e.operationId.equals(operationId),
          this.reference.value.result,
        );
        // OperationElement not found by its operationId
        if (isUndefined(operationElement)) {
          throw new Error(`OperationElement(operationId=${operationId}) not found.`);
        }
        linkElement.operationId?.meta.set('operation', operationElement);
      }

      return undefined;
    },

    async ExampleElement(exampleElement: ExampleElement) {
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

      const reference = await this.toReference(exampleElement.externalValue?.toValue());

      // shallow clone of the referenced element
      const valueElement = new reference.value.result.constructor(
        reference.value.result.content,
        reference.value.result.meta.clone(),
        reference.value.result.attributes.clone(),
      );
      // annotate operation element with info about origin
      valueElement.setMetaProperty('ref-origin', reference.uri);

      // eslint-disable-next-line no-param-reassign
      exampleElement.value = valueElement;

      return undefined;
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
      if (ancestorsLineage.some((ancs: WeakSet<Element>) => ancs.has(referencingElement))) {
        // skip processing this schema and all it's child schemas
        return false;
      }

      // compute baseURI using rules around $id and $ref keywords
      let { reference } = this;
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
      let referencedElement;

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
        const referencedElementClone = referencedElement.clone();
        // annotate referenced element with info about original referencing element
        referencedElementClone.setMetaProperty('ref-fields', {
          $ref: referencingElement.$ref?.toValue(),
        });
        // annotate referenced element with info about origin
        referencedElementClone.setMetaProperty('ref-origin', reference.uri);
        return referencedElementClone;
      }

      // Schema Object - merge keywords from referenced schema with referencing schema
      const mergedResult = new SchemaElement(
        // @ts-ignore
        [...referencedElement.content],
        referencedElement.meta.clone(),
        referencedElement.attributes.clone(),
      );
      // existing keywords from referencing schema overrides ones from referenced schema
      referencingElement.forEach((value: Element, keyElement: Element, item: Element) => {
        mergedResult.remove(keyElement.toValue());
        mergedResult.content.push(item);
      });
      mergedResult.remove('$ref');
      // annotate referenced element with info about original referencing element
      mergedResult.setMetaProperty('ref-fields', {
        $ref: referencingElement.$ref?.toValue(),
      });
      // annotate fragment with info about origin
      mergedResult.setMetaProperty('ref-origin', reference.uri);

      // transclude referencing element with merged referenced element
      return mergedResult;
    },
  },
});

export default OpenApi3_1DereferenceVisitor;
