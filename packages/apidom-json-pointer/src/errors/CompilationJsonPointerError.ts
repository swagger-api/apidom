import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import JsonPointerError from './JsonPointerError';

export interface CompilationJsonPointerErrorOptions extends ApiDOMErrorOptions {
  readonly tokens: string[];
}

class CompilationJsonPointerError extends JsonPointerError {
  public readonly tokens!: string[];

  constructor(message?: string, structuredOptions?: CompilationJsonPointerErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.tokens = [...structuredOptions.tokens];
    }
  }
}

export default CompilationJsonPointerError;
