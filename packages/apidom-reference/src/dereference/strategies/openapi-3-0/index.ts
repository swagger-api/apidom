import stampit from 'stampit';
import { defaultTo, propEq } from 'ramda';
import { createNamespace, visit, Element } from '@swagger-api/apidom-core';
import openApi3_0Namespace, {
  getNodeType,
  isOpenApi3_0Element,
  keyMap,
  mediaTypes,
} from '@swagger-api/apidom-ns-openapi-3-0';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
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
      canDereference(file: IFile): boolean {
        // assert by media type
        if (file.mediaType !== 'text/plain') {
          return mediaTypes.includes(file.mediaType);
        }

        // assert by inspecting ApiDOM
        return isOpenApi3_0Element(file.parseResult?.api);
      },

      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(openApi3_0Namespace);
        const refSet = defaultTo(ReferenceSet(), options.dereference.refSet);
        let reference;

        if (!refSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          refSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = refSet.find(propEq(file.uri, 'uri'));
        }

        const visitor = OpenApi3_0DereferenceVisitor({ reference, namespace, options });
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

export default OpenApi3_0DereferenceStrategy;
