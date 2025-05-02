import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import JsonPointerError from './JsonPointerError.ts';

/**
 * @public
 * @deprecated
 */
export interface InvalidJsonPointerErrorOptions extends ApiDOMErrorOptions {
  readonly pointer: string;
}

/**
 * @public
 * @deprecated
 */
class InvalidJsonPointerError extends JsonPointerError {
  public readonly pointer!: string;

  constructor(message?: string, structuredOptions?: InvalidJsonPointerErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.pointer = structuredOptions.pointer;
    }
  }
}

export default InvalidJsonPointerError;
