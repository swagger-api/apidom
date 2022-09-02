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
    visited: null,
    namespace: null,
    reference: null,
    options: null,
  },
  init({
    indirections = [],
    visited = { SchemaElement: new WeakSet(), ReferenceElement: new WeakSet() },
    reference,
    namespace,
    options,
  }) {
    this.indirections = indirections;
    this.visited = visited;
    this.namespace = namespace;
    this.reference = reference;
    this.options = options;
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

    async ReferenceElement(referencingElement: ReferenceElement) {
      /**
       * Skip traversal for already visited ReferenceElement.
       * visit function detects cycles in path automatically.
       */
      if (this.visited.ReferenceElement.has(referencingElement)) {
        return undefined;
      }

      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isReferenceElementExternal(referencingElement)) {
        // mark current referencing schema as visited
        this.visited.ReferenceElement.add(referencingElement);
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      // @ts-ignore
      const reference = await this.toReference(referencingElement.$ref.toValue());

      this.indirections.push(referencingElement);

      // @ts-ignore
      const jsonPointer = uriToPointer(referencingElement.$ref.toValue());

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

      // mark current ReferenceElement as visited
      this.visited.ReferenceElement.add(referencingElement);

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

      // dive deep into the fragment
      const visitor = OpenApi3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
        // ReferenceElement must be reset for deep dive, as we want to dereference all indirections
        visited: { SchemaElement: this.visited.SchemaElement, ReferenceElement: new WeakSet() },
      });
      referencedElement = await visitAsync(referencedElement, visitor, {
        keyMap,
        nodeTypeGetter: getNodeType,
      });

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

    async SchemaElement(schemaElement: SchemaElement) {
      /**
       * Skip traversal for already visited schemas and all their child schemas.
       * visit function detects cycles in path automatically.
       */
      if (this.visited.SchemaElement.has(schemaElement)) {
        return false;
      }

      this.visited.SchemaElement.add(schemaElement);

      return undefined;
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

      // dive deep into the referenced element
      const visitor: any = OpenApi3_0DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
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
  },
});

export default OpenApi3_0DereferenceVisitor;
