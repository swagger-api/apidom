import stampit from 'stampit';
import { isNonEmptyString } from 'ramda-adjunct';
import { createNamespace, visit, Element } from 'apidom';
import openApi3_1Namespace, {
  getNodeType,
  isOpenApi3_1Element,
  keyMap,
} from 'apidom-ns-openapi-3-1';

import DereferenceStrategy from '../DereferenceStrategy';
import {
  DereferenceStrategy as IDereferenceStrategy,
  File as IFile,
  ReferenceOptions as IReferenceOptions,
} from '../../../types';
import Reference from '../../../Reference';
import ReferenceSet from '../../../ReferenceSet';
import OpenApi3_1DereferenceVisitor from './visitor';

// @ts-ignore
const visitAsync = visit[Symbol.for('nodejs.util.promisify.custom')];

const OpenApi3_1DereferenceStrategy: stampit.Stamp<IDereferenceStrategy> = stampit(
  DereferenceStrategy,
  {
    methods: {
      canDereference(file: IFile): boolean {
        // assert by media type
        if (isNonEmptyString(file.mediaType)) {
          return [
            'application/vnd.oai.openapi;version=3.1.0',
            'application/vnd.oai.openapi+json;version=3.1.0',
            'application/vnd.oai.openapi+yaml;version=3.1.0',
          ].includes(file.mediaType);
        }

        // assert by inspecting ApiDOM
        return isOpenApi3_1Element(file.parseResult?.api);
      },

      async dereference(file: IFile, options: IReferenceOptions): Promise<Element> {
        const namespace = createNamespace(openApi3_1Namespace);
        const reference = Reference({ uri: file.uri, value: file.parseResult });
        const visitor = OpenApi3_1DereferenceVisitor({ reference, namespace, options });
        const refSet = ReferenceSet();
        refSet.add(reference);

        const dereferencedElement = await visitAsync(refSet.rootRef.value, visitor, {
          keyMap,
          nodeTypeGetter: getNodeType,
        });

        // release all memory
        refSet.clean();

        return dereferencedElement;
      },
    },
  },
);

export default OpenApi3_1DereferenceStrategy;
