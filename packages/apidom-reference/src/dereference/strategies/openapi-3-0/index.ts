import stampit from 'stampit';
import { Element, createNamespace, visit, cloneDeep } from '@swagger-api/apidom-core';
import openApi3_0Namespace, {
  getNodeType,
  isOpenApi3_0Element,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import File from '../../../File';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import OpenApi3_0DereferenceVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_0DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit(
  DereferenceStrategy,
  {
    init() {
      this.name = 'openapi-3-0';
    },
    methods: {
      canDereference(file: File): boolean {
        // assert by media type
        if (file.mediaType !== 'text/plain') {
          return mediaTypes.includes(file.mediaType);
        }

        // assert by inspecting ApiDOM
        return isOpenApi3_0Element(file.parseResult?.api);
      },

      async dereference(file: File, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(openApi3_0Namespace);
        const immutableRefSet = options.dereference.refSet ?? new ReferenceSet();
        const mutableRefsSet = new ReferenceSet();
        let refSet = immutableRefSet;
        let reference;

        // determine the initial reference
        if (!immutableRefSet.has(file.uri)) {
          reference = new Reference({ uri: file.uri, value: file.parseResult! });
          immutableRefSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = immutableRefSet.find((ref) => ref.uri === file.uri);
        }

        /**
         * Clone refSet due the dereferencing process being mutable.
         * We don't want to mutate the original refSet and the references.
         */
        if (options.dereference.immutable) {
          immutableRefSet.refs
            .map(
              (ref) =>
                new Reference({
                  ...ref,
                  value: cloneDeep(ref.value),
                }),
            )
            .forEach((ref) => mutableRefsSet.add(ref));
          reference = mutableRefsSet.find((ref) => ref.uri === file.uri);
          refSet = mutableRefsSet;
        }

        const visitor = OpenApi3_0DereferenceVisitor({ reference, namespace, options });
        const dereferencedElement = await visitAsync(refSet.rootRef!.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        /**
         * If immutable option is set, replay refs from the refSet.
         */
        if (options.dereference.immutable) {
          mutableRefsSet.refs
            .filter((ref) => ref.uri.startsWith('immutable://'))
            .map(
              (ref) =>
                new Reference({
                  ...ref,
                  uri: ref.uri.replace(/^immutable:\/\//, ''),
                }),
            )
            .forEach((ref) => immutableRefSet.add(ref));
          reference = immutableRefSet.find((ref) => ref.uri === file.uri);
          refSet = immutableRefSet;
        }

        /**
         * Release all memory if this refSet was not provided as a configuration option.
         * If provided as configuration option, then provider is responsible for cleanup.
         */
        if (options.dereference.refSet === null) {
          immutableRefSet.clean();
        }

        mutableRefsSet.clean();

        return dereferencedElement;
      },
    },
  },
);

export default OpenApi3_0DereferenceStrategy;
