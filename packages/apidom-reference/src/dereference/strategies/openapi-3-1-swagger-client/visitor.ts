import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq, none } from 'ramda';
import { isUndefined, isNotUndefined } from 'ramda-adjunct';
import {
  isObjectElement,
  ObjectElement,
  isPrimitiveElement,
  isStringElement,
  visit,
  Element,
  find,
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

import {
  isAnchor,
  uriToAnchor,
  evaluate as $anchorEvaluate,
} from '../openapi-3-1/selectors/$anchor';
import { evaluate as uriEvaluate } from '../openapi-3-1/selectors/uri';
import { Reference as IReference, Resolver as IResolver } from '../../../types';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';
import File from '../../../util/File';
import {
  resolveInherited$id,
  maybeRefractToSchemaElement,
} from '../../../resolve/strategies/openapi-3-1/util';
import EvaluationJsonSchemaUriError from '../openapi-3-1/selectors/uri/errors/EvaluationJsonSchemaUriError';
import { isHttpUrl } from '../../../util/url';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1SwaggerClientDereferenceVisitor = stampit({
  props: {
    indirections: null,
    visited: null,
    namespace: null,
    reference: null,
    options: null,
    useCircularStructures: true,
  },
  init({
    indirections = [],
    visited = new WeakSet(),
    reference,
    namespace,
    options,
    useCircularStructures,
    allowMetaPatches,
  }) {
    this.indirections = indirections;
    this.visited = visited;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
    this.useCircularStructures = useCircularStructures;
    this.allowMetaPatches = allowMetaPatches;
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

    async ReferenceElement(referenceElement: ReferenceElement) {
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referenceElement)) {
        return false;
      }

      // @ts-ignore
      const reference = await this.toReference(referenceElement.$ref.toValue());

      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(referenceElement.$ref?.toValue());

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
      const visitor: any = OpenApi3_1SwaggerClientDereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        allowMetaPatches: this.allowMetaPatches,
      });
      fragment = await visitAsync(fragment, visitor, { keyMap, nodeTypeGetter: getNodeType });

      fragment = fragment.clone();

      // annotate fragment with info about original Reference element
      fragment.setMetaProperty('ref-fields', {
        $ref: referenceElement.$ref?.toValue(),
        // @ts-ignore
        description: referenceElement.description?.toValue(),
        // @ts-ignore
        summary: referenceElement.summary?.toValue(),
      });
      // annotate fragment with info about origin
      fragment.setMetaProperty('ref-origin', reference.uri);

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

      // apply meta patches
      if (this.allowMetaPatches && isObjectElement(fragment)) {
        const objectFragment = fragment as ObjectElement;
        // apply meta patch only when not already applied
        if (typeof objectFragment.get('$$ref') === 'undefined') {
          const absoluteJSONPointerURL = url.resolve(
            reference.uri,
            referenceElement.$ref?.toValue(),
          );
          objectFragment.set('$$ref', absoluteJSONPointerURL);
        }
      }

      this.indirections.pop();

      // transclude the element for a fragment
      return fragment;
    },

    async PathItemElement(pathItemElement: PathItemElement) {
      // ignore PathItemElement without $ref field
      if (!isStringElement(pathItemElement.$ref)) {
        return undefined;
      }

      // ignore resolving external Path Item Elements
      if (!this.options.resolve.external && isPathItemElementExternal(pathItemElement)) {
        return undefined;
      }

      // @ts-ignore
      const reference = await this.toReference(pathItemElement.$ref.toValue());

      this.indirections.push(pathItemElement);

      const jsonPointer = uriToPointer(pathItemElement.$ref?.toValue());

      // possibly non-semantic referenced element
      let referencedElement = jsonPointerEvaluate(jsonPointer, reference.value.result);

      // applying semantics to a referenced element
      if (isPrimitiveElement(referencedElement)) {
        referencedElement = PathItemElement.refract(referencedElement);
      }

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

      // dive deep into the referenced element
      const visitor: any = OpenApi3_1SwaggerClientDereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        allowMetaPatches: this.allowMetaPatches,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

      this.indirections.pop();

      // merge fields from referenced Path Item with referencing one
      const mergedResult = new PathItemElement(
        // @ts-ignore
        [...referencedElement.content],
        referencedElement.meta.clone(),
        referencedElement.attributes.clone(),
      );
      // existing keywords from referencing PathItemElement overrides ones from referenced element
      pathItemElement.forEach((value: Element, key: Element, item: Element) => {
        mergedResult.remove(key.toValue());
        mergedResult.content.push(item);
      });
      mergedResult.remove('$ref');

      // annotate referenced element with info about original referencing element
      mergedResult.setMetaProperty('ref-fields', {
        $ref: pathItemElement.$ref?.toValue(),
      });
      // annotate referenced element with info about origin
      mergedResult.setMetaProperty('ref-origin', reference.uri);

      // apply meta patches
      if (this.allowMetaPatches) {
        // apply meta patch only when not already applied
        if (typeof mergedResult.get('$$ref') === 'undefined') {
          const absoluteJSONPointerURL = url.resolve(
            reference.uri,
            pathItemElement.$ref?.toValue(),
          );
          mergedResult.set('$$ref', absoluteJSONPointerURL);
        }
      }

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

      // compute baseURI using rules around $id and $ref keywords
      const baseURI = resolveInherited$id(this.reference.uri, referencingElement);
      const file = File({ uri: baseURI });
      const isUnknownURI = none((r: IResolver) => r.canRead(file), this.options.resolve.resolvers);
      const isURL = !isUnknownURI;
      const isExternal = this.reference.uri !== baseURI && isURL;

      // ignore resolving external Schema Objects
      if (!this.options.resolve.external && isExternal) {
        // mark current referencing schema as visited
        this.visited.add(referencingElement);
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      this.indirections.push(referencingElement);

      // determining reference, proper evaluation and selection mechanism
      const $refValue = referencingElement.$ref?.toValue();
      let reference: IReference;
      let referencedElement;

      try {
        if (isUnknownURI || isURL) {
          // we're dealing with canonical URI or URL with possible fragment
          reference = this.reference;
          const selector = url.resolve(reference.uri, $refValue);
          referencedElement = uriEvaluate(
            selector,
            // @ts-ignore
            maybeRefractToSchemaElement(reference.value.result),
          );
        } else if (isAnchor(uriToAnchor($refValue))) {
          // we're dealing with JSON Schema $anchor here
          reference = await this.toReference(url.unsanitize(baseURI));
          const selector = uriToAnchor($refValue);
          referencedElement = $anchorEvaluate(
            selector,
            // @ts-ignore
            maybeRefractToSchemaElement(reference.value.result),
          );
        } else {
          // we're assuming here that we're dealing with JSON Pointer here
          reference = await this.toReference(url.unsanitize(baseURI));
          const selector = uriToPointer($refValue);
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
          if (isAnchor(uriToAnchor($refValue))) {
            // we're dealing with JSON Schema $anchor here
            reference = await this.toReference(url.unsanitize(baseURI));
            const selector = uriToAnchor($refValue);
            referencedElement = $anchorEvaluate(
              selector,
              // @ts-ignore
              maybeRefractToSchemaElement(reference.value.result),
            );
          } else {
            // we're assuming here that we're dealing with JSON Pointer here
            reference = await this.toReference(url.unsanitize(baseURI));
            const selector = uriToPointer($refValue);
            referencedElement = maybeRefractToSchemaElement(
              // @ts-ignore
              jsonPointerEvaluate(selector, reference.value.result),
            );
          }
        } else {
          throw error;
        }
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

      // detect possible cycle and avoid it
      if (!this.useCircularStructures && this.visited.has(referencedElement)) {
        // make the referencing URL absolute if possible
        if (isHttpUrl(reference.uri) && isStringElement(referencingElement.$ref)) {
          const absoluteJSONPointerURL = url.resolve(
            reference.uri,
            referencingElement.$ref?.toValue(),
          );
          referencingElement.set('$ref', absoluteJSONPointerURL);
        }
        // skip processing this node
        return false;
      }

      // dive deep into the fragment
      const visitor: any = OpenApi3_1SwaggerClientDereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        visited: this.visited,
        useCircularStructures: this.useCircularStructures,
        allowMetaPatches: this.allowMetaPatches,
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

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
      referencingElement.forEach((value: Element, key: Element, item: Element) => {
        mergedResult.remove(key.toValue());
        mergedResult.content.push(item);
      });
      mergedResult.remove('$ref');

      // annotate referenced element with info about original referencing element
      mergedResult.setMetaProperty('ref-fields', {
        $ref: referencingElement.$ref?.toValue(),
      });
      // annotate fragment with info about origin
      mergedResult.setMetaProperty('ref-origin', reference.uri);
      // apply meta patches
      if (this.allowMetaPatches) {
        // apply meta patch only when not already applied
        if (typeof mergedResult.get('$$ref') === 'undefined') {
          const absoluteJSONPointerURL = url.resolve(
            reference.uri,
            referencingElement.$ref?.toValue(),
          );
          mergedResult.set('$$ref', absoluteJSONPointerURL);
        }
      }

      // transclude referencing element with merged referenced element
      return mergedResult;
    },
  },
});

export default OpenApi3_1SwaggerClientDereferenceVisitor;
