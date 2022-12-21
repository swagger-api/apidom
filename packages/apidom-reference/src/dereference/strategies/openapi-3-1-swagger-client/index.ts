import stampit from 'stampit';
import { defaultTo, propEq } from 'ramda';
import { createNamespace, visit, Element } from '@swagger-api/apidom-core';
import openApi3_1Namespace, { getNodeType, keyMap } from '@swagger-api/apidom-ns-openapi-3-1';

import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import OpenApi3_1SwaggerClientDereferenceVisitor from './visitor';
import OpenApi3_1DereferenceStrategy from '../openapi-3-1';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IOpenApi3_1SwaggerClientDereferenceStrategy extends IDereferenceStrategy {
  useCircularStructures: boolean;
  allowMetaPatches: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1SwaggerClientDereferenceStrategy: stampit.Stamp<IOpenApi3_1SwaggerClientDereferenceStrategy> =
  stampit(OpenApi3_1DereferenceStrategy, {
    props: {
      useCircularStructures: true,
      allowMetaPatches: false,
    },
    init(
      this: IOpenApi3_1SwaggerClientDereferenceStrategy,
      {
        useCircularStructures = this.useCircularStructures,
        allowMetaPatches = this.allowMetaPatches,
      } = {},
    ) {
      // @ts-ignore
      this.name = 'openapi-3-1-swagger-client';
      this.useCircularStructures = useCircularStructures;
      this.allowMetaPatches = allowMetaPatches;
    },
    methods: {
      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(openApi3_1Namespace);
        const refSet = defaultTo(ReferenceSet(), options.dereference.refSet);
        let reference;

        if (!refSet.has(file.uri)) {
          reference = Reference({ uri: file.uri, value: file.parseResult });
          refSet.add(reference);
        } else {
          // pre-computed refSet was provided as configuration option
          reference = refSet.find(propEq('uri', file.uri));
        }

        const visitor = OpenApi3_1SwaggerClientDereferenceVisitor({
          reference,
          namespace,
          options,
          useCircularStructures: this.useCircularStructures,
          allowMetaPatches: this.allowMetaPatches,
        });
        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        /**
         * Release all memory if this refSet was not provided as a configuration option.
         * If provided as configuration option, then provider is responsible for cleanup.
         */
        if (options.dereference.refSet === null) {
          refSet.clean();
        }

        return dereferencedElement;
      },
    },
  });

export default OpenApi3_1SwaggerClientDereferenceStrategy;
