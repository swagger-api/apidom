import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { isPrimitiveElement, visit } from 'apidom';
import {
  getNodeType,
  isReferenceLikeElement,
  keyMap,
  ReferenceElement,
} from 'apidom-ns-openapi-3-1';

import { Reference as IReference } from '../../../types';
import * as url from '../../../util/url';
import parse from '../../../parse';
import Reference from '../../../Reference';
import { evaluate, uriToPointer } from '../../../selectors/json-pointer';

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

      // register new Reference with ReferenceSet
      const parseResult = await parse(baseURI, this.options);

      return Reference({ uri: baseURI, value: parseResult, refSet });
    },

    async ReferenceElement(referenceElement: ReferenceElement) {
      const reference = await this.toReference(referenceElement.$ref.toValue());

      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(referenceElement.$ref.toValue());

      // possibly non-semantic fragment
      let fragment = evaluate(jsonPointer, reference.value.result);

      // applying semantics to a fragment
      if (referenceElement.meta.hasKey('referenced-element') && isPrimitiveElement(fragment)) {
        if (isReferenceLikeElement(fragment)) {
          // handling indirect references
          fragment = ReferenceElement.refract(fragment);
        } else {
          // handling direct references
          const elementType = referenceElement.meta.get('referenced-element').toValue();
          const ElementClass = this.namespace.getElementClass(elementType);
          fragment = ElementClass.refract(fragment);
        }
      }

      // detect direct or circular reference
      if (this.indirections.includes(fragment)) {
        throw new Error('Recursive JSON Pointer detected');
      }

      // dive deep into the fragment
      const visitor = OpenApi3_1DereferenceVisitor({
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
  },
});

export default OpenApi3_1DereferenceVisitor;
