import { ApiDOMErrorOptions } from '@swagger-api/apidom-error';
import { Element, hasElementSourceMap, toValue } from '@swagger-api/apidom-core';

import JsonPointerError from './JsonPointerError';

export interface EvaluationJsonPointerErrorOptions<T extends Element> extends ApiDOMErrorOptions {
  readonly pointer: string;
  readonly tokens?: string[];
  readonly failedToken?: string;
  readonly failedTokenPosition?: number;
  readonly element: T;
}

class EvaluationJsonPointerError<T extends Element> extends JsonPointerError {
  public readonly pointer!: string;

  public readonly tokens?: string[];

  public readonly failedToken?: string;

  public readonly failedTokenPosition?: number;

  public readonly element!: string;

  public readonly elementSourceMap?: [[number, number, number], [number, number, number]];

  constructor(message?: string, structuredOptions?: EvaluationJsonPointerErrorOptions<T>) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.pointer = structuredOptions.pointer;
      if (Array.isArray(structuredOptions.tokens)) {
        this.tokens = [...structuredOptions.tokens];
      }
      this.failedToken = structuredOptions.failedToken;
      this.failedTokenPosition = structuredOptions.failedTokenPosition;
      this.element = structuredOptions.element.element;
      if (hasElementSourceMap(structuredOptions.element)) {
        this.elementSourceMap = toValue(structuredOptions.element.getMetaProperty('sourceMap'));
      }
    }
  }
}

export default EvaluationJsonPointerError;
