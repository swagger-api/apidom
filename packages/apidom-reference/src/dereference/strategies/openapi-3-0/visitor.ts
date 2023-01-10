import stampit from 'stampit';
import { propEq } from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import {
  Element,
  isPrimitiveElement,
  isStringElement,
  visit,
  find,
} from '@swagger-api/apidom-core';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  SchemaElement,
  ExampleElement,
  LinkElement,
  OperationElement,
  PathItemElement,
  isOperationElement,
  isReferenceElementExternal,
  isPathItemElementExternal,
  isLinkElementExternal,
} from '@swagger-api/apidom-ns-openapi-3-0';

import { Reference as IReference } from '../../../types';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0DereferenceVisitor = stampit({
  props: {
    indirections: [],
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
    async toReference(uri: string): Promise<IReference> {
      // detect maximum depth of resolution
      if (this.reference.depth >= this.options.resolve.maxDepth) {
        throw new MaximumResolverDepthError(
          `Maximum resolution depth of ${this.options.resolve.maxDepth} has been exceeded by file "${this.reference.uri}"`,
        );
      }

      const baseURI = url.resolve(this.reference.uri, url.sanitize(url.stripHash(uri)));

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

    toAncestorLineage(ancestors) {
      /**
       * Compute full ancestors lineage.
       * Ancestors are flatten to unwrap all Element instances.
       */
      const directAncestors = new WeakSet(ancestors.flat());
      const ancestorsLineage = [...this.ancestors, directAncestors];

      return [ancestorsLineage, directAncestors];
    },

    async ReferenceElement(
      referencingElement: ReferenceElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage(ancestors);

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.some((ancs: WeakSet<Element>) => ancs.has(referencingElement))) {
        // skip processing this schema and all it's child schemas
        return false;
      }

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referencingElement)) {
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      const reference = await this.toReference(referencingElement.$ref?.toValue());
      const retrievalURI = reference.uri;
      const $refBaseURI = url.resolve(retrievalURI, referencingElement.$ref?.toValue());

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = evaluate(jsonPointer, reference.value.result);

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

      // detect direct or circular reference
      if (this.indirections.includes(referencedElement)) {
        throw new Error('Recursive JSON Pointer detected');
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
      const visitor = OpenApi3_0DereferenceVisitor({
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

      // @ts-ignore
      referencedElement = new referencedElement.constructor( // shallow clone of the referenced element
        referencedElement.content,
        referencedElement.meta.clone(),
        referencedElement.attributes.clone(),
      );

      // annotate referenced element with info about original referencing element
      referencedElement.setMetaProperty('ref-fields', {
        // @ts-ignore
        $ref: referencingElement.$ref.toValue(),
      });
      // annotate fragment with info about origin
      referencedElement.setMetaProperty('ref-origin', reference.uri);

      // transclude referencing element with merged referenced element
      return referencedElement;
    },

    async PathItemElement(
      referencingElement: PathItemElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage(ancestors);

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
      let referencedElement = evaluate(jsonPointer, reference.value.result);

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

      // append referencing schema to ancestors lineage
      directAncestors.add(referencingElement);

      // dive deep into the referenced element
      const visitor: any = OpenApi3_0DereferenceVisitor({
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
        operationElement = evaluate(jsonPointer, reference.value.result);
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
      const [ancestorsLineage] = this.toAncestorLineage(ancestors);

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.some((ancs: WeakSet<Element>) => ancs.has(referencingElement))) {
        // skip processing this schema and all it's child schemas
        return false;
      }

      return undefined;
    },
  },
});

export default OpenApi3_0DereferenceVisitor;
