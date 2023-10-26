import { Element } from '@swagger-api/apidom-core';
import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import JsonPathError from './JsonPathError';

export interface EvaluationJsonPathErrorOptions<T extends Element> extends ApiDOMErrorOptions {
  path: string | string[];
  element: T;
}

class EvaluationJsonPathError<T extends Element> extends JsonPathError {
  public readonly path!: string | string[];

  public readonly element!: T;

  constructor(message?: string, structuredOptions?: EvaluationJsonPathErrorOptions<T>) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.path = structuredOptions.path;
      this.element = structuredOptions.element;
    }
  }
}

export default EvaluationJsonPathError;
