import { ApiDOMStructuredError, ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import { ApiDOMParserOptions } from '../types';

interface ParserErrorOptions extends ApiDOMErrorOptions {
  readonly source: string;
  readonly parserOptions: ApiDOMParserOptions;
}

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
