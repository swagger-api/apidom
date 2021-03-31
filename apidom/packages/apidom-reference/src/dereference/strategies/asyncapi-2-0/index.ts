import stampit from 'stampit';
import { defaultTo, propEq } from 'ramda';
import { createNamespace, visit, Element } from 'apidom';
import asyncApi2_0Namespace, {
  getNodeType,
  isAsyncApi2_0Element,
  keyMap,
} from 'apidom-ns-asyncapi-2-0';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import AsyncApi2_0DereferenceVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const AsyncApi2_0DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit(
  DereferenceStrategy,
  {
    methods: {
      canDereference(file: IFile): boolean {
        // assert by media type
        if (file.mediaType !== 'text/plain') {
          return [
            'application/vnd.aai.asyncapi;version=2.0.0',
            'application/vnd.aai.asyncapi+json;version=2.0.0',
            'application/vnd.aai.asyncapi+yaml;version=2.0.0',
          ].includes(file.mediaType);
        }

        // assert by inspecting ApiDOM
        return isAsyncApi2_0Element(file.parseResult?.api);
      },

      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(asyncApi2_0Namespace);
        const refSet = defaultTo(ReferenceSet(), options.dereference.refSet);
        let reference;

        if (!refSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          refSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = refSet.find(propEq('uri', file.uri));
        }

        const visitor = AsyncApi2_0DereferenceVisitor({ reference, namespace, options });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        /**
         * Release all memory if this refSet was not provided as an configuration option.
         * If provided as configuration option, then provider is responsible for cleanup.
         */
        if (options.dereference.refSet === null) {
          refSet.clean();
        }

        return dereferencedElement;
      },
    },
  },
);

export default AsyncApi2_0DereferenceStrategy;
