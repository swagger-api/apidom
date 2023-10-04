import stampit from 'stampit';
import { propEq } from 'ramda';
import {
  cloneDeep,
  cloneShallow,
  Element,
  isElement,
  isMemberElement,
  isPrimitiveElement,
  isStringElement,
  visit,
  toValue,
} from '@swagger-api/apidom-core';
import { ApiDOMError } from '@swagger-api/apidom-error';
import { evaluate, uriToPointer } from '@swagger-api/apidom-json-pointer';
import {
  ChannelItemElement,
  getNodeType,
  isChannelItemElementExternal,
  isReferenceElementExternal,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
} from '@swagger-api/apidom-ns-asyncapi-2';

import { Reference as IReference } from '../../../types';
import MaximumDereferenceDepthError from '../../../errors/MaximumDereferenceDepthError';
import MaximumResolverDepthError from '../../../errors/MaximumResolverDepthError';
import { AncestorLineage } from '../../util';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const AsyncApi2DereferenceVisitor = stampit({
  props: {
    indirections: [],
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
    toAncestorLineage(ancestors) {
      /**
       * Compute full ancestors lineage.
       * Ancestors are flatten to unwrap all Element instances.
       */
      const directAncestors = new WeakSet(ancestors.filter(isElement));
      const ancestorsLineage = new AncestorLineage(...this.ancestors, directAncestors);

      return [ancestorsLineage, directAncestors];
    },

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
        // skip traversing this schema but traverse all it's child schemas
        return undefined;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const { uri: retrievalURI } = reference;
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic fragment
      let referencedElement = evaluate(jsonPointer, reference.value.result);

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

      // detect direct or circular reference
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
      const visitor = AsyncApi2DereferenceVisitor({
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

        // annotate referenced element with info about original referencing element
        copy.setMetaProperty('ref-fields', {
          $ref: toValue(referencingElement.$ref),
        });
        // annotate fragment with info about origin
        copy.setMetaProperty('ref-origin', reference.uri);

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

      // transclude referencing element with merged referenced element
      return mergeAndAnnotateReferencedElement(referencedElement);
    },

    async ChannelItemElement(
      referencingElement: ChannelItemElement,
      key: any,
      parent: any,
      path: any,
      ancestors: any[],
    ) {
      const [ancestorsLineage, directAncestors] = this.toAncestorLineage([...ancestors, parent]);

      // ignore ChannelItemElement without $ref field
      if (!isStringElement(referencingElement.$ref)) {
        return undefined;
      }

      // detect possible cycle in traversal and avoid it
      if (ancestorsLineage.includesCycle(referencingElement)) {
        return false;
      }

      // ignore resolving external ChannelItem Elements
      if (!this.options.resolve.external && isChannelItemElementExternal(referencingElement)) {
        return undefined;
      }

      const reference = await this.toReference(toValue(referencingElement.$ref));
      const retrievalURI = reference.uri;
      const $refBaseURI = url.resolve(retrievalURI, toValue(referencingElement.$ref));

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer($refBaseURI);

      // possibly non-semantic referenced element
      let referencedElement = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a referenced element
      if (isPrimitiveElement(referencedElement)) {
        referencedElement = ChannelItemElement.refract(referencedElement);
      }

      // detect direct or indirect reference
      if (this.indirections.includes(referencedElement)) {
        throw new ApiDOMError('Recursive Channel Item Object reference detected');
      }

      // detect maximum depth of dereferencing
      if (this.indirections.length > this.options.dereference.maxDepth) {
        throw new MaximumDereferenceDepthError(
          `Maximum dereference depth of "${this.options.dereference.maxDepth}" has been exceeded in file "${this.reference.uri}"`,
        );
      }

      // append referencing channel item to ancestors lineage
      directAncestors.add(referencingElement);

      // dive deep into the referenced element
      const visitor: any = AsyncApi2DereferenceVisitor({
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

      // remove referencing channel item from ancestors lineage
      directAncestors.delete(referencingElement);

      this.indirections.pop();

      const mergeAndAnnotateReferencedElement = <T extends Element>(
        refedElement: T,
      ): ChannelItemElement => {
        // merge fields from referenced Channel Item with referencing one
        const mergedElement = new ChannelItemElement(
          [...refedElement.content] as any,
          cloneDeep(refedElement.meta),
          cloneDeep(refedElement.attributes),
        );
        // existing keywords from referencing ChannelItemElement overrides ones from referenced ChannelItemElement
        referencingElement.forEach((value: Element, keyElement: Element, item: Element) => {
          mergedElement.remove(toValue(keyElement));
          mergedElement.content.push(item);
        });
        mergedElement.remove('$ref');

        // annotate referenced element with info about original referencing element
        mergedElement.setMetaProperty('ref-fields', {
          $ref: toValue(referencingElement.$ref),
        });
        // annotate referenced with info about origin
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

export default AsyncApi2DereferenceVisitor;
