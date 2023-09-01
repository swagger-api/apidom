import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import RelativeJsonPointerError from './RelativeJsonPointerError';

export interface InvalidRelativeJsonPointerErrorOptions extends ApiDOMErrorOptions {
  readonly relativePointer: string;
}

export default class InvalidRelativeJsonPointerError extends RelativeJsonPointerError {
  public readonly relativePointer!: string;

  constructor(message?: string, structuredOptions?: InvalidRelativeJsonPointerErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.relativePointer = structuredOptions.relativePointer;
    }
  }
}
