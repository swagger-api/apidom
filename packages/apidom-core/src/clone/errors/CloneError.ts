import { ApiDOMStructuredError } from '@swagger-api/apidom-error';
import type { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

interface CloneErrorOptions extends ApiDOMErrorOptions {
  readonly value: unknown;
}

class CloneError extends ApiDOMStructuredError {
  public readonly value: unknown;

  constructor(message?: string, structuredOptions?: CloneErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.value = structuredOptions.source;
    }
  }
}

export default CloneError;
