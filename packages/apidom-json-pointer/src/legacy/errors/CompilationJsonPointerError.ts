import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import JsonPointerError from './JsonPointerError.ts';

/**
 * @public
 * @deprecated
 */
export interface CompilationJsonPointerErrorOptions extends ApiDOMErrorOptions {
  readonly tokens: string[];
}

/**
 * @public
 * @deprecated
 */
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
