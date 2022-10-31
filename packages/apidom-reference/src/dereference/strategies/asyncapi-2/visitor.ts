import stampit from 'stampit';
import { propEq } from 'ramda';
import { isPrimitiveElement, isStringElement, visit, Element } from '@swagger-api/apidom-core';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  ChannelItemElement,
  SchemaElement,
  isReferenceElementExternal,
  isChannelItemElementExternal,
} from '@swagger-api/apidom-ns-asyncapi-2';

import { Reference as IReference } from '../../../types';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const AsyncApi2DereferenceVisitor = stampit({
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
      const reference = await this.toReference(referencingElement.$ref?.toValue());

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer(referencingElement.$ref?.toValue());

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
      const visitor = AsyncApi2DereferenceVisitor({
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
        $ref: referencingElement.$ref?.toValue(),
      });
      // annotate fragment with info about origin
      referencedElement.setMetaProperty('ref-origin', reference.uri);

      // transclude referencing element with merged referenced element
      return referencedElement;
    },

    async ChannelItemElement(channelItemElement: ChannelItemElement) {
      // ignore ChannelItemElement without $ref field
      if (!isStringElement(channelItemElement.$ref)) {
        return undefined;
      }

      // ignore resolving external ChannelItem Elements
      if (!this.options.resolve.external && isChannelItemElementExternal(channelItemElement)) {
        return undefined;
      }

      // @ts-ignore
      const reference = await this.toReference(channelItemElement.$ref?.toValue());

      this.indirections.push(channelItemElement);

      const jsonPointer = uriToPointer(channelItemElement.$ref?.toValue());

      // possibly non-semantic referenced element
      let referencedElement = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a referenced element
      if (isPrimitiveElement(referencedElement)) {
        referencedElement = ChannelItemElement.refract(referencedElement);
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
      const visitor: any = AsyncApi2DereferenceVisitor({
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

      // merge fields from referenced Channel Item with referencing one
      const mergedResult = new ChannelItemElement(
        // @ts-ignore
        [...referencedElement.content],
        referencedElement.meta.clone(),
        referencedElement.attributes.clone(),
      );
      // existing keywords from referencing ChannelItemElement overrides ones from referenced ChannelItemElement
      channelItemElement.forEach((value: Element, key: Element, item: Element) => {
        mergedResult.remove(key.toValue());
        mergedResult.content.push(item);
      });
      mergedResult.remove('$ref');

      // annotate referenced element with info about original referencing element
      mergedResult.setMetaProperty('ref-fields', {
        $ref: channelItemElement.$ref?.toValue(),
      });
      // annotate referenced with info about origin
      mergedResult.setMetaProperty('ref-origin', reference.uri);

      // transclude referencing element with merged referenced element
      return mergedResult;
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
  },
});

export default AsyncApi2DereferenceVisitor;
