import { Element } from '@swagger-api/apidom-core';
import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import RelativeJsonPointerError from './RelativeJsonPointerError';

export interface EvaluationRelativeJsonPointerErrorOptions<
  T extends Element,
  U extends Element,
  V extends Element,
> extends ApiDOMErrorOptions {
  readonly relativePointer: string;
  readonly currentElement: T;
  readonly rootElement: U;
  readonly cursorElement?: V;
}

class EvaluationRelativeJsonPointerError<
  T extends Element,
  U extends Element,
  V extends Element,
> extends RelativeJsonPointerError {
  public readonly relativePointer!: string;

  public readonly currentElement!: T;

  public readonly rootElement!: U;

  public readonly cursorElement?: V;

  constructor(
    message?: string,
    structuredOptions?: EvaluationRelativeJsonPointerErrorOptions<T, U, V>,
  ) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.relativePointer = structuredOptions.relativePointer;
      this.currentElement = structuredOptions.currentElement;
      this.rootElement = structuredOptions.rootElement;
      this.cursorElement = structuredOptions.cursorElement;
    }
  }
}

export default EvaluationRelativeJsonPointerError;
