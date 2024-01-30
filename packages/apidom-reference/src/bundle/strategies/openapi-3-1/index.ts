import stampit from 'stampit';
import { ParseResultElement } from '@swagger-api/apidom-core';
import { mediaTypes, isOpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import BundleStrategy from '../BundleStrategy';
import { BundleStrategy as IBundleStrategy, File as IFile } from '../../../types';

// eslint-disable-next-line @typescript-eslint/naming-convention
const OpenApi3_1BundleStrategy: stampit.Stamp<IBundleStrategy> = stampit(BundleStrategy, {
  init() {
    this.name = 'openapi-3-1';
  },
  methods: {
    canBundle(file: IFile): boolean {
      // assert by media type
      if (file.mediaType !== 'text/plain') {
        return mediaTypes.includes(file.mediaType);
      }

      // assert by inspecting ApiDOM
      return isOpenApi3_1Element(file.parseResult?.result);
    },

    async bundle(file: IFile): Promise<ParseResultElement> {
      return file.parseResult;
    },
  },
});

export default OpenApi3_1BundleStrategy;
