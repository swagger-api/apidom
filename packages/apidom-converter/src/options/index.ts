import { options as referenceOptions } from '@swagger-api/apidom-reference';

import ConvertStrategy from '../strategies/ConvertStrategy';
import OpenAPI31ToOpenAPI30ConvertStrategy from '../strategies/openapi-3-1-to-openapi-3-0-3';

type ReferenceOptions = typeof referenceOptions;

interface ConvertOptions {
  strategies: Array<ConvertStrategy>;
  sourceMediaType: string;
  targetMediaType: string;
}

export interface ConverterOptions extends ReferenceOptions {
  readonly convert: ConvertOptions;
}

const defaultOptions: ConverterOptions = {
  ...referenceOptions,
  convert: {
    /**
     * Determines strategies how ApiDOM is bundled.
     * Strategy is determined by media type or by inspecting ApiDOM to be bundled.
     *
     * You can add additional bundle strategies of your own, replace an existing one with
     * your own implementation, or remove any bundle strategy by removing it from the list.
     */
    strategies: [new OpenAPI31ToOpenAPI30ConvertStrategy()],
    /**
     * Media type of source API definition.
     */
    sourceMediaType: 'text/plain',
    /**
     * Media type of target API definition.
     */
    targetMediaType: 'text/plain',
  },
};

export default defaultOptions;
