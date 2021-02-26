import util from 'util';
import path from 'path';
import stampit from 'stampit';
import { hasIn, pathSatisfies, propEq } from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { toValue, visit, createNamespace, isPrimitiveElement } from 'apidom';
import openApi3_1Namespace, {
  keyMap,
  getNodeType,
  ReferenceElement,
  isReferenceLikeElement,
} from 'apidom-ns-openapi-3-1';

import { parse } from '../src';
import ReferenceSet from '../src/ReferenceSet';
import Reference from '../src/Reference';
import * as url from '../src/util/url';
import { evaluate, uriToPointer } from '../src/selectors/json-pointer';
import { Reference as IReference } from '../src/types';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const DereferenceVisitor = stampit({
  props: {
    indirections: [],
    namespace: null,
    reference: null,
  },
  init({ reference, namespace, indirections = [] }) {
    this.indirections = indirections;
    this.namespace = namespace;
    this.reference = reference;
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
      const parseResult = await parse(baseURI);

      return Reference({ uri: baseURI, value: parseResult.first, refSet });
    },

    async ReferenceElement(referenceElement: ReferenceElement) {
      const reference = await this.toReference(referenceElement.$ref.toValue());

      this.indirections.push(referenceElement);

      const jsonPointer = uriToPointer(referenceElement.$ref.toValue());

      // possibly non-semantic fragment
      let fragment = evaluate(jsonPointer, reference.value);

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
      const visitor = DereferenceVisitor({
        reference,
        namespace: this.namespace,
        indirections: [...this.indirections],
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

describe('dereference', function () {
  specify('should dereference', async function () {
    const fixturePath = path.join(__dirname, 'fixtures', 'dereference', 'reference-objects.json');
    const { api } = await parse(fixturePath, {
      parse: { mediaType: 'application/vnd.oai.openapi+json;version=3.1.0' },
    });
    const namespace = createNamespace(openApi3_1Namespace);
    const reference = Reference({ uri: fixturePath, value: api });
    const visitor = DereferenceVisitor({ reference, namespace });
    const refSet = ReferenceSet();
    refSet.add(reference);

    const dereferenced = await visitAsync(refSet.rootRef.value, visitor, {
      keyMap,
      nodeTypeGetter: getNodeType,
    });

    // @ts-ignore
    console.log(util.inspect(toValue(dereferenced), true, null, true));
  });
});
