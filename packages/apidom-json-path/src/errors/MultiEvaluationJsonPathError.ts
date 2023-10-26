import { Element } from '@swagger-api/apidom-core';
import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';

import JsonPathError from './JsonPathError';

export interface MultiEvaluationJsonPathErrorOptions<T extends Element> extends ApiDOMErrorOptions {
  paths: string[] | string[][];
  element: T;
}

class MultiEvaluationJsonPathError<T extends Element> extends JsonPathError {
  public readonly paths!: string[] | string[][];

  public readonly element!: T;

  constructor(message?: string, structuredOptions?: MultiEvaluationJsonPathErrorOptions<T>) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.paths = structuredOptions.paths;
      this.element = structuredOptions.element;
    }
  }
}

export default MultiEvaluationJsonPathError;
