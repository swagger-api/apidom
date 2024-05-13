import { ParseResultElement } from '@swagger-api/apidom-core';
import { mediaTypes, isOpenApi3_1Element } from '@swagger-api/apidom-ns-openapi-3-1';

import File from '../../../File';
import BundleStrategy, { BundleStrategyOptions } from '../BundleStrategy';

export interface OpenAPI3_1BundleStrategyOptions extends Omit<BundleStrategyOptions, 'name'> {}

class OpenAPI3_1BundleStrategy extends BundleStrategy {
  constructor(options?: OpenAPI3_1BundleStrategyOptions) {
    super({ ...(options ?? {}), name: 'openapi-3-1' });
  }

  canBundle(file: File): boolean {
    // assert by media type
    if (file.mediaType !== 'text/plain') {
      return mediaTypes.includes(file.mediaType);
    }

    // assert by inspecting ApiDOM
    return isOpenApi3_1Element(file.parseResult?.result);
  }

  async bundle(file: File): Promise<ParseResultElement> {
    return file.parseResult!;
  }
}

export default OpenAPI3_1BundleStrategy;
