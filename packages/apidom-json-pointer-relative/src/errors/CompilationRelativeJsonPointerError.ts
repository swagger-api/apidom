import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import { RelativeJsonPointer } from '../types';
import RelativeJsonPointerError from './RelativeJsonPointerError';

export interface CompilationRelativeJsonPointerErrorOptions extends ApiDOMErrorOptions {
  readonly relativePointer: RelativeJsonPointer;
}

class CompilationRelativeJsonPointerError extends RelativeJsonPointerError {
  public readonly nonNegativeIntegerPrefix!: number;

  public readonly indexManipulation?: number;

  public readonly jsonPointerTokens?: string[];

  public readonly hashCharacter?: boolean;

  constructor(message?: string, structuredOptions?: CompilationRelativeJsonPointerErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.nonNegativeIntegerPrefix = structuredOptions.relativePointer.nonNegativeIntegerPrefix;
      this.indexManipulation = structuredOptions.relativePointer.indexManipulation;
      this.hashCharacter = structuredOptions.relativePointer.hashCharacter;
      if (Array.isArray(structuredOptions.relativePointer.jsonPointerTokens)) {
        this.jsonPointerTokens = [...structuredOptions.relativePointer.jsonPointerTokens];
      }
    }
  }
}

export default CompilationRelativeJsonPointerError;
