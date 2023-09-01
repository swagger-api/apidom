import { Element, hasElementSourceMap, toValue } from '@swagger-api/apidom-core';
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

  public readonly currentElement!: string;

  public readonly currentElementSourceMap?: [[number, number, number], [number, number, number]];

  public readonly rootElement!: string;

  public readonly rootElementSourceMap?: [[number, number, number], [number, number, number]];

  public readonly cursorElement?: string;

  public readonly cursorElementSourceMap?: [[number, number, number], [number, number, number]];

  constructor(
    message?: string,
    structuredOptions?: EvaluationRelativeJsonPointerErrorOptions<T, U, V>,
  ) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      this.relativePointer = structuredOptions.relativePointer;

      this.currentElement = structuredOptions.currentElement.element;
      if (hasElementSourceMap(structuredOptions.currentElement)) {
        this.currentElementSourceMap = toValue(
          structuredOptions.currentElement.getMetaProperty('sourceMap'),
        );
      }

      this.rootElement = structuredOptions.rootElement.element;
      if (hasElementSourceMap(structuredOptions.rootElement)) {
        this.rootElementSourceMap = toValue(
          structuredOptions.rootElement.getMetaProperty('sourceMap'),
        );
      }

      if (typeof structuredOptions.cursorElement !== 'undefined') {
        this.cursorElement = structuredOptions.cursorElement.element;
        if (hasElementSourceMap(structuredOptions.cursorElement)) {
          this.cursorElementSourceMap = toValue(
            structuredOptions.cursorElement.getMetaProperty('sourceMap'),
          );
        }
      }
    }
  }
}

export default EvaluationRelativeJsonPointerError;
