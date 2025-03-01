import { ApiDOMStructuredError } from '@swagger-api/apidom-error';
import type { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

/**
 * @public
 */
export interface ElementIdentityErrorOptions extends ApiDOMErrorOptions {
  readonly value: unknown;
}

/**
 * @public
 */
class ElementIdentityError extends ApiDOMStructuredError {
  public readonly value: unknown;

  constructor(message?: string, structuredOptions?: ElementIdentityErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.value = structuredOptions.value;
    }
  }
}

export default ElementIdentityError;
