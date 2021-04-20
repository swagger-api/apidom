import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { isPrimitiveElement, isStringElement, visit, MemberElement } from 'apidom';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
  SchemaElement,
  isReferenceElementExternal,
  isSchemaElementExternal,
} from 'apidom-ns-openapi-3-1';

import { Reference as IReference } from '../../../types';
import { evaluate, uriToPointer } from '../../../selectors/json-pointer';
import { MaximumDereferenceDepthError, MaximumResolverDepthError } from '../../../util/errors';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const OpenApi3_1DereferenceVisitor = stampit({
  props: {
    indirections: [],
    namespace: null,
    reference: null,
    options: null,
  },
  init({ reference, namespace, indirections = [], options }) {
    this.indirections = indirections;
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

      const uriWithoutHash = url.stripHash(uri);
      const sanitizedURI = url.isFileSystemPath(uriWithoutHash)
        ? url.fromFileSystemPath(uriWithoutHash)
        : uriWithoutHash;
      const baseURI = url.resolve(this.reference.uri, sanitizedURI);
      const { refSet } = this.reference;

      // we've already processed this Reference in past
      if (refSet.has(baseURI)) {
        return refSet.find(propEq('uri', baseURI));
      }

      const parseResult = await parse(baseURI, {
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

      const jsonPointer = uriToPointer(referenceElement.$ref.toValue());

      // possibly non-semantic fragment
      let fragment = evaluate(jsonPointer, reference.value.result);

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

      // detect direct or circular reference
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
      const visitor: any = OpenApi3_1DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
        options: this.options,
      });
      fragment = await visitAsync(fragment, visitor, { keyMap, nodeTypeGetter: getNodeType });

      // override description and summary (outer has higher priority then inner)
      const hasDescription = pathSatisfies(isNotUndefined, ['description'], referenceElement);
      const hasSummary = pathSatisfies(isNotUndefined, ['summary'], referenceElement);
      if (hasDescription || hasSummary) {
        fragment = fragment.clone();

        if (hasDescription && hasIn('description', fragment)) {
          // @ts-ignore
          fragment.description = referenceElement.description;
        }
        if (hasSummary && hasIn('summary', fragment)) {
          // @ts-ignore
          fragment.summary = referenceElement.summary;
        }
      }

      this.indirections.pop();

      // transclude the element for a fragment
      return fragment;
    },

    async SchemaElement(referencingElement: SchemaElement, ...rest: any[]) {
      const [, , , ancestors] = rest;

      // skip current referencing schema as $ref keyword was not defined
      if (!isStringElement(referencingElement.$ref)) {
        return undefined;
      }
      // ignore resolving external Reference Objects
      if (!this.options.resolve.external && isSchemaElementExternal('$ref', referencingElement)) {
        return undefined;
      }

      // @ts-ignore
      const reference = await this.toReference(referencingElement.$ref.toValue());

      this.indirections.push(referencingElement);

      const jsonPointer = uriToPointer(referencingElement.$ref?.toValue());

      // possibly non-semantic fragment
      let refractedReferenceResult;
      let referencedElement;

      if (isPrimitiveElement(reference.value.result)) {
        // applying semantics to a fragment
        refractedReferenceResult = SchemaElement.refract(reference.value.result);
        // @ts-ignore
        referencedElement = evaluate(jsonPointer, refractedReferenceResult);
      } else {
        // here we're assuming that result reference.value.result is already Schema Element
        referencedElement = evaluate(jsonPointer, reference.value.result);
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

      // skip deep diving if referenced schema is ancestor of referencing schema
      if (!ancestors.includes(referencedElement)) {
        const { result: originalReferenceResult } = reference.value;

        // avoid repeated refracting by overriding reference value result
        if (refractedReferenceResult !== undefined) {
          refractedReferenceResult.classes.push('result');
          const index = reference.value.content.indexOf(originalReferenceResult);
          reference.value.set(index, refractedReferenceResult);
        }

        // dive deep into the fragment
        const visitor: any = OpenApi3_1DereferenceVisitor({
          reference,
          namespace: this.namespace,
          indirections: [...this.indirections],
          options: this.options,
        });
        referencedElement = await visitAsync(referencedElement, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        // return reference value result to it's original form
        if (refractedReferenceResult !== undefined) {
          const index = reference.value.content.indexOf(refractedReferenceResult);
          reference.value.set(index, originalReferenceResult);
        }
      }

      this.indirections.pop();

      // remove $ref keyword from referenced schema to avoid recursion
      referencingElement.remove('$ref');

      // merge keywords from referenced schema into referencing schema
      referencedElement.forEach((value: any, key: any, member: MemberElement) => {
        // existing keywords in referencing schema are overridden from referenced schema
        referencingElement.remove(key.toValue());
        referencingElement.content.push(member);
      });

      // skip traversing all children of the referencing schema
      return false;
    },
  },
});

export default OpenApi3_1DereferenceVisitor;
