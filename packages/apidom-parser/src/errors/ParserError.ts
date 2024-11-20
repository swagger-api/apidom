import { ApiDOMStructuredError, ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import type { ApiDOMParserOptions } from '../types.d.ts';

/**
 * @public
 */
export interface ParserErrorOptions extends ApiDOMErrorOptions {
  readonly source: string;
  readonly parserOptions: ApiDOMParserOptions;
}

/**
 * @public
 */
class ParserError extends ApiDOMStructuredError {
  public readonly source!: string;

  public readonly parserOptions!: ApiDOMParserOptions;

  constructor(message?: string, structuredOptions?: ParserErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.source = structuredOptions.source;
      this.parserOptions = structuredOptions.parserOptions;
    }
  }
}

export default ParserError;
